import { useState } from 'react';
import { Services } from '../services';

export const useEbook = () => {
    const [id, setId] = useState('');
	const [name, setName] = useState('');
	const [slug, setSlug] = useState('');
	const [type, setType] = useState('');
	const [download_code, setDownload_code] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [initial_stock, setInitial_stock] = useState('');
	const [img_url, setImg_url] = useState('');
	const [file_url, setFile_url] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getEbook = (ebookId, signal) => {        
        return Services.EbookService.getById(ebookId, signal)
        .then(response => {
            fillEbook(response.ebook);
            setIsDisabled(false);
        });
    }

    const createEbook = signal => {
        const payload = {
            name,
		slug,
		type,
		download_code,
		description,
		price,
		initial_stock,
		img_url,
		file_url,
		
        };

        return Services.EbookService.create(JSON.stringify(payload), signal);
    }
    const updateEbook = (ebookId, signal) => {
        const payload = {
            name,
		slug,
		type,
		download_code,
		description,
		price,
		initial_stock,
		img_url,
		file_url,
		
        };

        return Services.EbookService.update(ebookId, JSON.stringify(payload), signal);
    }
    const deleteEbook = (ebookId, signal) => {
        return Services.EbookService.destroy(ebookId, signal);
    }
    const fillEbook = (ebook) => {
        setId(ebook.id);
        setName(ebook.name ?? '');
		setSlug(ebook.slug ?? '');
		setType(ebook.type ?? '');
		setDownload_code(ebook.download_code ?? '');
		setDescription(ebook.description ?? '');
		setPrice(ebook.price ?? '');
		setInitial_stock(ebook.initial_stock ?? '');
		setImg_url(ebook.img_url ?? '');
		setFile_url(ebook.file_url ?? '');
		
    }
    const emptyEbook = () => {
        setId('');
        setName('');
		setSlug('');
		setType('');
		setDownload_code('');
		setDescription('');
		setPrice('');
		setInitial_stock('');
		setImg_url('');
		setFile_url('');
		
    }

    return {
        id,
        name,
		slug,
		type,
		download_code,
		description,
		price,
		initial_stock,
		img_url,
		file_url,
		
        errors,
        isDisabled,
        setName,
		setSlug,
		setType,
		setDownload_code,
		setDescription,
		setPrice,
		setInitial_stock,
		setImg_url,
		setFile_url,
		
        setId,
        setErrors,
        setIsDisabled,
        getEbook,
        createEbook,
        updateEbook,
        deleteEbook,
        fillEbook,
        emptyEbook
    };
}