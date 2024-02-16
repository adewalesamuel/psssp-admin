
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Utils } from '../utils';

export function UserListView() {
    let abortController = new AbortController();

    const { UserService } = Services;

    const tableAttributes = {
        'fullname': {},
		'email': {},
		'phone_number': {},
		'backup_number': {},
		'whatsapp_number': {},
		'telegram_number': {},
		'shop_name': {},
		'profile_img_url': {},
		'is_active': {},
		'sponsor_code': {},
		'activation_code': {},
		'country_name': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [page,] = useState(1);
    const [, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/users/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, user) => {
        e.preventDefault();

        const {isConfirmed} = await Utils.SweetAlert.fireAlert(
            'supprimer', 'ce user');

        if (isConfirmed) {
            const usersCopy = [...users];
            const index = usersCopy.findIndex(userItem => 
                userItem.id === user.id);

            usersCopy.splice(index, 1);
            setUsers(usersCopy);

            await UserService.destroy(user.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {users} = await UserService.getAll(
                {page: page}, abortController.signal);
            const usersCopy = users.data.map(user => {
                return {
                    ...user,
                    'country_name': user?.country?.name ?? ""
                }
            })

            setUsers(usersCopy);
            setPageLength(users.last_page);
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
            <h3>Liste des utilisateurs</h3>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/users/create'>
                    <i className='icon ion-plus'></i> Ajouter un utilisateur
                </Link>
                <div className='table-responsive'>
                    <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                    tableAttributes={tableAttributes} tableActions={tableActions} 
                    tableData={users}/>
                </div>
            </Components.Loader>
        </>
    )
}
