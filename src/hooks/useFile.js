import { useState } from 'react';
import { Services } from '../services';

export const useFile = () => {
	const abortController = new AbortController();

	const [file_url, setFile_url] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isDisabled, setIsDisabled] = useState('false');

	const handleFileChange = async file => {
		setIsDisabled(true);

		try {
			const formData = new FormData();

			formData.append('img', file);

			const {img_url} = await Services.FileService.store(
				formData, abortController.signal);

			setFile_url(img_url);
		} catch(error) {
			console.log(error);
			if (!('message' in error)) return;
			setErrorMessage(error.message);
		} finally {
			setIsDisabled(false);
		}
	}

	return {
		file_url,
		errorMessage,
		handleFileChange
	}
}