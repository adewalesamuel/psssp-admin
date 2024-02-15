import { useState } from 'react';
import { Services } from '../services';

export const useUser = () => {
    const [id, setId] = useState('');
	const [fullname, setFullname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [phone_number, setPhone_number] = useState('');
	const [backup_number, setBackup_number] = useState('');
	const [whatsapp_number, setWhatsapp_number] = useState('');
	const [telegram_number, setTelegram_number] = useState('');
	const [shop_name, setShop_name] = useState('');
	const [profile_img_url, setProfile_img_url] = useState('');
	const [is_active, setIs_active] = useState('');
	const [sponsor_code, setSponsor_code] = useState('');
	const [activation_code, setActivation_code] = useState('');
	const [country_id, setCountry_id] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getUser = (userId, signal) => {        
        return Services.UserService.getById(userId, signal)
        .then(response => {
            fillUser(response.user);
            setIsDisabled(false);
        });
    }

    const createUser = signal => {
        const payload = {
            fullname,
		email,
		password,
		phone_number,
		backup_number,
		whatsapp_number,
		telegram_number,
		shop_name,
		profile_img_url,
		is_active,
		sponsor_code,
		activation_code,
		country_id,
		
        };

        return Services.UserService.create(JSON.stringify(payload), signal);
    }
    const updateUser = (userId, signal) => {
        const payload = {
            fullname,
		email,
		password,
		phone_number,
		backup_number,
		whatsapp_number,
		telegram_number,
		shop_name,
		profile_img_url,
		is_active,
		sponsor_code,
		activation_code,
		country_id,
		
        };

        return Services.UserService.update(userId, JSON.stringify(payload), signal);
    }
    const deleteUser = (userId, signal) => {
        return Services.UserService.destroy(userId, signal);
    }
    const fillUser = (user) => {
        setId(user.id);
        setFullname(user.fullname ?? '');
		setEmail(user.email ?? '');
		setPassword(user.password ?? '');
		setPhone_number(user.phone_number ?? '');
		setBackup_number(user.backup_number ?? '');
		setWhatsapp_number(user.whatsapp_number ?? '');
		setTelegram_number(user.telegram_number ?? '');
		setShop_name(user.shop_name ?? '');
		setProfile_img_url(user.profile_img_url ?? '');
		setIs_active(user.is_active ?? '');
		setSponsor_code(user.sponsor_code ?? '');
		setActivation_code(user.activation_code ?? '');
		setCountry_id(user.country_id ?? '');
		
    }
    const emptyUser = () => {
        setId('');
        setFullname('');
		setEmail('');
		setPassword('');
		setPhone_number('');
		setBackup_number('');
		setWhatsapp_number('');
		setTelegram_number('');
		setShop_name('');
		setProfile_img_url('');
		setIs_active('');
		setSponsor_code('');
		setActivation_code('');
		setCountry_id('');
		
    }

    return {
        id,
        fullname,
		email,
		password,
		phone_number,
		backup_number,
		whatsapp_number,
		telegram_number,
		shop_name,
		profile_img_url,
		is_active,
		sponsor_code,
		activation_code,
		country_id,
		
        errors,
        isDisabled,
        setFullname,
		setEmail,
		setPassword,
		setPhone_number,
		setBackup_number,
		setWhatsapp_number,
		setTelegram_number,
		setShop_name,
		setProfile_img_url,
		setIs_active,
		setSponsor_code,
		setActivation_code,
		setCountry_id,
		
        setId,
        setErrors,
        setIsDisabled,
        getUser,
        createUser,
        updateUser,
        deleteUser,
        fillUser,
        emptyUser
    };
}