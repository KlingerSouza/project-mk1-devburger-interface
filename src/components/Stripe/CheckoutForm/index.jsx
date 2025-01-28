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

        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                redirect: "if_required",
            });

            if (error) {
                setMessage(error.message);
                toast.error(error.message);
            } else if (paymentIntent && paymentIntent.status === "succeeded") {
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
                    toast.success("Pedido efetuado com sucesso! 😉");
                    setTimeout(() => navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`),
                        2000);
                } else if (status === 409) {
                    toast.error("Falha ao realizar seu pedido! 😮");
                } else {
                    throw new Error();
                }
            } else {
                navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
            }
        } catch (error) {
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
