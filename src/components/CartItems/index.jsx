import { useCallback } from "react";
import { useCart } from "../../hooks/CartContext";
import { formatPrice } from "../../utils/formatPrice";
import { Table } from "../index";
import { ButtonGroup, EmptyCart, ProductImage, TrashImage } from "./styles";
import TrashIcon from "../../assets/trash.svg";

export function CartItems() {
    const { cartProducts, decreaseProduct, increaseProduct, deleteProduct } = useCart();

    // Evita recriação desnecessária das funções
    const handleIncrease = useCallback((id) => increaseProduct(id), [increaseProduct]);
    const handleDecrease = useCallback((id) => decreaseProduct(id), [decreaseProduct]);
    const handleDelete = useCallback((id) => deleteProduct(id), [deleteProduct]);

    return (
        <Table.Root>
            <Table.Header>
                <Table.Tr>
                    <Table.Th></Table.Th>
                    <Table.Th>Itens</Table.Th>
                    <Table.Th>Preço</Table.Th>
                    <Table.Th>Quantidade</Table.Th>
                    <Table.Th>Total</Table.Th>
                    <Table.Th></Table.Th>
                </Table.Tr>
            </Table.Header>
            <Table.Body>
                {cartProducts?.length ? (
                    cartProducts.map(({ id, url, name, currencyValue, quantity, price }) => (
                        <Table.Tr key={id}>
                            <Table.Td>
                                <ProductImage src={url} alt="Imagem do produto" />
                            </Table.Td>
                            <Table.Td>{name}</Table.Td>
                            <Table.Td>{currencyValue}</Table.Td>
                            <Table.Td>
                                <ButtonGroup>
                                    <button
                                        onClick={() => handleIncrease(id)}
                                        aria-label="Aumentar quantidade"
                                    >
                                        +
                                    </button>
                                    {quantity}
                                    <button
                                        onClick={() => handleDecrease(id)}
                                        aria-label="Diminuir quantidade"
                                    >
                                        -
                                    </button>
                                </ButtonGroup>
                            </Table.Td>
                            <Table.Td>
                                <div style={{ fontWeight: "bold" }}>
                                    {formatPrice(quantity * price)}
                                </div>
                            </Table.Td>
                            <Table.Td>
                                <TrashImage
                                    src={TrashIcon}
                                    alt="Remover item"
                                    onClick={() => handleDelete(id)}
                                />
                            </Table.Td>
                        </Table.Tr>
                    ))
                ) : (
                    <Table.Tr>
                        <Table.Td colSpan="6" style={{ textAlign: "center" }}>
                            <EmptyCart>Carrinho Vazio</EmptyCart>
                        </Table.Td>
                    </Table.Tr>
                )}
            </Table.Body>
        </Table.Root>
    );
}
