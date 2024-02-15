
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function ProductCreateView() {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const useProduct = Hooks.useProduct();

    const [users, setUsers] = useState([]);
	const [categories, setCategorys] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);
    

    const handleFormSubmit = async e => {
        e.preventDefault();
        useProduct.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useProduct.createProduct(abortController.signal);
            navigate('/products');
        } catch (error) {
            if ('messages' in error)
                error.messages.then(messages => setErrorMessages(messages));
        } finally {
            useProduct.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useProduct.setIsDisabled(true);

        try {
            const { users } = await Services.UserService.getAll(
                abortController.signal);
			setUsers(users);
			const { categories } = await Services.CategoryService.getAll(
                abortController.signal);
			setCategorys(categories);
			
        } catch (error) {
            console.log(error);
        }finally {
            useProduct.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h3>Créer Product</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.ProductForm useProduct={useProduct} 
            users={users} setUsers={setUsers}
			categories={categories} setCategorys={setCategorys}
            isDisabled={useProduct.isDisabled} 
            handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
