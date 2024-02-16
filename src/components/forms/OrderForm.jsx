

export function OrderForm(props) {
    return (
        <form className='form card col-12 col-md-6 p-4'
        onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='user_name'>Nom de l&apos;utilisateur</label>
                        <input className='form-control' type='text' id='user_name' name='user_name' 
                        value={props.user?.fullname ?? '...'} disabled={true}/>
                    </div>
                </div>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='product_id'>Product_id</label>
                        <select className='select2 form-control' id='product_id' name='product_id' 
                        value={props.useOrder.product_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useOrder.setProduct_id(e.target.value) ?? null}>
                        <option hidden>Choisissez une publication</option>
                            {
                                props.products.map(product => {
                                    return (<option key={Math.random()} value={product.id ?? ''}>
                                                {product.name}
                                            </option>)
                                })
                            }
                        </select>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='quantity'>Quantity</label>
                        <input className='form-control' type='number' id='quantity' name='quantity' 
                        placeholder='Quantity' value={props.useOrder.quantity ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useOrder.setQuantity(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='amount'>Amount</label>
                        <input className='form-control' type='number' id='amount' name='amount' 
                        placeholder='Amount' value={props.useOrder.amount ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useOrder.setAmount(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='status'>Status</label>
                        <select className='select2 form-control' id='status' name='status' 
                        value={props.useOrder.status ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useOrder.setStatus(e.target.value) ?? null}>
                            <option hidden>Choisissez un statut</option>
                            <option value={'pending'}>En cours</option>
                            <option value={'validated'}>Validé</option>
                            <option value={'cancelled'}>Annulé</option>
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