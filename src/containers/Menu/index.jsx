import { useEffect, useState, useMemo } from 'react';
import { Container, Banner, CategoryMenu, ProductsContainer, CategoryButton } from './styles';
import { api } from "../../services/api";
import { formatPrice } from '../../utils/formatPrice';
import { CardProduct } from '../../components/CardProduct';
import { useLocation, useNavigate } from 'react-router-dom';

export function Menu() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);

    const [activeCategory, setActiveCategory] = useState(() => {
        return +queryParams.get('categoria') || 0;
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const [categoriesResponse, productsResponse] = await Promise.all([
                    api.get('/categories'),
                    api.get('/products')
                ]);

                setCategories([{ id: 0, name: 'Todas' }, ...categoriesResponse.data]);
                
                const formattedProducts = productsResponse.data.map(product => ({
                    ...product,
                    currencyValue: formatPrice(product.price),
                }));

                setProducts(formattedProducts);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        }

        fetchData();
    }, []);

    const filteredProducts = useMemo(() => {
        return activeCategory === 0
            ? products
            : products.filter(product => product.category_id === activeCategory);
    }, [products, activeCategory]);

    return (
        <Container>
            <Banner>
                <h1>O MELHOR<br />HAMBURGER<br />ESTÁ AQUI!
                    <span>Esse cardápio está irresistível!</span>
                </h1>
            </Banner>

            <CategoryMenu>
                {categories.map(category => (
                    <CategoryButton
                        key={category.id}
                        $isActiveCategory={category.id === activeCategory}
                        onClick={() => {
                            navigate(`/cardapio?categoria=${category.id}`, { replace: true });
                            setActiveCategory(category.id);
                        }}
                    >
                        {category.name}
                    </CategoryButton>
                ))}
            </CategoryMenu>

            <ProductsContainer>
                {filteredProducts.map(product => (
                    <CardProduct product={product} key={product.id} />
                ))}
            </ProductsContainer>
        </Container>
    );
}
