
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';

export function PermissionEditView() {
    let abortController = new AbortController();

    const {id} = useParams();

    const usePermission = Hooks.usePermission();

    
    const [errorMessages, setErrorMessages] = useState([]);
    const [, setIsLoading] = useState(true);

    const handleFormSubmit = async e => {
        e.preventDefault();
        usePermission.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await usePermission.updatePermission(id, abortController.signal);
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
            await usePermission.getPermission(id, abortController.signal);
            
            
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
            usePermission.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3 className='slim-pagetitle'>Modifier Permission</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.PermissionForm usePermission={usePermission} 
             
            isDisabled={usePermission.isDisabled} 
            handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
