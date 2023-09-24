import {useContext} from "react";
import {Link} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from "formik";

import {ContactContext} from "../context/contact-context";

import {contactSchema} from "../validations/contact-validation";
import {BACKGROUND, COMMENT, GREEN, PURPLE} from "../../helpers/app-theme-colors";

import {PreLoader} from "../";

const CreateContact = () => {
    const {preLoader, groups, createContact} = useContext(ContactContext);

    return (
        <>
            {
                preLoader ? <PreLoader/> :
                    <section className="container text-center">
                        <div className="row my-4">
                            <div className="col">
                                <p className="h4 m-0 fw-bold" style={{color: GREEN}}>ساخت مخاطب جدید</p>
                            </div>
                        </div>
                        <hr className="m-0" style={{color: GREEN}}/>
                        <div className="row mt-4 mx-auto py-4 px-xl-3 px-lg-2 px-md-1 px-1 align-items-center rounded shadow" style={{backgroundColor: BACKGROUND}}>
                            <div className="col-xl-5 col-lg-5 col-md-5">
                                <Formik initialValues=
                                            {{
                                                fullName: "",
                                                profilePhoto: "",
                                                mobileNumber: "",
                                                emailAddress: "",
                                                job: "",
                                                group: ""
                                            }}
                                        validationSchema={contactSchema}
                                        onSubmit={values => createContact(values)}
                                >
                                    <Form id="create-contact-form">
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
                                            <input type="submit" className="btn create-button ms-3" value="ساخت مخاطب" style={{backgroundColor: PURPLE}}/>
                                            <Link to="/contacts" className="btn cancel-button" style={{backgroundColor: COMMENT}}>انصراف</Link>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                            <div className="col-xl-7 col-lg-7 col-md-7 my-xl-0 my-lg-0 my-md-0 my-4">
                                <img className="img-fluid" src={require("../../assets/man-taking-note.png")} alt=""
                                     style={{width: "600px", opacity: "70%"}}
                                />
                            </div>
                        </div>
                    </section>
            }
        </>
    );
}

export default CreateContact;