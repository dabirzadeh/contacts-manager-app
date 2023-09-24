import {useContext, useEffect} from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {useImmer} from "use-immer";

import {ContactContext} from "../context/contact-context";

import {contactSchema} from "../validations/contact-validation";
import {BACKGROUND, COMMENT, ORANGE, PURPLE} from "../../helpers/app-theme-colors";
import {getContact, updateContact} from "../../services/contact-service";

import toast from "react-hot-toast";

import {PreLoader} from "../";

const UpdateContact = () => {
    const {preLoader, setPreLoader, setContacts, setFilteredContacts, groups} = useContext(ContactContext);

    const [contact, setContact] = useImmer({});

    const {contactId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContact = async () => {
            try {
                setPreLoader(true);
                const {data: contactInfo} = await getContact(contactId);
                setContact(contactInfo);
                setPreLoader(false);
            } catch (error) {
                console.log(error.message);
                setPreLoader(false);
            }
        }
        fetchContact();
    }, []);

    //- BEGIN: Contact Update Function 👇🏻
        const updateCurrentContact = async (values) => {
            try {
                setPreLoader(true);
                const {status, data} = await updateContact(contactId, values);
                if (status === 200) {
                    setContacts(draft => {
                        const contactIndex = draft.findIndex(contact => contact.id === parseInt(contactId));
                        draft[contactIndex] = {...data};
                    });
                    setFilteredContacts(draft => {
                        const contactIndex = draft.findIndex(contact => contact.id === parseInt(contactId));
                        draft[contactIndex] = {...data};
                    });
                    setPreLoader(false);
                    navigate("/contacts");
                    toast(
                        "مخاطب با موفقیت بروزرسانی شد.",
                        {
                            icon: "😉"
                        }
                    );
                }
            } catch (error) {
                console.log(error.message);
                setPreLoader(false);
            }
        }
    //- END: Contact Update Function 👆🏻

    return (
        <>
            {
                preLoader ? <PreLoader/> :
                    <section className="container text-center">
                        <div className="row my-4">
                            <div className="col">
                                <p className="h4 m-0 fw-bold" style={{color: ORANGE}}>ویرایش مخاطب</p>
                            </div>
                        </div>
                        <hr className="m-0" style={{color: ORANGE}}/>
                        <div className="row mt-4 mx-auto py-4 px-xl-3 px-lg-2 px-md-1 px-1 rounded shadow" style={{backgroundColor: BACKGROUND}}>
                            <div className="col-xl-5 col-lg-5 col-md-5">
                                <Formik initialValues=
                                            {{
                                                fullName: contact.fullName,
                                                profilePhoto: contact.profilePhoto,
                                                mobileNumber: contact.mobileNumber,
                                                emailAddress: contact.emailAddress,
                                                job: contact.job,
                                                group: contact.group
                                            }}
                                        validationSchema={contactSchema}
                                        onSubmit={values => updateCurrentContact(values)}
                                >
                                    <Form id="update-contact-form">
                                        <div className="form-floating mb-2">
                                            <Field type="text" className="form-control mb-2" id="fullName" name="fullName" placeholder=""/>
                                            <label htmlFor="fullName">نام و نام خانوادگی</label>
                                            <ErrorMessage name="fullName" render={msg => <span className="text-danger">{msg}</span>}/>
                                        </div>
                                        <div className="form-floating mb-2">
                                            <Field type="text" className="form-control mb-2" id="profilePhoto" name="profilePhoto" placeholder=""/>
                                            <label htmlFor="profilePhoto">آدرس تصویر پروفایل</label>
                                            <ErrorMessage name="profilePhoto" render={msg => <span className="text-danger">{msg}</span>}/>
                                        </div>
                                        <div className="form-floating mb-2">
                                            <Field type="number" className="form-control mb-2" id="mobileNumber" name="mobileNumber" placeholder="" min="0"/>
                                            <label htmlFor="mobileNumber">شماره موبایل</label>
                                            <ErrorMessage name="mobileNumber" render={msg => <span className="text-danger">{msg}</span>}/>
                                        </div>
                                        <div className="form-floating mb-2">
                                            <Field type="email" className="form-control mb-2" id="emailAddress" name="emailAddress" placeholder=""/>
                                            <label htmlFor="emailAddress">آدرس ایمیل</label>
                                            <ErrorMessage name="emailAddress" render={msg => <span className="text-danger">{msg}</span>}/>
                                        </div>
                                        <div className="form-floating mb-2">
                                            <Field type="text" className="form-control mb-2" id="job" name="job" placeholder=""/>
                                            <label htmlFor="job">شغل (اختیاری)</label>
                                        </div>
                                        <div className="form-floating mb-4">
                                            <Field as="select" className="form-select mb-2" id="group" name="group">
                                                <option value="">گروه مورد نظر خود را انتخاب کنید</option>
                                                {
                                                    groups.length > 0 && groups.map(group =>
                                                        <option key={group.id} value={group.id}>{group.name}</option>
                                                    )
                                                }
                                            </Field>
                                            <label htmlFor="group">انتخاب گروه</label>
                                            <ErrorMessage name="group" render={msg => <span className="text-danger">{msg}</span>}/>
                                        </div>
                                        <div>
                                            <input type="submit" className="btn update-button ms-3" value="بروزرسانی مخاطب" style={{backgroundColor: ORANGE}}/>
                                            <Link to="/contacts" className="btn cancel-button" style={{backgroundColor: COMMENT}}>انصراف</Link>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                            <div className="col-xl-7 col-lg-7 col-md-7 my-xl-0 my-lg-0 my-md-0 my-4">
                                <img className="img-fluid rounded shadow" src={contact.profilePhoto} alt=""
                                     style={{width: "300px", height: "300px", border: `1px solid ${PURPLE}`, objectFit: "cover"}}
                                />
                            </div>
                        </div>
                    </section>
            }
        </>
    );
}

export default UpdateContact;