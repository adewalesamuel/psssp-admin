

export function OrderForm(props) {
    return (
        <form className='form' disabled={props.isDisabled ?? false}
        onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='code'>Code</label>
                        <input className='form-control' type='text' id='code' name='code' 
                        placeholder='Code' value={props.useOrder.code ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useOrder.setCode(e.target.value) ?? null} required/>
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
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='product_id'>Product_id</label>
                        <select className='select2 form-control' id='product_id' name='product_id' 
                        value={props.useOrder.product_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useOrder.setProduct_id(e.target.value) ?? null}>
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
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='user_id'>User_id</label>
                        <select className='select2 form-control' id='user_id' name='user_id' 
                        value={props.useOrder.user_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useOrder.setUser_id(e.target.value) ?? null}>
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