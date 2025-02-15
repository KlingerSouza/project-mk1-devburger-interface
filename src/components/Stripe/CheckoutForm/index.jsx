import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import "../styles.css";
import { useCart } from "../../../hooks/CartContext";
import { api } from "../../../services/api";

export default function CheckoutForm() {
    const { cartProducts, clearCart } = useCart();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();
    const {
        state: { dpmCheckerLink },
    } = useLocation();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!stripe || !elements) {
            toast.error("Erro inesperado! 😮");
            return;
        }
    
        setIsLoading(true);
        setMessage(null);
    
        // Exibir loading antes de verificar o status
        const toastId = toast.loading("Autenticando o pagamento... ⏳");
    
        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                redirect: "if_required",
            });
    
            console.log("Payment Intent:", paymentIntent); // Debug no console
    
            // Aguarda 2 segundos para dar tempo do status ser atualizado corretamente
            await new Promise((resolve) => setTimeout(resolve, 2000));
    
            if (paymentIntent) {
                if (paymentIntent.status === "succeeded") {
                    toast.dismiss(toastId);
                    toast.success("Pagamento confirmado! 🎉");
    
                    const products = cartProducts.map((product) => ({
                        id: product.id,
                        quantity: product.quantity,
                        price: product.price,
                    }));
    
                    const { status } = await api.post(
                        "/orders",
                        { products },
                        { validateStatus: () => true }
                    );
    
                    if (status === 200 || status === 201) {
                        clearCart();
                        setTimeout(() => 
                            navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`),
                            2000
                        );
                    } else if (status === 409) {
                        toast.error("Falha ao realizar seu pedido! 😮");
                    } else {
                        throw new Error();
                    }
                } else if (paymentIntent.status === "processing" || paymentIntent.status === "requires_action") {
                    toast.dismiss(toastId);
                    toast.info("Pagamento em processamento... 🔄");
                } else {
                    toast.dismiss(toastId);
                    setMessage("O pagamento não pôde ser concluído.");
                    toast.error("O pagamento não pôde ser concluído. ❌");
                }
            } else if (error) {
                console.error("Erro de pagamento:", error);
                toast.dismiss(toastId);
                setMessage(error.message);
                toast.error(error.message);
            } else {
                navigate(`/complete?payment_intent_client_secret=${paymentIntent?.client_secret}`);
            }
        } catch (error) {
            toast.dismiss(toastId);
            toast.error("Algo deu errado! Tente novamente! 🤯");
        } finally {
            setIsLoading(false);
        }
    };
    
    const paymentElementOptions = {
        layout: "accordion",
    };

    return (
        <div className="container">
            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <button
                    disabled={isLoading || !stripe || !elements}
                    id="submit"
                    className="button"
                >
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pagar agora"}
                    </span>
                </button>
                {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    );
}
