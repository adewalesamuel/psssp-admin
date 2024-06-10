
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
        'whatsapp_number': {},
        'telegram_number': {},
		'backup_number': {},
		'shop_name': {},
		'is_active': {},
		'activation_code': {},
		'sponsor_code': {},
		'country_name': {},
        'created_at': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
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
            const {accounts} = await UserService.getAll(
                {page: page}, abortController.signal);
            const accountsCopy = accounts.data.map(account => {
                return {
                    'id': account.id,
                    'fullname': account.fullname,
                    'email': account.email,
                    'phone_number': account.user.phone_number,
                    'whatsapp_number': account.whatsapp_number,
                    'telegram_number': account.telegram_number,
                    'backup_number': account.backup_number,
                    'shop_name': account.shop_name,
                    'is_active': account.is_active,
                    'activation_code': account.activation_code,
                    'sponsor_code': account?.user.sponsor_code,
                    'country_name': account.country?.name ?? "",
                    'created_at': new Date(account.created_at).toLocaleDateString(),
                }
            })

            setUsers(accountsCopy);
            setPageLength(accounts.last_page);
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

    useEffect(() => {
        if (!searchParams.get('page')) return;

        setPage(searchParams.get('page'));
    }, [searchParams.get('page')]);

    return (
        <>
            <h3>Liste des utilisateurs</h3>
            <Components.Loader isLoading={isLoading}>
                {/*<Link className='btn btn-info' to='/users/create'>
                    <i className='icon ion-plus'></i> Ajouter un utilisateur
                </Link>*/}
                <div className='table-responsive'>
                    <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                    tableAttributes={tableAttributes} tableActions={tableActions} 
                    tableData={users}/>
                </div>
                <Components.Pagination pageLength={pageLength} page={parseInt(page)} />
            </Components.Loader>
        </>
    )
}
