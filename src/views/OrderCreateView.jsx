
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function OrderCreateView() {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const useOrder = Hooks.useOrder();

    const [products, setProducts] = useState([]);
	const [users, setUsers] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);
    

    const handleFormSubmit = async e => {
        e.preventDefault();
        useOrder.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useOrder.createOrder(abortController.signal);
            navigate('/orders');
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
            const { products } = await Services.ProductService.getAll(
                abortController.signal);
			setProducts(products);
			const { users } = await Services.UserService.getAll(
                abortController.signal);
			setUsers(users);
			
        } catch (error) {
            console.log(error);
        }finally {
            useOrder.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h3>Créer Order</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.OrderForm useOrder={useOrder} 
            products={products} setProducts={setProducts}
			users={users} setUsers={setUsers}
            isDisabled={useOrder.isDisabled} 
            handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
