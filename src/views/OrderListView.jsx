
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Utils } from '../utils';

export function OrderListView() {
    let abortController = new AbortController();

    const { OrderService } = Services;

    const tableAttributes = {
        'code': {},
		'quantity': {},
		'amount': {},
		'status': {},
		'product_name': {},
		'user_name': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/orders/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, order) => {
        e.preventDefault();

        const {isConfirmed} = await Utils.SweetAlert.fireAlert(
            'supprimer', 'ce order');

        if (isConfirmed) {
            const ordersCopy = [...orders];
            const index = ordersCopy.findIndex(orderItem => 
                orderItem.id === order.id);

            ordersCopy.splice(index, 1);
            setOrders(ordersCopy);

            await OrderService.destroy(order.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {orders} = await OrderService.getAll(
                {page: page}, abortController.signal);
            const ordersData = orders.data.map(order => ({
                ...order,
                product_name: order?.product?.name,
                user_name: order?.account?.fullname
            }))

            setOrders(ordersData);
            setPageLength(orders.last_page);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [page]);

    useEffect(() => {
        init();

        return () => {
            abortController.abort();
            abortController = new AbortController();
        }
    }, [init]);

    useEffect(() => {
        if (!searchParams.get('page')) return;

        setPage(searchParams.get('page'));
    }, [searchParams.get('page')]);

    return (
        <>
            <h3>Liste des commandes</h3>
            <Components.Loader isLoading={isLoading}>
                <div className='table-responsive'>
                    <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                    tableAttributes={tableAttributes} tableActions={tableActions} 
                    tableData={orders}/>
                </div>
                <Components.Pagination pageLength={pageLength} page={parseInt(page)} />
            </Components.Loader>
        </>
    )
}
