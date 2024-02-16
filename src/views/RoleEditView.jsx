
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';

export function RoleEditView() {
    let abortController = new AbortController();

    const {id} = useParams();

    const useRole = Hooks.useRole();

    
    const [errorMessages, setErrorMessages] = useState([]);
    const [, setIsLoading] = useState(true);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useRole.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useRole.updateRole(id, abortController.signal);
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
            await useRole.getRole(id, abortController.signal);
            
            
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
            useRole.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3 className='slim-pagetitle'>Modifier un role</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.RoleForm useRole={useRole} 
             
            isDisabled={useRole.isDisabled} 
            handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
