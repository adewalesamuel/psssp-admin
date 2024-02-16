
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function OrderCreateView() {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const {id} = useParams();

    const useOrder = Hooks.useOrder();


    const [products, setProducts] = useState([]);
	const [user, setUser] = useState([]);
	
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
			const { user } = await Services.UserService.getById(
                id,abortController.signal);
			setUser(user);

            useOrder.setUser_id(user.id);
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
            <h3>Créer une commande</h3>

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
