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

const updateStatusContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { favorite } = req.body;
        if (typeof favorite !== 'boolean') {
            return res.status(400).json({ message: 'Favorite must be a boolean value' });
        }
        const updatedContact = await contactsService.updateContactById(id, { favorite }, { new: true });
        if (!updatedContact) {
            return res.status(404).json({ message: 'Not found' });
        }
        res.status(200).json(updatedContact);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


export const createContactHandler = ctrlWrapper(createContact);
export const updateContactHandler = ctrlWrapper(updateContact);
export const deleteContactHandler = ctrlWrapper(deleteContact);
export const getOneContactHandler = ctrlWrapper(getOneContact);
export const getAllContactsHandler = ctrlWrapper(getAllContacts);
export const updateStatusContactHandler = ctrlWrapper(updateStatusContact);