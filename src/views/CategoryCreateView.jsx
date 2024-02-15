//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function CategoryCreateView(props) {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const useCategory = Hooks.useCategory();

    const [categories, setCategorys] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useCategory.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useCategory.createCategory(abortController.signal);
            navigate('/categories');
        } catch (error) {
            if ('messages' in error)
                error.messages.then(messages => setErrorMessages(messages));
        } finally {
            useCategory.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useCategory.setIsDisabled(true);

        try {
            const { categories } = await Services.CategoryService.getAll(abortController.signal);
			setCategorys(categories);
			
        } catch (error) {
            console.log(error);
        }finally {
            useCategory.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h6>Créer Category</h6>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.CategoryForm useCategory={useCategory} 
            categories={categories} setCategorys={setCategorys}
			 
            isDisabled={useCategory.isDisabled} 
            handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
