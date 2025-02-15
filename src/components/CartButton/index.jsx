import { useState } from "react";
import Cart from "../../assets/cart.svg";
import { ContainerButton } from "./styles";

export function CartButton({ onClick }) {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = (event) => {
        if (onClick) onClick(event); 

        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300); // Remove a classe após 300ms
    };

    return (
        <ContainerButton
            className={isAnimating ? "animate" : ""}
            onClick={handleClick}
        >
            <img src={Cart} alt="shop-cart" />
        </ContainerButton>
    );
}
