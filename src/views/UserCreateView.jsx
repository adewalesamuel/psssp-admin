//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function UserCreateView(props) {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const useUser = Hooks.useUser();

    const [countries, setcountries] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useUser.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useUser.createUser(abortController.signal);
            navigate('/users');
        } catch (error) {
            if ('messages' in error)
                error.messages.then(messages => setErrorMessages(messages));
        } finally {
            useUser.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useUser.setIsDisabled(true);

        try {
            const { countries } = await Services.countrieservice.getAll(abortController.signal);
			setcountries(countries);
			
        } catch (error) {
            console.log(error);
        }finally {
            useUser.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h6>Créer User</h6>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.UserForm useUser={useUser} 
            countries={countries} setcountries={setcountries}
			 
            isDisabled={useUser.isDisabled} 
            handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
