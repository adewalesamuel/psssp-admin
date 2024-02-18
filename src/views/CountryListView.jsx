
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Utils } from '../utils';

export function CountryListView() {
    let abortController = new AbortController();

    const { CountryService } = Services;

    const tableAttributes = {
        'name': {},
		'code': {},
		'phone_code': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();

    const [countries, setcountries] = useState([]);
    const [page,] = useState(1);
    const [, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/countries/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, country) => {
        e.preventDefault();

        const {isConfirmed} = await Utils.SweetAlert.fireAlert(
            'supprimer', 'ce country');

        if (isConfirmed) {
            const countriesCopy = [...countries];
            const index = countriesCopy.findIndex(countryItem => 
                countryItem.id === country.id);

            countriesCopy.splice(index, 1);
            setcountries(countriesCopy);

            await CountryService.destroy(country.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {countries} = await CountryService.getAll(
                {page: page}, abortController.signal);

            setcountries(countries.data);
            setPageLength(countries.last_page);
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
            <h3>Liste des pays</h3>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/countries/create'>
                    <i className='icon ion-plus'></i> Ajouter un pays
                </Link>
                <div className='table-responsive'>
                    <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                    tableAttributes={tableAttributes} tableActions={tableActions} 
                    tableData={countries}/>
                </div>
            </Components.Loader>
        </>
    )
}
