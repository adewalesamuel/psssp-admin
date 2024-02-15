
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function CountryCreateView() {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const useCountry = Hooks.useCountry();

    const [errorMessages, setErrorMessages] = useState([]);    

    const handleFormSubmit = async e => {
        e.preventDefault();
        useCountry.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useCountry.createCountry(abortController.signal);
            navigate('/countries');
        } catch (error) {
            if ('messages' in error)
                error.messages.then(messages => setErrorMessages(messages));
        } finally {
            useCountry.setIsDisabled(false);
        }
    }

    return (
        <>
            <h3>Créer Country</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.CountryForm useCountry={useCountry} 
            isDisabled={useCountry.isDisabled} 
            handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
