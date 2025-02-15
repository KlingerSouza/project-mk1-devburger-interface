import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/CartContext";
import { api } from "../../services/api";
import { formatPrice } from "../../utils/formatPrice";

import { Button } from "../index";
import { Container, Section } from "./styles";

export function CartResume() {
    const navigate = useNavigate();
    const { cartProducts, clearCart, getTotalPrice, deliveryTax } = useCart();
    
    const totalPrice = getTotalPrice();
    const hasItems = cartProducts.length > 0;

    const submitOrder = async () => {
        if (!hasItems) {
            toast.warn("Seu carrinho está vazio! Adicione itens antes de finalizar o pedido. 🛒", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        const products = cartProducts.map((product) => ({
            id: product.id,
            quantity: product.quantity,
            price: product.price
        }));

        try {
            const { data } = await api.post('/create-payment-intent', { products });

            navigate('/checkout', { state: data });

        } catch (err) {
            toast.error('Erro! Tente novamente 🤯', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    return (
        <Section>
            <Container>
                <div className="container-top">
                    <h2 className="title">Resumo do Pedido</h2>
                    <p className="items">Itens</p>
                    <p className="items-price">{formatPrice(totalPrice - (hasItems ? deliveryTax : 0))}</p>

                    {hasItems && (
                        <>
                            <p className="delivery-tax">Taxa de entrega</p>
                            <p className="delivery-tax-price">{formatPrice(deliveryTax)}</p>
                        </>
                    )}
                </div>
                <div className="container-bottom">
                    <p>Total</p>
                    <p>{formatPrice(totalPrice)}</p>
                </div>
            </Container>
            <Button onClick={submitOrder}>Finalizar pedido</Button>
        </Section>
    );
}
