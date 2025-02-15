import { useEffect, useState, useCallback } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { api } from "../../services/api";
import { Container, Title } from "./styles";
import { CardProduct } from "../CardProduct";
import { formatPrice } from "../../utils/formatPrice";

export function OffersCarousel() {
    const [offers, setOffers] = useState([]);

    // Função otimizada para carregar produtos com ofertas
    const loadProducts = useCallback(async () => {
        try {
            const { data } = await api.get("/products");

            const onlyOffers = data
                .filter((product) => product.offer)
                .map((product) => ({
                    ...product,
                    currencyValue: formatPrice(product.price),
                }));

            setOffers((prevOffers) =>
                JSON.stringify(prevOffers) !== JSON.stringify(onlyOffers) ? onlyOffers : prevOffers
            );
        } catch (error) {
            console.error("Erro ao carregar ofertas:", error);
        }
    }, []);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
    };

    return (
        <Container>
            <Title>Ofertas do dia</Title>
            <Carousel responsive={responsive} infinite={true} partialVisible={false} itemClass="carousel-item">
                {offers.map((product) => (
                    <CardProduct key={product.id} product={product} />
                ))}
            </Carousel>
        </Container>
    );
}
