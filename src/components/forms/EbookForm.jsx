

export function EbookForm(props) {
    return (
        <form className='form card col-12 col-md-6 p-4'
        onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input className='form-control' type='text' id='name' name='name' 
                        placeholder='Name' value={props.useEbook.name ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useEbook.setName(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='slug'>Slug</label>
                        <input className='form-control' type='text' id='slug' name='slug' 
                        placeholder='Slug' value={props.useEbook.slug ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useEbook.setSlug(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='type'>Type</label>
                        <select className='select2 form-control' id='type' name='type' 
                        value={props.useEbook.type ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useEbook.setType(e.target.value) ?? null}>
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
                        <label htmlFor='download_code'>Download_code</label>
                        <input className='form-control' type='text' id='download_code' name='download_code' 
                        placeholder='Download_code' value={props.useEbook.download_code ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useEbook.setDownload_code(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='description'>Description</label>
                        <input className='form-control' type='text' id='description' name='description' 
                        placeholder='Description' value={props.useEbook.description ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useEbook.setDescription(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='price'>Price</label>
                        <input className='form-control' type='number' id='price' name='price' 
                        placeholder='Price' value={props.useEbook.price ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useEbook.setPrice(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='initial_stock'>Initial_stock</label>
                        <input className='form-control' type='number' id='initial_stock' name='initial_stock' 
                        placeholder='Initial_stock' value={props.useEbook.initial_stock ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useEbook.setInitial_stock(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='img_url'>Img_url</label>
                        <input className='form-control' type='text' id='img_url' name='img_url' 
                        placeholder='Img_url' value={props.useEbook.img_url ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useEbook.setImg_url(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='file_url'>File_url</label>
                        <input className='form-control' type='text' id='file_url' name='file_url' 
                        placeholder='File_url' value={props.useEbook.file_url ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useEbook.setFile_url(e.target.value) ?? null} required/>
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