

export function CategoryForm(props) {
    return (
        <form className='form card col-12 col-md-6 p-4'
        onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input className='form-control' type='text' id='name' name='name' 
                        placeholder='Name' value={props.useCategory.name ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useCategory.setName(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='slug'>Slug</label>
                        <input className='form-control' type='text' id='slug' name='slug' 
                        placeholder='Slug' value={props.useCategory.slug ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useCategory.setSlug(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='description'>Description</label>
                        <input className='form-control' type='text' id='description' name='description' 
                        placeholder='Description' value={props.useCategory.description ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useCategory.setDescription(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='img_url'>Img_url</label>
                        <input className='form-control' type='text' id='img_url' name='img_url' 
                        placeholder='Img_url' value={props.useCategory.img_url ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useCategory.setImg_url(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='category_id'>Category_id</label>
                        <select className='select2 form-control' id='category_id' name='category_id' 
                        value={props.useCategory.category_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useCategory.setCategory_id(e.target.value) ?? null}>
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