//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';
import { Services } from '../services';

export function CountryEditView(props) {
    let abortController = new AbortController();

    const {id} = useParams();

    const useCountry = Hooks.useCountry();

    
    const [errorMessages, setErrorMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useCountry.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useCountry.updateCountry(id, abortController.signal);
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
            await useCountry.getCountry(id, abortController.signal);
            
            
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
            useCountry.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h6 className='slim-pagetitle'>Modifier Country</h6>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.CountryForm useCountry={useCountry} 
             
            isDisabled={useCountry.isDisabled} 
            handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
