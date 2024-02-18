import { Components } from '../../components';
import { Hooks } from '../../hooks';
import { useEffect } from 'react';

export function UserForm(props) {
    const useFile = Hooks.useFile();

    useEffect(() => {
        const { file_url } = useFile;

        if (!file_url || file_url === '') return;

        props.useUser.setProfile_img_url(file_url);
    }, [useFile.file_url]);

    return (
        <form className='form card col-12 col-md-6 p-4'
        onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12 col-sm-5'>
                    <div className='form-group'>
                        <label htmlFor='profile_img_url'>
                            Image de profil
                        </label>
                        <Components.ImageFileInput img_url={props.useUser.profile_img_url}
                        handleFileChange={useFile.handleFileChange}/>
                    </div>
                </div>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='fullname'>Fullname</label>
                        <input className='form-control' type='text' id='fullname' name='fullname' 
                        placeholder='Fullname' value={props.useUser.fullname ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setFullname(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input className='form-control' type='text' id='email' name='email' 
                        placeholder='Email' value={props.useUser.email ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setEmail(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input className='form-control' type='text' id='password' name='password' 
                        placeholder='Password' value={props.useUser.password ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setPassword(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='phone_number'>Phone_number</label>
                        <input className='form-control' type='text' id='phone_number' name='phone_number' 
                        placeholder='Phone_number' value={props.useUser.phone_number ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setPhone_number(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='backup_number'>Backup_number</label>
                        <input className='form-control' type='text' id='backup_number' name='backup_number' 
                        placeholder='Backup_number' value={props.useUser.backup_number ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setBackup_number(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='whatsapp_number'>Whatsapp_number</label>
                        <input className='form-control' type='text' id='whatsapp_number' name='whatsapp_number' 
                        placeholder='Whatsapp_number' value={props.useUser.whatsapp_number ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setWhatsapp_number(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='telegram_number'>Telegram_number</label>
                        <input className='form-control' type='text' id='telegram_number' name='telegram_number' 
                        placeholder='Telegram_number' value={props.useUser.telegram_number ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setTelegram_number(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='shop_name'>Shop_name</label>
                        <input className='form-control' type='text' id='shop_name' name='shop_name' 
                        placeholder='Shop_name' value={props.useUser.shop_name ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setShop_name(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-check form-check-inline mb-3'>
                        <label htmlFor='is_active' className="form-check-label cursor-pointer">
                            Is_active
                            <input className='form-check-input ml-3' type='checkbox' id='is_active' name='is_active' 
                            placeholder='Is_active' checked={Boolean(props.useUser.is_active)}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useUser.setIs_active(!Boolean(props.useUser.is_active)) ?? null} required/>
                        </label>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='country_id'>Country_id</label>
                        <select className='select2 form-control' id='country_id' name='country_id' 
                        value={props.useUser.country_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useUser.setCountry_id(e.target.value) ?? null}>
                            <option hidden>Choisissez un pays</option>
                            {
                                props.countries.map(country => {
                                    return (<option key={Math.random()} value={country.id ?? ''}>
                                                {country.name}
                                            </option>)
                                })
                            } 
                        </select>
                    </div>
                </div>
				
                <div className='col-12 text-right'>
                    <button disabled={props.isDisabled ?? false} type='button' 
                    className='btn btn-primary' onClick={props.handleFormSubmit}>
                        <span>Enregistrer</span>
                    </button>
                </div>
            </div>
        </form>
    )
}