import express from "express";
import { getAllContactsHandler, getOneContactHandler, deleteContactHandler, createContactHandler, updateContactHandler } from "../controllers/contactsControllers.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";
import { isValidId } from "../middlewares/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContactsHandler);

contactsRouter.get("/:id", isValidId, getOneContactHandler);

contactsRouter.delete("/:id", isValidId, deleteContactHandler);

contactsRouter.post("/", validateBody(createContactSchema), createContactHandler);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContactHandler);

export { contactsRouter };