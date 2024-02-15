
import {useNavigate} from 'react-router-dom';
import { Utils } from "../utils";
import { useEffect } from "react";
import { Components } from '../components';

export function MainLayout(props) {
    const navigate = useNavigate();
    const {isLoggedIn} = Utils.Auth;

    useEffect(() => {
        window.document.body.className = "";

        if (!isLoggedIn()) return navigate('/login', {replace: true});
    }, [])


    return (
        <>
            <Components.Header />
            <Components.MainMenu />
            <div id="layout-wrapper">
                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid">
                            {props.children}
                        </div>
                    </div>
                    <Components.Footer />
                </div>
            </div>
        </>
    )
}