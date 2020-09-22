const express = require("express");
const userRouter = express.Router();
const constcontactModel = require("./contacts.controller");

const contacts = new constcontactModel();

userRouter.post("/contacts", contacts.createContact);
userRouter.get("/contacts", contacts.listContacts);
userRouter.get("/contacts/:contactId", contacts.findContact);
userRouter.put("/contacts/:contactId", contacts.putContact);
userRouter.delete("/contacts/:contactId", contacts.deleteContact);
module.exports = userRouter;
