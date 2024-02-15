import { useState } from 'react';
import { Services } from '../services';

export const usePermission = () => {
    const [id, setId] = useState('');
	const [name, setName] = useState('');
	const [slug, setSlug] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getPermission = (permissionId, signal) => {        
        return Services.PermissionService.getById(permissionId, signal)
        .then(response => {
            fillPermission(response.permission);
            setIsDisabled(false);
        });
    }

    const createPermission = signal => {
        const payload = {
            name,
		slug,
		
        };

        return Services.PermissionService.create(JSON.stringify(payload), signal);
    }
    const updatePermission = (permissionId, signal) => {
        const payload = {
            name,
		slug,
		
        };

        return Services.PermissionService.update(permissionId, JSON.stringify(payload), signal);
    }
    const deletePermission = (permissionId, signal) => {
        return Services.PermissionService.destroy(permissionId, signal);
    }
    const fillPermission = (permission) => {
        setId(permission.id);
        setName(permission.name ?? '');
		setSlug(permission.slug ?? '');
		
    }
    const emptyPermission = () => {
        setId('');
        setName('');
		setSlug('');
		
    }

    return {
        id,
        name,
		slug,
		
        errors,
        isDisabled,
        setName,
		setSlug,
		
        setId,
        setErrors,
        setIsDisabled,
        getPermission,
        createPermission,
        updatePermission,
        deletePermission,
        fillPermission,
        emptyPermission
    };
}