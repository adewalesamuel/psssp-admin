
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';
import { Services } from '../services';

export function OrderEditView() {
    let abortController = new AbortController();

    const {id} = useParams();

    const useOrder = Hooks.useOrder();

    const [products, setProducts] = useState([]);
	const [user, setUser] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);
    const [, setIsLoading] = useState(true);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useOrder.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useOrder.updateOrder(id, abortController.signal);
        } catch (error) {
            if ('messages' in error)
                error.messages.then(messages => setErrorMessages(messages));
        } finally {
            useOrder.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useOrder.setIsDisabled(true);

        try {
            const {order} = await useOrder.getOrder(id, abortController.signal);
            
            const { products } = await Services.ProductService.getAll(
                abortController.signal);
			setProducts(products);

			const { user } = await Services.UserService.getById(
                order.user_id, abortController.signal);
			setUser(user);
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
            useOrder.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3 className='slim-pagetitle'>Modifier une commande</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.OrderForm useOrder={useOrder} 
            products={products} setProducts={setProducts}
			user={user} isDisabled={useOrder.isDisabled} 
            handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
