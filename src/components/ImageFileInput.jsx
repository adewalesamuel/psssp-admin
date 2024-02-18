import imgPlaceholder from '../assets/images/users/avatar-1.jpg';

export function ImageFileInput(props) {

    return (
        <div>
            <div className="position-relative d-inline-block">
                <input className='position-absolute w-100 h-100 fade cursor-pointer' 
                type='file' role='button' onChange={e => props.handleFileChange(e.target.files[0])} 
                accept={props.acceptMimes ?? 'images/*'} style={{top: 0, left: 0}}/>
                <img src={props.img_url !== '' ? props.img_url : imgPlaceholder} 
                className="img-fluid rounded" alt=""/>
            </div>
        </div>
    )
}