import express from "express";
import { getAllContactsHandler, getOneContactHandler, deleteContactHandler, createContactHandler, updateContactHandler } from "../controllers/contactsControllers.js";
import { validateBody } from "../helpers/validateBody.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContactsHandler);

contactsRouter.get("/:id", getOneContactHandler);

contactsRouter.delete("/:id", deleteContactHandler);

contactsRouter.post("/", validateBody(createContactSchema), createContactHandler);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContactHandler);

export { contactsRouter };