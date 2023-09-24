import axios from 'axios';

// const SERVER_URL = "http://localhost:9000";
const SERVER_URL = "https://contacts-api.alirezada.ir";

// @desc: Fetch All Contacts Info
// @route: GET http://localhost:9000/contacts
export const getAllContacts = () => {
    const url = `${SERVER_URL}/contacts`;
    return axios.get(url);
}

// @desc: Fetch Contact Info With Contact ID
// @route: GET http://localhost:9000/contacts/:contactId
export const getContact = (contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.get(url);
}

// @desc:  Fetch All Groups Info
// @route: GET http://localhost:9000/groups
export const getAllGroups = () => {
    const url = `${SERVER_URL}/groups`;
    return axios.get(url);
}

// @desc:  Fetch Group Info With Group ID
// @route: GET http://localhost:9000/groups/:groupId
export const getGroup = (groupId) => {
    const url = `${SERVER_URL}/groups/${groupId}`;
    return axios.get(url);
}

// @desc:  Create New Contact
// @route: POST http://localhost:9000/contacts
export const createContact = (contact) => {
    const url = `${SERVER_URL}/contacts`;
    return axios.post(url, contact);
}

// @desc:  Update Current Contact
// @route: PUT http://localhost:9000/contacts/:contactId
export const updateContact = (contactId, contact) => {
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.put(url, contact);
}

// @desc:  Delete Current Contact
// @route: DELETE http://localhost:9000/contacts/:contactId
export const deleteContact = (contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.delete(url);
}