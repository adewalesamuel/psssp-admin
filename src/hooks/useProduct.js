import { useState } from 'react';
import { Services } from '../services';

export const useProduct = () => {
    const [id, setId] = useState('');
	const [name, setName] = useState('');
	const [slug, setSlug] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [is_public, setIs_public] = useState(false);
	const [download_code, setDownload_code] = useState('');
	const [initial_stock, setInitial_stock] = useState('');
	const [current_stock, setCurrent_stock] = useState('');
	const [img_url, setImg_url] = useState('');
	const [file_url, setFile_url] = useState('');
	const [user_id, setUser_id] = useState(null);
	const [category_id, setCategory_id] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getProduct = (productId, signal) => {        
        return Services.ProductService.getById(productId, signal)
        .then(response => {
            fillProduct(response.product);
            setIsDisabled(false);
        });
    }

    const createProduct = signal => {
        const payload = {
            name,
		slug,
		description,
		price,
		download_code,
		initial_stock,
		current_stock,
		img_url,
		file_url,
		user_id,
		is_public,
		category_id,
		
        };

        return Services.ProductService.create(JSON.stringify(payload), signal);
    }
    const updateProduct = (productId, signal) => {
        const payload = {
            name,
		slug,
		description,
		price,
		download_code,
		initial_stock,
		current_stock,
		img_url,
		file_url,
		user_id,
		is_public,
		category_id,
		
        };

        return Services.ProductService.update(productId, JSON.stringify(payload), signal);
    }
    const deleteProduct = (productId, signal) => {
        return Services.ProductService.destroy(productId, signal);
    }
    const fillProduct = (product) => {
        setId(product.id);
        setName(product.name ?? '');
		setSlug(product.slug ?? '');
		setDescription(product.description ?? '');
		setPrice(product.price ?? '');
		setDownload_code(product.download_code ?? '');
		setInitial_stock(product.initial_stock ?? '');
		setCurrent_stock(product.current_stock ?? '');
		setImg_url(product.img_url ?? '');
		setFile_url(product.file_url ?? '');
		setUser_id(product.user_id ?? '');
		setIs_public(product.is_public ?? '')
		setCategory_id(product.category_id ?? '');
		
    }
    const emptyProduct = () => {
        setId('');
        setName('');
		setSlug('');
		setDescription('');
		setPrice('');
		setDownload_code('');
		setInitial_stock('');
		setCurrent_stock('');
		setImg_url('');
		setFile_url('');
		setUser_id('');
		setCategory_id('');
		setIs_public('');
		
    }

    return {
        id,
        name,
		slug,
		description,
		price,
		download_code,
		initial_stock,
		current_stock,
		img_url,
		file_url,
		user_id,
		is_public,
		category_id,
		
        errors,
        isDisabled,
        setName,
		setSlug,
		setDescription,
		setPrice,
		setDownload_code,
		setInitial_stock,
		setCurrent_stock,
		setImg_url,
		setFile_url,
		setUser_id,
		setIs_public,
		setCategory_id,
		
        setId,
        setErrors,
        setIsDisabled,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        fillProduct,
        emptyProduct
    };
}