import { useState } from 'react';
import { Services } from '../services';

export const useAdmin = () => {
    const [id, setId] = useState('');
	const [fullname, setFullname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [profile_img_url, setProfile_img_url] = useState('');
	const [role_id, setRole_id] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getAdmin = (adminId, signal) => {        
        return Services.AdminService.getById(adminId, signal)
        .then(response => {
            fillAdmin(response.admin);
            setIsDisabled(false);
        });
    }

    const createAdmin = signal => {
        const payload = {
            fullname,
		email,
		password,
		profile_img_url,
		role_id,
		
        };

        return Services.AdminService.create(JSON.stringify(payload), signal);
    }
    const updateAdmin = (adminId, signal) => {
        const payload = {
            fullname,
		email,
		password,
		profile_img_url,
		role_id,
		
        };

        return Services.AdminService.update(adminId, JSON.stringify(payload), signal);
    }
    const deleteAdmin = (adminId, signal) => {
        return Services.AdminService.destroy(adminId, signal);
    }
    const fillAdmin = (admin) => {
        setId(admin.id);
        setFullname(admin.fullname ?? '');
		setEmail(admin.email ?? '');
		setPassword(admin.password ?? '');
		setProfile_img_url(admin.profile_img_url ?? '');
		setRole_id(admin.role_id ?? '');
		
    }
    const emptyAdmin = () => {
        setId('');
        setFullname('');
		setEmail('');
		setPassword('');
		setProfile_img_url('');
		setRole_id('');
		
    }

    return {
        id,
        fullname,
		email,
		password,
		profile_img_url,
		role_id,
		
        errors,
        isDisabled,
        setFullname,
		setEmail,
		setPassword,
		setProfile_img_url,
		setRole_id,
		
        setId,
        setErrors,
        setIsDisabled,
        getAdmin,
        createAdmin,
        updateAdmin,
        deleteAdmin,
        fillAdmin,
        emptyAdmin
    };
}