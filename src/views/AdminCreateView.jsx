//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function AdminCreateView(props) {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const useAdmin = Hooks.useAdmin();

    const [roles, setRoles] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useAdmin.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useAdmin.createAdmin(abortController.signal);
            navigate('/admins');
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
            const { roles } = await Services.RoleService.getAll(abortController.signal);
			setRoles(roles);
			
        } catch (error) {
            console.log(error);
        }finally {
            useAdmin.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h6>Créer Admin</h6>

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
