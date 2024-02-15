
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Utils } from '../utils';

export function EbookListView() {
    let abortController = new AbortController();

    const { EbookService } = Services;

    const tableAttributes = {
        'name': {},
		'slug': {},
		'type': {},
		'download_code': {},
		'description': {},
		'price': {},
		'initial_stock': {},
		'img_url': {},
		'file_url': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();

    const [ebooks, setEbooks] = useState([]);
    const [page,] = useState(1);
    const [, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/ebooks/${data.id}/modifier`);
    }
    const handleDeleteClick = async (e, ebook) => {
        e.preventDefault();

        const {isConfirmed} = await Utils.SweetAlert.fireAlert(
            'supprimer', 'ce ebook');

        if (isConfirmed) {
            const ebooksCopy = [...ebooks];
            const index = ebooksCopy.findIndex(ebookItem => 
                ebookItem.id === ebook.id);

            ebooksCopy.splice(index, 1);
            setEbooks(ebooksCopy);

            await EbookService.destroy(ebook.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {ebooks} = await EbookService.getAll(
                {page: page}, abortController.signal);

            setEbooks(ebooks.data);
            setPageLength(ebooks.last_page);
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
            <h3>Liste Ebooks</h3>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/ebooks/creer'>
                    <i className='icon ion-plus'></i> Ajout ebook
                </Link>
                <div className='table-responsive'>
                    <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                    tableAttributes={tableAttributes} tableActions={tableActions} 
                    tableData={ebooks}/>
                </div>
            </Components.Loader>
        </>
    )
}
