
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';
import { Services } from '../services';

export function CategoryEditView() {
    let abortController = new AbortController();

    const {id} = useParams();

    const useCategory = Hooks.useCategory();

    const [categories, setCategorys] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);
    const [, setIsLoading] = useState(true);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useCategory.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useCategory.updateCategory(id, abortController.signal);
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
            await useCategory.getCategory(id, abortController.signal);
            
            const { categories } = await Services.CategoryService.getAll(
                abortController.signal);
			setCategorys(categories);
			
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
            useCategory.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3 className='slim-pagetitle'>Modifier Categorie</h3>

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
