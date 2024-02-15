

export function ProductForm(props) {
    return (
        <form className='form card col-12 col-md-6 p-4'
        onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input className='form-control' type='text' id='name' name='name' 
                        placeholder='Name' value={props.useProduct.name ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useProduct.setName(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='slug'>Slug</label>
                        <input className='form-control' type='text' id='slug' name='slug' 
                        placeholder='Slug' value={props.useProduct.slug ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useProduct.setSlug(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='description'>Description</label>
                        <input className='form-control' type='text' id='description' name='description' 
                        placeholder='Description' value={props.useProduct.description ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useProduct.setDescription(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='price'>Price</label>
                        <input className='form-control' type='number' id='price' name='price' 
                        placeholder='Price' value={props.useProduct.price ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useProduct.setPrice(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='download_code'>Download_code</label>
                        <input className='form-control' type='text' id='download_code' name='download_code' 
                        placeholder='Download_code' value={props.useProduct.download_code ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useProduct.setDownload_code(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='initial_stock'>Initial_stock</label>
                        <input className='form-control' type='number' id='initial_stock' name='initial_stock' 
                        placeholder='Initial_stock' value={props.useProduct.initial_stock ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useProduct.setInitial_stock(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='current_stock'>Current_stock</label>
                        <input className='form-control' type='number' id='current_stock' name='current_stock' 
                        placeholder='Current_stock' value={props.useProduct.current_stock ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useProduct.setCurrent_stock(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='img_url'>Img_url</label>
                        <input className='form-control' type='text' id='img_url' name='img_url' 
                        placeholder='Img_url' value={props.useProduct.img_url ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useProduct.setImg_url(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='file_url'>File_url</label>
                        <input className='form-control' type='text' id='file_url' name='file_url' 
                        placeholder='File_url' value={props.useProduct.file_url ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useProduct.setFile_url(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='user_id'>User_id</label>
                        <select className='select2 form-control' id='user_id' name='user_id' 
                        value={props.useProduct.user_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useProduct.setUser_id(e.target.value) ?? null}>
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
                        <label htmlFor='category_id'>Category_id</label>
                        <select className='select2 form-control' id='category_id' name='category_id' 
                        value={props.useProduct.category_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useProduct.setCategory_id(e.target.value) ?? null}>
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