import { useContext, createContext, useEffect, useState } from 'react';

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([]);
    const deliveryTax = 500; // Definindo taxa de entrega fixa

    const getTotalPrice = () => {
        const total = cartProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);
        return cartProducts.length > 0 ? total + deliveryTax : total;
    };

    const putProductOnCart = (product) => {
        setCartProducts((prevCart) => {
            const cartIndex = prevCart.findIndex((prd) => prd.id === product.id);
            let newProductsOnCart;

            if (cartIndex >= 0) {
                newProductsOnCart = prevCart.map((prd, index) =>
                    index === cartIndex ? { ...prd, quantity: prd.quantity + 1 } : prd
                );
            } else {
                newProductsOnCart = [...prevCart, { ...product, quantity: 1 }];
            }

            updateLocalStorage(newProductsOnCart);
            return newProductsOnCart;
        });
    };

    const clearCart = () => {
        setCartProducts([]);
        updateLocalStorage([]);
    };

    const deleteProduct = (productId) => {
        setCartProducts((prevCart) => {
            const newCart = prevCart.filter((prd) => prd.id !== productId);
            updateLocalStorage(newCart);
            return newCart;
        });
    };

    const increaseProduct = (productId) => {
        setCartProducts((prevCart) => {
            const newCart = prevCart.map((prd) =>
                prd.id === productId ? { ...prd, quantity: prd.quantity + 1 } : prd
            );
            updateLocalStorage(newCart);
            return newCart;
        });
    };

    const decreaseProduct = (productId) => {
        setCartProducts((prevCart) => {
            const cartIndex = prevCart.findIndex((prd) => prd.id === productId);

            if (prevCart[cartIndex].quantity > 1) {
                const newCart = prevCart.map((prd) =>
                    prd.id === productId ? { ...prd, quantity: prd.quantity - 1 } : prd
                );
                updateLocalStorage(newCart);
                return newCart;
            } else {
                return prevCart.filter((prd) => prd.id !== productId);
            }
        });
    };

    const updateLocalStorage = (products) => {
        localStorage.setItem('devburger:cartInfo', JSON.stringify(products));
    };

    useEffect(() => {
        try {
            const clientCartData = localStorage.getItem('devburger:cartInfo');
            if (clientCartData) {
                setCartProducts(JSON.parse(clientCartData));
            }
        } catch (error) {
            console.error('Erro ao recuperar o carrinho do localStorage:', error);
            setCartProducts([]);
        }
    }, []);

    return (
        <CartContext.Provider value={{ 
            cartProducts, 
            putProductOnCart, 
            clearCart, 
            deleteProduct, 
            increaseProduct, 
            decreaseProduct, 
            getTotalPrice, 
            deliveryTax
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used with a context!');
    }
    return context;
};
