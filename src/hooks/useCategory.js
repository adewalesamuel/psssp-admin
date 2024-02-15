import { useState } from 'react';
import { Services } from '../services';

export const useCategory = () => {
    const [id, setId] = useState('');
	const [name, setName] = useState('');
	const [slug, setSlug] = useState('');
	const [description, setDescription] = useState('');
	const [img_url, setImg_url] = useState('');
	const [category_id, setCategory_id] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getCategory = (categoryId, signal) => {        
        return Services.CategoryService.getById(categoryId, signal)
        .then(response => {
            fillCategory(response.category);
            setIsDisabled(false);
        });
    }

    const createCategory = signal => {
        const payload = {
            name,
		slug,
		description,
		img_url,
		category_id,
		
        };

        return Services.CategoryService.create(JSON.stringify(payload), signal);
    }
    const updateCategory = (categoryId, signal) => {
        const payload = {
            name,
		slug,
		description,
		img_url,
		category_id,
		
        };

        return Services.CategoryService.update(categoryId, JSON.stringify(payload), signal);
    }
    const deleteCategory = (categoryId, signal) => {
        return Services.CategoryService.destroy(categoryId, signal);
    }
    const fillCategory = (category) => {
        setId(category.id);
        setName(category.name ?? '');
		setSlug(category.slug ?? '');
		setDescription(category.description ?? '');
		setImg_url(category.img_url ?? '');
		setCategory_id(category.category_id ?? '');
		
    }
    const emptyCategory = () => {
        setId('');
        setName('');
		setSlug('');
		setDescription('');
		setImg_url('');
		setCategory_id('');
		
    }

    return {
        id,
        name,
		slug,
		description,
		img_url,
		category_id,
		
        errors,
        isDisabled,
        setName,
		setSlug,
		setDescription,
		setImg_url,
		setCategory_id,
		
        setId,
        setErrors,
        setIsDisabled,
        getCategory,
        createCategory,
        updateCategory,
        deleteCategory,
        fillCategory,
        emptyCategory
    };
}