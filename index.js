import { Command } from "commander";
import { getContactById,listContacts, removeContact, addContact  } from "./contacts.js";

const program = new Command();

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone")
    .allowUnknownOption(true);
program.parse();
const argv = program.opts();
const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list" :
            const contacts = await listContacts();
            console.table(contacts);
            break;
        case "get" :
            const contactsbyId = await getContactById(id);
            console.log(contactsbyId);
            break;
        case "add" :
            const addNewContact = await addContact({ name, email, phone });
            console.log(addNewContact);
        break;
        case "remove" :
            const deletedContact = await removeContact(id);
            console.log(deletedContact);
        break;
        default:
            console.warn("\x1B[31m Unknown action type!");
    }
};
invokeAction(argv);


