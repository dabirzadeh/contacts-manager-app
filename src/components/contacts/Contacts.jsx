import {useContext} from "react";
import {Link} from "react-router-dom";

import {ContactContext} from "../context/contact-context";
import {BACKGROUND, CURRENTLINE, GREEN, ORANGE} from "../../helpers/app-theme-colors";

import {PreLoader, Contact} from "../../components";

const Contacts = () => {
    const {preLoader, filteredContacts, deleteContact} = useContext(ContactContext);

    return (
        <>
            <section className="container my-4 text-center">
                <Link to="/contacts/create-new-contact" className="btn create-contact" style={{backgroundColor: GREEN}}>
                    ساخت مخاطب جدید
                    <i className="fa fa-plus align-middle me-2"></i>
                </Link>
            </section>
            {
                preLoader ? <PreLoader/> :
                    <section className="container text-center" style={{backgroundColor: CURRENTLINE}}>
                        <div className="row">
                            {
                                filteredContacts.length > 0 ?
                                    filteredContacts.map(contact =>
                                        <Contact key={contact.id} contact={contact}
                                                 deleteContact={() => deleteContact(contact.id, contact.fullName)}
                                        />) :
                                    <div className="col mx-3 py-4 rounded" style={{backgroundColor: BACKGROUND}}>
                                        <p className="h4 mb-4" style={{color: ORANGE}}>مخاطبی یافت نشد...!</p>
                                        <img className="img-fluid" src={require("../../assets/not-found.gif")} alt="" style={{width: "200px"}}/>
                                    </div>
                            }
                        </div>
                    </section>
            }
        </>
    );
}

export default Contacts;