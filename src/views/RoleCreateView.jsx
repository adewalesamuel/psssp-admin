
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function RoleCreateView() {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const useRole = Hooks.useRole();

    const [errorMessages, setErrorMessages] = useState([]);
    
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

    return (
        <>
            <h3>Créer un role</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.RoleForm useRole={useRole} 
            isDisabled={useRole.isDisabled} 
            handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
