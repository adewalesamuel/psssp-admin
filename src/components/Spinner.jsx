export function Spinner(props) {
    return (
        <div className="d-flex align-items-center justify-content-center w-100"
        style={{minHeight: `${props.cotainerHeight ?? 'O'}px`}}>
            <i className="la la-spinner spinner" style={{fontSize: `${props.size ?? "10"}px`}}></i>
        </div>
    )
}