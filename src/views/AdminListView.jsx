
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Utils } from '../utils';

export function AdminListView() {
    let abortController = new AbortController();

    const { AdminService } = Services;

    const tableAttributes = {
        'fullname': {},
		'email': {},
		'profile_img_url': {},
		'role_id': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();

    const [admins, setAdmins] = useState([]);
    const [page,] = useState(1);
    const [, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/admins/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, admin) => {
        e.preventDefault();

        const {isConfirmed} = await Utils.SweetAlert.fireAlert(
            'supprimer', 'ce admin');

        if (isConfirmed) {
            const adminsCopy = [...admins];
            const index = adminsCopy.findIndex(adminItem => 
                adminItem.id === admin.id);

            adminsCopy.splice(index, 1);
            setAdmins(adminsCopy);

            await AdminService.destroy(admin.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {admins} = await AdminService.getAll(
                {page: page}, abortController.signal);

            setAdmins(admins.data);
            setPageLength(admins.last_page);
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
            <h3>Liste Admins</h3>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/admins/create'>
                    <i className='icon ion-plus'></i> Ajout admin
                </Link>
                <div className='table-responsive'>
                    <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                    tableAttributes={tableAttributes} tableActions={tableActions} 
                    tableData={admins}/>
                </div>
            </Components.Loader>
        </>
    )
}
