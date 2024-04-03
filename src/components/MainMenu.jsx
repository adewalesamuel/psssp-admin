import { NavLink } from "react-router-dom";

export function MainMenu() {
    return (
        <div className="vertical-menu">
            <div data-simplebar className="h-100">
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className="menu-title">Menu</li>
                        <li>
                            <NavLink exact="true" to="/">
                                <i className="mdi mdi-view-dashboard"></i>
                                <span>Tableau de bord</span>
                            </NavLink>
                            <NavLink exact="true" to="/orders">
                                <i className="mdi mdi-cart"></i>
                                <span>Commandes</span>
                            </NavLink> 
                            <NavLink exact="true" to="/users">
                                <i className="mdi mdi-account"></i>
                                <span>Utilisateur</span>
                            </NavLink> 
                            <NavLink exact="true" to="/products">
                                <i className="mdi mdi-store"></i>
                                <span>Publication</span>
                            </NavLink>
                            <NavLink exact="true" to="/subscription-plans">
                                <i className="mdi mdi-store"></i>
                                <span>Plans</span>
                            </NavLink>
                            <NavLink exact="true" to="/categories">
                                <i className="mdi mdi-store"></i>
                                <span>Categorie</span>
                            </NavLink> 
                            <NavLink exact="true" to="/countries">
                                <i className="mdi mdi-flag"></i>
                                <span>Pays</span>
                            </NavLink>
                            <NavLink exact="true" to="/admins">
                                <i className="mdi mdi-account-alert"></i>
                                <span>Administrateurs</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}