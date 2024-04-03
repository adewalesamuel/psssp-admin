//'use client'
export function SubscriptionPlanForm(props) {
    return (
        <form className='form card col-12 col-md-6 p-4' 
        onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='name'>name</label>
                        <input className='form-control' type='text' id='name' name='name' 
                        placeholder='name' value={props.useSubscriptionPlan.name ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useSubscriptionPlan.setName(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='slug'>slug</label>
                        <input className='form-control' type='text' id='slug' name='slug' 
                        placeholder='slug' value={props.useSubscriptionPlan.slug ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useSubscriptionPlan.setSlug(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='price'>price</label>
                        <input className='form-control' type='number' id='price' name='price' 
                        placeholder='price' value={props.useSubscriptionPlan.price ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useSubscriptionPlan.setPrice(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='description'>description</label>
                        <input className='form-control' type='text' id='description' name='description' 
                        placeholder='description' value={props.useSubscriptionPlan.description ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useSubscriptionPlan.setDescription(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                <div className='form-group'>
                    <label htmlFor='num_product'>num_product</label>
                    <input className='form-control' type='number' id='num_product' name='num_product' 
                    placeholder='num_product' value={props.useSubscriptionPlan.num_product ?? ''}
                    disabled={props.isDisabled} onChange={ e => 
                            props.useSubscriptionPlan.setNum_product(e.target.value) ?? null} required/>
                </div>
            </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='num_account'>num_account</label>
                        <input className='form-control' type='number' id='num_account' name='num_account' 
                        placeholder='num_account' value={props.useSubscriptionPlan.num_account ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useSubscriptionPlan.setNum_account(e.target.value) ?? null} required/>
                    </div>
                </div>
				
                <div className='col-12 text-right'>
                    <button disabled={props.isDisabled ?? false} type='submit' 
                    className='btn btn-primary'>
                        {props.isDisabled ? 'Chargement...' :  'Enregistrer'}
                    </button>
                </div>
            </div>
        </form>
    )
}