import {createContext} from "react";

export const ContactContext = createContext({
    preLoader: false,
    setPreLoader: () => {},
    contacts: [],
    setContacts: () => {},
    filteredContacts: [],
    setFilteredContacts: () => {},
    groups: [],
    searchContact: () => {},
    createContact: () => {},
    deleteContact: () => {}
});