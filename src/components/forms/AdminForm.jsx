import { Utils } from '../../utils';

export function AdminForm(props) {
    const {_} = Utils.String;

    return (
        <form className='form card col-12 col-md-6 p-4'
        onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='fullname'>{_('Fullname')}</label>
                        <input className='form-control' type='text' id='fullname' name='fullname' 
                        placeholder={_('Fullname')} value={props.useAdmin.fullname ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useAdmin.setFullname(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='email'>{_('E-mail')}</label>
                        <input className='form-control' type='text' id='email' name='email' 
                        placeholder={_('E-mail')} value={props.useAdmin.email ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useAdmin.setEmail(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='password'>{_('Password')}</label>
                        <input className='form-control' type='text' id='password' name='password' 
                        placeholder={_('Password')} value={props.useAdmin.password ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useAdmin.setPassword(e.target.value) ?? null} required/>
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