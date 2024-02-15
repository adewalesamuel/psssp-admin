//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function RoleCreateView(props) {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const useRole = Hooks.useRole();

    
    const [errorMessages, setErrorMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useRole.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useRole.createRole(abortController.signal);
            navigate('/roles');
        } catch (error) {
            if ('messages' in error)
                error.messages.then(messages => setErrorMessages(messages));
        } finally {
            useRole.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useRole.setIsDisabled(true);

        try {
            
        } catch (error) {
            console.log(error);
        }finally {
            useRole.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h6>Créer Role</h6>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.RoleForm useRole={useRole} 
             
            isDisabled={useRole.isDisabled} 
            handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
