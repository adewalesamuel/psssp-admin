//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';
import { Services } from '../services';

export function ProductEditView(props) {
    let abortController = new AbortController();

    const {id} = useParams();

    const useProduct = Hooks.useProduct();

    const [users, setUsers] = useState([]);
	const [categories, setCategorys] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useProduct.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useProduct.updateProduct(id, abortController.signal);
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
            await useProduct.getProduct(id, abortController.signal);
            
            const { users } = await Services.UserService.getAll(abortController.signal);
			setUsers(users);
			const { categories } = await Services.CategoryService.getAll(abortController.signal);
			setCategorys(categories);
			
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
            useProduct.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h6 className='slim-pagetitle'>Modifier Product</h6>

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
