import {useLocation, Link} from "react-router-dom";

import {BACKGROUND, PURPLE} from "../helpers/app-theme-colors";

import {SearchContact} from "../components";

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="navbar navbar-dark shadow py-3" style={{backgroundColor: BACKGROUND}}>
            <div className="container justify-content-around">
                <Link to="/contacts" className="navbar-brand me-0 mb-lg-0 mb-md-0 mb-3">
                    <i className="fa fa-id-badge align-middle ms-2" style={{color: PURPLE}}/>
                    وب اپلیکیشن مدیریت
                    {" "}
                    <span style={{color: PURPLE}}>مخاطبین</span>
                </Link>
                {location.pathname === "/contacts" ? (<SearchContact/>) : null}
            </div>
        </nav>
    );
}

export default Navbar;