//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Utils } from '../utils';

export function RoleListView(props) {
    let abortController = new AbortController();

    const { RoleService } = Services;

    const tableAttributes = {
        'name': {},
		'slug': {},
		'permissions': {},
		
    }
    const tableActions = ['raad', 'edit', 'delete'];
    
    const navigate = useNavigate();

    const [roles, setRoles] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/roles/${data.id}/modifier`);
    }
    const handleDeleteClick = async (e, role) => {
        e.preventDefault();

        const {isConfirmed} = await Utils.SweetAlert.fireAlert(
            'supprimer', 'ce role');

        if (isConfirmed) {
            const rolesCopy = [...roles];
            const index = rolesCopy.findIndex(roleItem => 
                roleItem.id === role.id);

            rolesCopy.splice(index, 1);
            setRoles(rolesCopy);

            await RoleService.destroy(role.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {roles} = await RoleService.getAll(
                {page: page}, abortController.signal);

            setRoles(roles.data);
            setPageLength(roles.last_page);
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
            <h6>Liste Roles</h6>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/roles/creer'>
                    <i className='icon ion-plus'></i> Ajout role
                </Link>
                <div className='table-responsive'>
                    <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                    tableAttributes={tableAttributes} tableActions={tableActions} 
                    tableData={roles}/>
                </div>
            </Components.Loader>
        </>
    )
}
