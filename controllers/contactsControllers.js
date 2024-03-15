const contactsService = require("../services/contactsServices.js");
const ctrlWrapper = require("../helpers/ctrlWrapper.js");

const getAllContacts = async (req, res) => {
    const result = await contactsService.listContacts();
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
};

const getOneContact = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.getOneContact(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
};

const deleteContact = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

const createContact = async (req, res) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
};

const updateContact = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.updateById(id, req.body);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
};


module.exports = {
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact),
    deleteContact: ctrlWrapper(deleteContact),
    getOneContact: ctrlWrapper(getOneContact),
    getAllContacts: ctrlWrapper(getAllContacts)
}