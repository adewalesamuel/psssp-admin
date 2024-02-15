//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function CountryCreateView(props) {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const useCountry = Hooks.useCountry();

    
    const [errorMessages, setErrorMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    const init = useCallback(async () => {
        useCountry.setIsDisabled(true);

        try {
            
        } catch (error) {
            console.log(error);
        }finally {
            useCountry.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h6>Créer Country</h6>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.CountryForm useCountry={useCountry} 
             
            isDisabled={useCountry.isDisabled} 
            handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
