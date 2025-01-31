import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Row } from './row';
import { useEffect, useState, useMemo } from 'react';
import { api } from '../../../services/api';
import { orderStatusOptions } from './orderStatus';
import { Filter, FilterOption } from './styles';
import Pagination from '@mui/material/Pagination';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Orders() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [activeStatus, setActiveStatus] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    useEffect(() => {
        async function loadOrders() {
            try {
                setLoading(true);
                const { data } = await api.get('orders');
                console.log(data);

                setFilteredOrders(data);
                setOrders(data);
            } catch (error) {
                toast.error('Erro ao carregar pedidos!');
                console.error('Erro ao carregar pedidos:', error);
            } finally {
                setLoading(false);
            }
        }
        loadOrders();
    }, []);


    function createData(order) {
        return {
            name: order.user.name,
            orderId: order._id,
            date: order.createdAt,
            status: order.status,
            products: order.products.map(product => ({
                ...product,
                quantity: Number(product.quantity), // Converte para número
            })),
        };
    }



    const rows = useMemo(() => filteredOrders.map(createData), [filteredOrders]);

    function handleStatus(status) {
        if (status.id === 0) {
            setFilteredOrders(orders);
        } else {
            const newOrders = orders.filter(order => order.status === status.value);
            setFilteredOrders(newOrders);
        }
        setActiveStatus(status.id);
        setCurrentPage(1);
    }

    useEffect(() => {
        if (activeStatus === 0) {
            setFilteredOrders(orders);
        } else {
            const statusIndex = orderStatusOptions.findIndex(
                (item) => item.id === activeStatus,
            );
            const newFilteredOrders = orders.filter(order => order.status === orderStatusOptions[statusIndex].value);
            setFilteredOrders(newFilteredOrders);
        }
    }, [orders]);

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = rows.slice(indexOfFirstOrder, indexOfLastOrder);

    return (
        <>
            <Filter>
                {orderStatusOptions.map(status => (
                    <FilterOption
                        key={status.id}
                        onClick={() => handleStatus(status)}
                        $isActiveStatus={activeStatus === status.id}
                    >
                        {status.label}
                    </FilterOption>
                ))}
            </Filter>
            <TableContainer component={Paper}>
                {loading ? (
                    <p>Carregando pedidos...</p>
                ) : rows.length === 0 ? (
                    <p>Nenhum pedido encontrado.</p>
                ) : (
                    <>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Pedido</TableCell>
                                    <TableCell>Cliente</TableCell>
                                    <TableCell>Data do pedido</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentOrders.map((row) => (
                                    <Row key={row.orderId} row={row} orders={orders} setOrders={setOrders} />
                                ))}
                            </TableBody>
                        </Table>
                        <Pagination
                            count={Math.ceil(rows.length / ordersPerPage)}
                            page={currentPage}
                            onChange={(event, value) => setCurrentPage(value)}
                            color="primary"
                            sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}
                        />
                    </>
                )}
            </TableContainer>
        </>
    );
}
