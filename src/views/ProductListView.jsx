
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Utils } from '../utils';

export function ProductListView() {
    let abortController = new AbortController();

    const { ProductService } = Services;

    const tableAttributes = {
        'image': {},
        'category_name': {},
        'name': {},
		'price': {},
        'product_link': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [page,] = useState(1);
    const [, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/products/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, product) => {
        e.preventDefault();

        const {isConfirmed} = await Utils.SweetAlert.fireAlert(
            'supprimer', 'ce product');

        if (isConfirmed) {
            const productsCopy = [...products];
            const index = productsCopy.findIndex(productItem => 
                productItem.id === product.id);

            productsCopy.splice(index, 1);
            setProducts(productsCopy);

            await ProductService.destroy(product.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {products} = await ProductService.getAll(
                {page: page}, abortController.signal);
            const productsData = products.data.map(product => ({
                image: ((product.img_url && product.img_url !== '') ?
                <img src={product.img_url} alt={product.slug ?? ''} 
                height={"70px"}/> : '----'),
                category_name: product?.category?.name,
                ...product,
                product_link:( (product.file_url && product.file_url !== '') ?
                <a href={product.file_url} download={product.file_url} 
                className="btn btn-link">Télécharger</a> : null)
            }))

            setProducts(productsData);
            setPageLength(products.last_page);
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
            <h3>Liste des publications</h3>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/products/create'>
                    <i className='icon ion-plus'></i> Ajouter une publication
                </Link>
                <div className='table-responsive'>
                    <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                    tableAttributes={tableAttributes} tableActions={tableActions} 
                    tableData={products}/>
                </div>
            </Components.Loader>
        </>
    )
}
