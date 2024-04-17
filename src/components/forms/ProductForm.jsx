import { Components } from '../../components';
import { Hooks } from '../../hooks';
import { useEffect } from 'react';
import { Utils } from '../../utils';

export function ProductForm(props) {
    const {_} = Utils.String;

    const useImageFile = Hooks.useFile();
    const useFile = Hooks.useFile();

    useEffect(() => {
        const { file_url } = useImageFile;

        if (!file_url || file_url === '') return;

        props.useProduct.setImg_url(file_url);
    }, [useImageFile.file_url]);

    useEffect(() => {
        const { file_url } = useFile;

        if (!file_url || file_url === '') return;

        props.useProduct.setFile_url(file_url);
    }, [useFile.file_url]);

    return (
        <form className='form card col-12 col-md-6 p-4'
        onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12 col-sm-5'>
                    <div className='form-group'>
                        <label htmlFor='profile_img_url'>
                            Image de profil
                        </label>
                        <Components.ImageFileInput img_url={props.useProduct.img_url}
                        handleFileChange={useImageFile.handleFileChange}/>
                    </div>
                </div>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='name'>{_('Name')}</label>
                        <input className='form-control' type='text' id='name' name='name' 
                        placeholder='Name' value={props.useProduct.name ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useProduct.setName(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='description'>{_('Description')}</label>
                        <textarea className='form-control' type='text' id='description' name='description' 
                        placeholder='Description' value={props.useProduct.description ?? ''} rows={5}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useProduct.setDescription(e.target.value) ?? null} required></textarea>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='price'>{_('Price')}</label>
                        <input className='form-control' type='number' id='price' name='price' 
                        placeholder='Prix' value={props.useProduct.price ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useProduct.setPrice(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='category_id'>{_('Categorie')}</label>
                        <select className='select2 form-control' id='category_id' name='category_id' 
                        value={props.useProduct.category_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useProduct.setCategory_id(e.target.value) ?? null}>
                            <option hidden>Choisissez une Categorie</option>
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
                <div className='col-12'>
                    <div className='form-check form-check-inline mb-3'>
                        <label htmlFor='is_public' className="form-check-label cursor-pointer">
                            Appartient à la communauté
                            <input className='form-check-input ml-3' type='checkbox' id='is_public' 
                            name='is_active' checked={Boolean(props.useProduct.is_public)}
                            disabled={props.isDisabled} onChange={ () => 
                                props.useProduct.setIs_public(!props.useProduct.is_public) ?? null} required/>
                        </label>
                    </div>
                </div>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor="basicInputFile">Fichier</label>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="inputGroupFile01" 
                            role='button' onChange={e => useFile.handleFileChange(e.target.files[0])}
                            accept=".azw,.csv,.doc,.docx,.epub,.html,.htm,.odp,.ods,.odt,.pdf,.xhtml,.xls,.xlsx,.xml"/>
                            <label className="custom-file-label overflow-hidden" htmlFor="inputGroupFile01"
                            style={{whiteSpace: 'nowrap'}}>
                                {(props.useProduct.file_url && props.useProduct.file_url !== "" ) ?
                                props.useProduct.file_url : "Aucun fichier sélectionné"}
                            </label>
                        </div>
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