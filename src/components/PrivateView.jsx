import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { Utils } from "../utils";

export function PrivateView() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!Utils.Auth.isLoggedIn()){
            navigate('/login');
        }
    })

    if (!Utils.Auth.isLoggedIn()){
        return null;
    }else {
        return <props.Component {...props}/>
    }

}