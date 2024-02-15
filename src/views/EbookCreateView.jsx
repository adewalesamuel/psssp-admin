
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function EbookCreateView() {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const useEbook = Hooks.useEbook();
    
    const [errorMessages, setErrorMessages] = useState([]);

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

    return (
        <>
            <h3>Créer Ebook</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.EbookForm useEbook={useEbook} 
             
            isDisabled={useEbook.isDisabled} 
            handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
