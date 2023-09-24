import {useEffect} from "react";
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import _ from "lodash";
import {useImmer} from "use-immer";

import {ContactContext} from "./components/context/contact-context";

import {COMMENT, CURRENTLINE, FOREGROUND, GREEN, RED, YELLOW} from "./helpers/app-theme-colors";
import {getAllContacts, getAllGroups, createContact, deleteContact} from "./services/contact-service";

import {Navbar, Contacts, CreateContact, ViewContact, UpdateContact} from "./components";

import toast, {Toaster} from "react-hot-toast";
import {confirmAlert} from "react-confirm-alert";

const App = () => {
    const [preLoader, setPreLoader] = useImmer(false);
    const [contacts, setContacts] = useImmer([]);
    const [groups, setGroups] = useImmer([]);
    const [filteredContacts, setFilteredContacts] = useImmer([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                setPreLoader(true);
                const {data: contactsInfo} = await getAllContacts();
                const {data: groupsInfo} = await getAllGroups();
                setContacts(contactsInfo);
                setGroups(groupsInfo);
                setFilteredContacts(contactsInfo);
                setPreLoader(false);
            } catch (error) {
                console.log(error.message);
                setPreLoader(false);
            }
        }
        fetchContacts();
    }, []);

    //- BEGIN: Contact Search Function 👇🏻
        //- DESCRIPTION: The debounce method is used from lodash library.
        const searchContact = _.debounce(query => {
            setFilteredContacts(draft => draft.filter(contact =>
                contact["fullName"].toLowerCase().startsWith(query.toLowerCase())
            ));
            if (!query) return setFilteredContacts([...contacts]);
        }, 1000);
    //- END: Contact Search Function 👆🏻

    //- BEGIN: Contact Create Function 👇🏻
        /* DESCRIPTION:
            - The useImmer hook is used from use-immer library.
            - The toast function and Toaster component is used from react-hot-toast library.
        */
        const createNewContact = async (values) => {
            try {
                setPreLoader(true);
                const {status, data: newContact} = await createContact(values);
                if (status === 201) {
                    setContacts(draft => {
                        draft.push(newContact)
                    });
                    setFilteredContacts(draft => {
                        draft.push(newContact)
                    });
                    setPreLoader(false);
                    navigate("/contacts");
                    toast(
                        "مخاطب با موفقیت ساخته شد.",
                        {
                            icon: "🙂"
                        }
                    );
                }
            } catch (error) {
                console.log(error.message);
                setPreLoader(false);
            }
        }
    //- END: Contact Create Function 👆🏻

    //- BEGIN: Contact Delete Function 👇🏻
        //- DESCRIPTION: The confirmAlert component is used from react-confirm-alert library.
        const contactDeleteAlert = (contactId, contactFullName) => {
            confirmAlert({
                customUI: ({onClose}) => {
                    return (
                        <div className="p-4" dir="rtl" style={{backgroundColor: CURRENTLINE, borderRadius: ".375rem", boxShadow: "0 0 0 .25rem rgba(68, 71, 90, .25)"}}>
                            <h4 style={{color: RED}}>پاک کردن مخاطب</h4>
                            <p style={{color: FOREGROUND}}>مطمئنی که میخوای مخاطب <span style={{color: YELLOW}}>{contactFullName}</span> رو پاک کنی؟</p>
                            <button className="btn delete-button mt-2 ms-3" onClick={() => {deleteCurrentContact(contactId); onClose();}} style={{backgroundColor: GREEN}}>مطمئن هستم</button>
                            <button className="btn cancel-button mt-2" onClick={onClose} style={{backgroundColor: COMMENT}}>انصراف</button>
                        </div>
                    );
                }
            });
        }
        const deleteCurrentContact = async (contactId) => {
            const contactsBackup = [...contacts];
            try {
                setPreLoader(true);
                setContacts(draft => draft.filter(contact => contact["id"] !== contactId));
                setFilteredContacts(draft => draft.filter(contact => contact["id"] !== contactId));
                const {status} = await deleteContact(contactId);
                if (status !== 200) {
                    setContacts(contactsBackup)
                    setFilteredContacts(contactsBackup);
                }
                setPreLoader(false);
                toast(
                    "مخاطب با موفقیت حذف شد.",
                    {
                        icon: "🙁",
                        duration: 3000
                    }
                );
            } catch (error) {
                console.log(error.message);
                setContacts(contactsBackup)
                setFilteredContacts(contactsBackup);
                setPreLoader(false);
            }
        }
    //- END: Contact Delete Function 👆🏻

    return (
        <ContactContext.Provider value={{
            preLoader,
            setPreLoader,
            contacts,
            setContacts,
            filteredContacts,
            setFilteredContacts,
            groups,
            searchContact,
            createContact: createNewContact,
            deleteContact: contactDeleteAlert
        }}>
            <Toaster/>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Navigate to="/contacts"/>}/>
                <Route path="/contacts" element={<Contacts/>}/>
                <Route path="/contacts/create-new-contact" element={<CreateContact/>}/>
                <Route path="/contacts/:contactId" element={<ViewContact/>}/>
                <Route path="/contacts/update-current-contact/:contactId" element={<UpdateContact/>}/>
            </Routes>
        </ContactContext.Provider>
    );
}

export default App;