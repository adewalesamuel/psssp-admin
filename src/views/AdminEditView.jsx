
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';
import { Services } from '../services';

export function AdminEditView() {
    let abortController = new AbortController();

    const {id} = useParams();

    const useAdmin = Hooks.useAdmin();

    const [roles, setRoles] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);
    const [, setIsLoading] = useState(true);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useAdmin.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useAdmin.updateAdmin(id, abortController.signal);
        } catch (error) {
            if ('messages' in error)
                error.messages.then(messages => setErrorMessages(messages));
        } finally {
            useAdmin.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useAdmin.setIsDisabled(true);

        try {
            await useAdmin.getAdmin(id, abortController.signal);
            
            const { roles } = await Services.RoleService.getAll(
                abortController.signal);
			setRoles(roles);
			
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
            useAdmin.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3 className='slim-pagetitle'>Modifier un administrateur</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.AdminForm useAdmin={useAdmin} 
            roles={roles} setRoles={setRoles}
            isDisabled={useAdmin.isDisabled} 
            handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
