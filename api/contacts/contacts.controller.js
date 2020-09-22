const contactModel = require("./contacts.model");
const { contactsValadation } = require("./contacts.validation");

class ContactsController {
  async createContact(req, res, next) {
    const { error } = contactsValadation.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }
    try {
      const contact = await contactModel.create(req.body);
      return res.status(201).json(contact);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async listContacts(req, res, next) {
    try {
      const contact = await contactModel.find();
      return res.status(201).json(contact);
    } catch (err) {
      res.status(404).send(err.message);
    }
  }

  async findContact(req, res, next) {
    let { contactId } = req.params;
    try {
      const contact = await contactModel.findById(contactId);
      if (!contact) {
        return res.status(404).send({ message: "Not found" });
      }
      res.status(200).json(contact);
    } catch (err) {
      next(err);
    }
  }

  async putContact(req, res, next) {
    let { contactId } = req.params;

    try {
      const updateContacts = await contactModel.findByIdAndUpdate(
        contactId,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );

      if (!updateContacts) {
        res.status(404).send({ message: "Not found" });
      }

      res.status(200).json(updateContacts);
    } catch (err) {
      next(err);
    }
  }

  async deleteContact(req, res, next) {
    let { contactId } = req.params;

    try {
      const contact = await contactModel.findByIdAndDelete(contactId);
      if (!contact) {
        return res.status(404).send({ message: "Not found" });
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ContactsController;
