import { useEffect, useState, useCallback } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { api } from "../../services/api";
import { CategoryButton, Container, ContainerItems, Title } from "./styles";
import { useNavigate } from "react-router-dom";

export function CategoriesCarousel() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    // Função para carregar categorias (evita recriação desnecessária)
    const loadCategories = useCallback(async () => {
        try {
            const { data } = await api.get("/categories");
            setCategories(data);
        } catch (error) {
            console.error("Erro ao carregar categorias:", error);
        }
    }, []);

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 2 }
    };

    // Função para redirecionar para a categoria
    const handleCategoryClick = (categoryId) => {
        navigate({ pathname: "/cardapio", search: `?categoria=${categoryId}` });
    };

    return (
        <Container>
            <Title>Categorias</Title>

            <Carousel
                responsive={responsive}
                infinite={true}
                partialVisible={false} 
                itemClass="carousel-item"
            >
                {categories.map(({ id, url, name }) => (
                    <ContainerItems key={id} imageurl={url} onClick={() => handleCategoryClick(id)}>
                        <CategoryButton onClick={() => handleCategoryClick(id)}>
                            {name}
                        </CategoryButton>
                    </ContainerItems>
                ))}
            </Carousel>
        </Container>
    );
}
