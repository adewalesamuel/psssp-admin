import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { Utils } from "../utils";

export function AuthLayout(props) {
    const navigate = useNavigate();
    const {isLoggedIn} = Utils.Auth;
    
    useEffect(() => {
        window.document.body.className = "bg-primary bg-pattern";

        if (isLoggedIn()) return navigate('/', {replace: true});
    }, [])

    if (isLoggedIn()) return null;

    return (
        <div className="account-pages my-5 pt-5">
            <div className="container">
                {props.children}
            </div>
        </div>
    )
}