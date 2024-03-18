import * as contactsService from "../services/contactsServices.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { HttpError } from "../helpers/HttpError.js";

const getAllContacts = async (req, res) => {
    const result = await contactsService.listContacts();
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
};

const getOneContact = async (req, res) => {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
};

const deleteContact = async (req, res) => {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

const createContact = async (req, res) => {
    const { name, email, phone } = req.body;
    const result = await contactsService.addContact(name, email, phone);
    res.status(201).json(result);
};

const updateContact = async (req, res) => {
    const { id } = req.params;
    const result = await contactsService.updateContactById(id, req.body);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
};


export const createContactHandler = ctrlWrapper(createContact);
export const updateContactHandler = ctrlWrapper(updateContact);
export const deleteContactHandler = ctrlWrapper(deleteContact);
export const getOneContactHandler = ctrlWrapper(getOneContact);
export const getAllContactsHandler = ctrlWrapper(getAllContacts);