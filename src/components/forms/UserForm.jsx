//'use client'

export function UserForm(props) {
    return (
        <form className='form' disabled={props.isDisabled ?? false}
        onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
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
                    <div className='form-group'>
                        <label htmlFor='profile_img_url'>Profile_img_url</label>
                        <input className='form-control' type='text' id='profile_img_url' name='profile_img_url' 
                        placeholder='Profile_img_url' value={props.useUser.profile_img_url ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setProfile_img_url(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='is_active'>Is_active</label>
                        <input className='form-control' type='radio' id='is_active' name='is_active' 
                        placeholder='Is_active' value={props.useUser.is_active ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setIs_active(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='sponsor_code'>Sponsor_code</label>
                        <input className='form-control' type='text' id='sponsor_code' name='sponsor_code' 
                        placeholder='Sponsor_code' value={props.useUser.sponsor_code ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setSponsor_code(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='activation_code'>Activation_code</label>
                        <input className='form-control' type='text' id='activation_code' name='activation_code' 
                        placeholder='Activation_code' value={props.useUser.activation_code ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setActivation_code(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='country_id'>Country_id</label>
                        <select className='select2 form-control' id='country_id' name='country_id' 
                        value={props.useUser.country_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useUser.setCountry_id(e.target.value) ?? null}>
                            {/* {
                                props.items.map(item => {
                                    return (<option key={Math.random()} value={item.id ?? ''}>
                                                {item.name}
                                            </option>)
                                })
                            }  */}
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