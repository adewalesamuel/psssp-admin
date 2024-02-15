//'use client'

export function PermissionForm(props) {
    return (
        <form className='form' disabled={props.isDisabled ?? false}
        onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input className='form-control' type='text' id='name' name='name' 
                        placeholder='Name' value={props.usePermission.name ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.usePermission.setName(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='slug'>Slug</label>
                        <input className='form-control' type='text' id='slug' name='slug' 
                        placeholder='Slug' value={props.usePermission.slug ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.usePermission.setSlug(e.target.value) ?? null} required/>
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