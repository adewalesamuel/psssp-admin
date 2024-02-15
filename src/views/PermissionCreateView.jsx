//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function PermissionCreateView(props) {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const usePermission = Hooks.usePermission();

    
    const [errorMessages, setErrorMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleFormSubmit = async e => {
        e.preventDefault();
        usePermission.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await usePermission.createPermission(abortController.signal);
            navigate('/permissions');
        } catch (error) {
            if ('messages' in error)
                error.messages.then(messages => setErrorMessages(messages));
        } finally {
            usePermission.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        usePermission.setIsDisabled(true);

        try {
            
        } catch (error) {
            console.log(error);
        }finally {
            usePermission.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h6>Créer Permission</h6>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.PermissionForm usePermission={usePermission} 
             
            isDisabled={usePermission.isDisabled} 
            handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
