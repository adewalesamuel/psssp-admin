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
	const [user_id, setUser_id] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getUser = (accountId, signal) => {        
        return Services.UserService.getById(accountId, signal)
        .then(response => {
            fillUser(response.account);
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
		user_id,
		
        };

        return Services.UserService.create(JSON.stringify(payload), signal);
    }
    const updateUser = (accountId, signal) => {
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
		user_id,
		
        };

        return Services.UserService.update(accountId, JSON.stringify(payload), signal);
    }
    const deleteUser = (accountId, signal) => {
        return Services.UserService.destroy(accountId, signal);
    }
    const fillUser = (account) => {
        setId(account.id);
        setFullname(account.fullname ?? '');
		setEmail(account.email ?? '');
		setPassword(account.password ?? '');
		setPhone_number(account.phone_number ?? '');
		setBackup_number(account.backup_number ?? '');
		setWhatsapp_number(account.whatsapp_number ?? '');
		setTelegram_number(account.telegram_number ?? '');
		setShop_name(account.shop_name ?? '');
		setProfile_img_url(account.profile_img_url ?? '');
		setIs_active(account.is_active ?? '');
		setSponsor_code(account.sponsor_code ?? '');
		setActivation_code(account.activation_code ?? '');
		setCountry_id(account.country_id ?? '');
		setUser_id(account.user_id ?? '');
		
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
		setUser_id('');
		
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
		user_id,
		
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
		setUser_id,
		
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