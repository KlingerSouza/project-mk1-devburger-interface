import PropTypes from "prop-types";
import { CardImage, Container } from "./styles";
import { CartButton } from "../CartButton";
import { useCart } from "../../hooks/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export function CardProduct({ product }) {
    const { putProductOnCart } = useCart();
    const [isAnimating, setIsAnimating] = useState(false);

    const handleAddToCart = () => {
        putProductOnCart(product);

        // Ativa a animação
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300); // Remove a animação após 300ms

        // Toast de sucesso
        toast.success(`${product.name} adicionado ao carrinho! 🛒`, {
            position: "top-right",
            autoClose: 2000,
        });
    };

    return (
        <Container>
            <CardImage src={product.url} alt={product.name} />
            <div>
                <p>{product.name}</p>
                <strong>{product.currencyValue}</strong>
            </div>
            <CartButton onClick={handleAddToCart} isAnimating={isAnimating} />
        </Container>
    );
}

CardProduct.propTypes = {
    product: PropTypes.object,
};
