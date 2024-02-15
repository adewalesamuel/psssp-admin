
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';
import { Services } from '../services';

export function UserEditView() {
    let abortController = new AbortController();

    const {id} = useParams();

    const useUser = Hooks.useUser();

    const [countries, setcountries] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);
    const [, setIsLoading] = useState(true);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useUser.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useUser.updateUser(id, abortController.signal);
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
            await useUser.getUser(id, abortController.signal);
            
            const { countries } = await Services.countrieservice.getAll(
                abortController.signal);
			setcountries(countries);
			
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
            useUser.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3 className='slim-pagetitle'>Modifier User</h3>

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
