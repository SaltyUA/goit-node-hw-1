import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} from "./contacts.js";

import { Command } from "commander";

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.table(allContacts);
      break;
    case "get":
      const oneContact = await getContactById(id);
      console.log(oneContact);
      break;
    case "remove":
      const removeContactById = await removeContact(id);
      console.log(removeContactById);
      break;
    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;
    default:
      console.warn("/x1B[31m unknow action type!");
  }
};

invokeAction(argv);
