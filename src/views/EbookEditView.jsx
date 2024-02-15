//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';
import { Services } from '../services';

export function EbookEditView(props) {
    let abortController = new AbortController();

    const {id} = useParams();

    const useEbook = Hooks.useEbook();

    
    const [errorMessages, setErrorMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useEbook.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useEbook.updateEbook(id, abortController.signal);
        } catch (error) {
            if ('messages' in error)
                error.messages.then(messages => setErrorMessages(messages));
        } finally {
            useEbook.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useEbook.setIsDisabled(true);

        try {
            await useEbook.getEbook(id, abortController.signal);
            
            
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
            useEbook.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h6 className='slim-pagetitle'>Modifier Ebook</h6>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.EbookForm useEbook={useEbook} 
             
            isDisabled={useEbook.isDisabled} 
            handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
