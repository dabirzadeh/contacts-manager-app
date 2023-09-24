import {useContext, useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";

import {ContactContext} from "../context/contact-context";

import {BACKGROUND, CYAN, PURPLE} from "../../helpers/app-theme-colors";
import {getContact, getGroup} from "../../services/contact-service";

import {PreLoader} from "../";

const ViewContact = () => {
    const {preLoader, setPreLoader} = useContext(ContactContext);

    const [state, setState] =
        useState(
            {
                contact: {},
                group: {}
            }
        );

    const {contactId} = useParams();

    useEffect(() => {
        const fetchContact = async () => {
            try {
                setPreLoader(true);
                const {data: contactInfo} = await getContact(contactId);
                const {data: groupInfo} = await getGroup(contactInfo.group);
                setState(
                    {
                        ...state,
                        contact: contactInfo,
                        group: groupInfo
                    }
                );
                setPreLoader(false);
            } catch (error) {
                console.log(error.message);
                setPreLoader(false);
            }
        }
        fetchContact();
    }, []);

    const {contact, group} = state;

    return (
        <>
            {
                preLoader ? <PreLoader/> :
                    <section  className="container text-center">
                        <div className="row my-4">
                            <div className="col">
                                <p className="h4 m-0 fw-bold" style={{color: CYAN}}>اطلاعات کامل مخاطب</p>
                            </div>
                        </div>
                        <hr className="m-0" style={{color: CYAN}}/>
                        <div className="row mt-4 mx-auto py-4 px-xl-3 px-lg-2 px-md-1 px-1 align-items-center rounded shadow" style={{backgroundColor: BACKGROUND}}>
                            <div className="col-xl-5 col-lg-5 col-md-5">
                                <img className="img-fluid rounded shadow" src={contact.profilePhoto} alt=""
                                     style={{width: "300px", height: "300px", border: `1px solid ${PURPLE}`, objectFit: "cover"}}
                                />
                            </div>
                            <div className="col-xl-7 col-lg-7 col-md-7 my-xl-0 my-lg-0 my-md-0 my-4">
                                <ul className="list-group p-0">
                                    <li className="list-group-item list-group-item-dark">
                                        نام و نام خانوادگی:{" "}<span className="fw-bold">{contact.fullName}</span>
                                    </li>
                                    <li className="list-group-item list-group-item-dark">
                                        شماره موبایل:{" "}<span className="fw-bold">{"0".concat(contact.mobileNumber)}</span>
                                    </li>
                                    <li className="list-group-item list-group-item-dark">
                                        ایمیل:{" "}<span className="fw-bold">{contact.emailAddress}</span>
                                    </li>
                                    <li className="list-group-item list-group-item-dark">
                                        شغل:{" "}<span className="fw-bold">{contact.job}</span>
                                    </li>
                                    <li className="list-group-item list-group-item-dark">
                                        گروه:{" "}<span className="fw-bold">{group.name}</span>
                                    </li>
                                </ul>
                                <div className="mt-4">
                                    <Link to="/contacts" className="btn return-button" style={{backgroundColor: CYAN}}>بازگشت به صفحه اصلی</Link>
                                </div>
                            </div>
                        </div>
                    </section>
            }
        </>
    );
}

export default ViewContact;