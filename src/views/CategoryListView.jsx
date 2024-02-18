
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Utils } from '../utils';

export function CategoryListView() {
    let abortController = new AbortController();

    const { CategoryService } = Services;

    const tableAttributes = {
        'name': {},
		'slug': {},
		'categorie_parente': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();

    const [categories, setCategorys] = useState([]);
    const [page,] = useState(1);
    const [, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/categories/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, category) => {
        e.preventDefault();

        const {isConfirmed} = await Utils.SweetAlert.fireAlert(
            'supprimer', 'ce category');

        if (isConfirmed) {
            const categoriesCopy = [...categories];
            const index = categoriesCopy.findIndex(categoryItem => 
                categoryItem.id === category.id);

            categoriesCopy.splice(index, 1);
            setCategorys(categoriesCopy);

            await CategoryService.destroy(category.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {categories} = await CategoryService.getAll(
                {page: page}, abortController.signal);
            const categoriesData = categories.data.map(category => ({
                ...category,
                categorie_parente: category?.category?.name ?? ""
            }))

            setCategorys(categoriesData);
            setPageLength(categories.last_page);
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
            <h3>Liste des categories</h3>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/categories/create'>
                    <i className='icon ion-plus'></i> Ajouter une categorie
                </Link>
                <div className='table-responsive'>
                    <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                    tableAttributes={tableAttributes} tableActions={tableActions} 
                    tableData={categories}/>
                </div>
            </Components.Loader>
        </>
    )
}
