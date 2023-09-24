import {Link} from "react-router-dom";

import {BACKGROUND, CYAN, ORANGE, PURPLE, RED} from "../../helpers/app-theme-colors";

const Contact = ({contact, deleteContact}) => {
    return (
        <div className="col-xl-6">
            <div className="card mb-xl-3 mb-lg-3 mb-3 border-0 shadow" style={{backgroundColor: BACKGROUND}}>
                <div className="card-body px-xl-3 px-lg-4 px-md-5">
                    <div className="row align-items-center">
                        <div className="col-xl-4 col-lg-3 col-md-3 mb-xl-0 mb-lg-0 mb-md-0 mb-3">
                            <Link to={contact.profilePhoto} target="_blank">
                                <img className="img-fluid rounded profile-photo" src={contact.profilePhoto} title="مشاهده پروفایل" alt=""
                                     style={{width: "150px", height: "150px", border: `1px solid ${PURPLE}`, objectFit: "cover"}}/>
                            </Link>
                        </div>
                        <div className="col-xl-6 col-lg-8 col-md-8 mb-xl-0 mb-lg-0 mb-md-0 mb-3 text-end">
                            <ul className="list-group p-0">
                                <li className="list-group-item list-group-item-dark">
                                    نام و نام خانوادگی:{" "}<span className="fw-bold">{contact.fullName}</span>
                                </li>
                                <li className="list-group-item list-group-item-dark">
                                    شماره موبایل:{" "}<span className="fw-bold">{"0".concat(contact.mobileNumber)}</span>
                                </li>
                                <li className="list-group-item list-group-item-dark">
                                    آدرس ایمیل:{" "}<span className="fw-bold">{contact.emailAddress}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-xl-2 col-lg-1 col-md-1">
                            <Link to={`/contacts/${contact.id}`}
                                  className="btn view-contact ms-xl-0 ms-lg-0 ms-md-0 ms-3 mb-xl-3 mb-lg-3 mb-md-3 mb-0"
                                  title="اطلاعات کامل مخاطب" style={{backgroundColor: ORANGE}}
                            >
                                <i className="fa fa-eye align-middle"></i>
                            </Link>
                            <Link to={`/contacts/update-current-contact/${contact.id}`}
                                  className="btn update-contact ms-xl-0 ms-lg-0 ms-md-0 ms-3 mb-xl-3 mb-lg-3 mb-md-3 mb-0"
                                  title="ویرایش مخاطب" style={{backgroundColor: CYAN}}
                            >
                                <i className="fa fa-pen align-middle"></i>
                            </Link>
                            <button className="btn delete-contact" title="حذف مخاطب" onClick={deleteContact} style={{backgroundColor: RED}}>
                                <i className="fa fa-trash align-middle"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;