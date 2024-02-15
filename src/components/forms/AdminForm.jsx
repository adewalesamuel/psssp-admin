//'use client'

export function AdminForm(props) {
    return (
        <form className='form' disabled={props.isDisabled ?? false}
        onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='fullname'>Fullname</label>
                        <input className='form-control' type='text' id='fullname' name='fullname' 
                        placeholder='Fullname' value={props.useAdmin.fullname ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useAdmin.setFullname(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input className='form-control' type='text' id='email' name='email' 
                        placeholder='Email' value={props.useAdmin.email ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useAdmin.setEmail(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input className='form-control' type='text' id='password' name='password' 
                        placeholder='Password' value={props.useAdmin.password ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useAdmin.setPassword(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='profile_img_url'>Profile_img_url</label>
                        <input className='form-control' type='text' id='profile_img_url' name='profile_img_url' 
                        placeholder='Profile_img_url' value={props.useAdmin.profile_img_url ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useAdmin.setProfile_img_url(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='role_id'>Role_id</label>
                        <select className='select2 form-control' id='role_id' name='role_id' 
                        value={props.useAdmin.role_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useAdmin.setRole_id(e.target.value) ?? null}>
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