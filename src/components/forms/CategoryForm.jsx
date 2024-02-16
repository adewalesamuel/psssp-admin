

export function CategoryForm(props) {
    return (
        <form className='form card col-12 col-md-6 p-4'
        onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
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
                        <label htmlFor='name'>Name</label>
                        <input className='form-control' type='text' id='name' name='name' 
                        placeholder='Name' value={props.useCategory.name ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useCategory.setName(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='description'>Description</label>
                        <textarea className='form-control' type='text' id='description' name='description' 
                        placeholder='Description' value={props.useCategory.description ?? ''} rows={5}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useCategory.setDescription(e.target.value) ?? null} required></textarea>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='category_id'>Category parente</label>
                        <select className='select2 form-control' id='category_id' name='category_id' 
                        value={props.useCategory.category_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useCategory.setCategory_id(e.target.value) ?? null}>
                            <option value={null}>Aucune categorie parente</option>
                             {
                                props.categories.map(category => {
                                    return (<option key={Math.random()} value={category.id ?? ''}>
                                                {category.name}
                                            </option>)
                                })
                            }  
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