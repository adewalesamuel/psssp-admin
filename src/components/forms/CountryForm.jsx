

export function CountryForm(props) {
    return (
        <form className='form card col-12 col-md-6 p-4'
        onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input className='form-control' type='text' id='name' name='name' 
                        placeholder='Name' value={props.useCountry.name ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useCountry.setName(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='code'>Code</label>
                        <input className='form-control' type='text' id='code' name='code' 
                        placeholder='Code' value={props.useCountry.code ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useCountry.setCode(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='phone_code'>Phone_code</label>
                        <input className='form-control' type='text' id='phone_code' name='phone_code' 
                        placeholder='Phone_code' value={props.useCountry.phone_code ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useCountry.setPhone_code(e.target.value) ?? null} required/>
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