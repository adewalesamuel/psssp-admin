//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function EbookCreateView(props) {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const useEbook = Hooks.useEbook();

    
    const [errorMessages, setErrorMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useEbook.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useEbook.createEbook(abortController.signal);
            navigate('/ebooks');
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
            
        } catch (error) {
            console.log(error);
        }finally {
            useEbook.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h6>Créer Ebook</h6>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.EbookForm useEbook={useEbook} 
             
            isDisabled={useEbook.isDisabled} 
            handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
