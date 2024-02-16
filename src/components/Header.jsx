import { Link, useNavigate } from "react-router-dom";

import { Utils } from "../utils";
import { Services } from "../services";
import logoSmDark from '../assets/images/logo-sm-dark.png';
import logo from '../assets/images/logo.png';
import logoDark from '../assets/images/logo-dark.png';
import logoSmLight from '../assets/images/logo-sm-light.png';
import logoLight from '../assets/images/logo-light.png';
import  avatarImg from '../assets/images/users/avatar-1.jpg';

export function Header() {
    const abortController = new AbortController();

    const admin = Utils.Auth.getUser();
    const userProfileImg = (!admin.profil_img_url || 
        admin.profil_img_url === "") ? avatarImg : admin.profil_img_url;

    const navigate = useNavigate();

    const logout = async event => {
        event.preventDefault();

        if (confirm('Vouvlez vous vraiment vous déconneter?')) {
            Utils.Auth.removeSessionToken();
            Services.AuthService.logout(abortController.signal);
            navigate('/login', {replace:true});
        }
    }
    return (
        <header id="page-topbar">
            <div className="navbar-header">
                <div className="d-flex">
                    <div className="navbar-brand-box">
                        <Link to="/" className="logo logo-dark">
                            <span className="logo-sm">k
                                <img src={logoSmDark} alt="" height="22" />
                            </span>
                            <span className="logo-lg">
                                <img src={logo} alt="" height="70" />
                            </span>
                        </Link>

                        <Link to="/" className="logo logo-light">
                            <span className="logo-sm">
                                <img src={logoSmLight} alt="" height="22" />
                            </span>
                            <span className="logo-lg">
                                <img src={logoLight} alt="" height="20" />
                            </span>
                        </Link>
                    </div>

                    <button type="button" className="btn btn-sm px-3 font-size-24 
                    -itemwaves-effect" id="vertical-menu-btn">
                        <i className="mdi mdi-backburger"></i>
                    </button>

                    <form className="app-search d-none d-lg-block">
                        <div className="position-relative">
                            <input type="text" className="form-control" 
                            placeholder="Rechercher..." />
                            <span className="mdi mdi-magnify"></span>
                        </div>
                    </form>
                </div>

                <div className="d-flex">

                    <div className="dropdown d-inline-block d-lg-none ml-2">
                        <button type="button" className="btn header-item noti-icon 
                        waves-effect" id="page-header-search-dropdown">
                            <i className="mdi mdi-magnify"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right 
                        p-0" aria-labelledby="page-header-search-dropdown">
                
                            <form className="p-3">
                                <div className="form-group m-0">
                                    <div className="input-group">
                                        <input type="text" className="form-control" 
                                        placeholder="Rechercher ..."/>
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="submit">
                                                <i className="mdi mdi-magnify"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="dropdown d-inline-block">
                        <button type="button" className="btn header-item waves-effect" 
                        id="page-header-user-dropdown" onClick={() => Utils.Dom.toggleElement('#dropdownMenu')}>
                            <img className="rounded-circle header-profile-user" src={userProfileImg}
                                alt="Header Avatar" />
                            <span className="d-none d-sm-inline-block ml-1">
                                {Utils.Auth.isLoggedIn() ? `${Utils.Auth.getUser().fullname}`: "Non connecté"}
                            </span>
                            <i className="mdi mdi-chevron-down d-none d-sm-inline-block"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right" id='dropdownMenu'>
                           {/* <a className="dropdown-item" href="##">
                                <i className="mdi mdi-face-profile font-size-16 align-middle mr-1"></i> 
                                Profile
                            </a>*/}
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#" onClick={logout}>
                                <i className="mdi mdi-logout font-size-16 align-middle mr-1"></i> Logout
                            </a>
                        </div>
                    </div>
        
                </div>
            </div>
        </header>
    )
}