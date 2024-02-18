
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Utils } from '../utils';

export function PermissionListView() {
    let abortController = new AbortController();

    const { PermissionService } = Services;

    const tableAttributes = {
        'name': {},
		'slug': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();

    const [permissions, setPermissions] = useState([]);
    const [page,] = useState(1);
    const [, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/permissions/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, permission) => {
        e.preventDefault();

        const {isConfirmed} = await Utils.SweetAlert.fireAlert(
            'supprimer', 'ce permission');

        if (isConfirmed) {
            const permissionsCopy = [...permissions];
            const index = permissionsCopy.findIndex(permissionItem => 
                permissionItem.id === permission.id);

            permissionsCopy.splice(index, 1);
            setPermissions(permissionsCopy);

            await PermissionService.destroy(permission.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {permissions} = await PermissionService.getAll(
                {page: page}, abortController.signal);

            setPermissions(permissions.data);
            setPageLength(permissions.last_page);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [page]);

    useEffect(() => {
        init();

        return () => {
            abortController.abort();
            abortController = new AbortController();
        }
    }, [init])

    return (
        <>
            <h3>Liste Permissions</h3>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/permissions/create'>
                    <i className='icon ion-plus'></i> Ajouter permission
                </Link>
                <div className='table-responsive'>
                    <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                    tableAttributes={tableAttributes} tableActions={tableActions} 
                    tableData={permissions}/>
                </div>
            </Components.Loader>
        </>
    )
}
