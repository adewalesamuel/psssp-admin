
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function PermissionCreateView() {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const usePermission = Hooks.usePermission();

    
    const [errorMessages, setErrorMessages] = useState([]);
    

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

    return (
        <>
            <h3>Créer Permission</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.PermissionForm usePermission={usePermission} 
             
            isDisabled={usePermission.isDisabled} 
            handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
