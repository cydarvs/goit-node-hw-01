import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join("db", "contacts.json");

// List Contacts
const listContacts  = async () => {
    try{
        const contacts = await fs.readFile(contactsPath);
        return JSON.parse(contacts);
    }
    catch (error) {
        console.error("Error reading contacts:", error.message);
    }
};

// Search Contact By ID 
const getContactById = async (contactId) => {
    try{
        const contacts = await listContacts();
        const result = contacts.find((contact) => contact.id == contactId);
        return result || null;
    }
    catch (error){
        console.error("Error reading contacts by id:", error.message);
    }
};

// Remove Contact
const removeContact = async (contactId) => {
    try{
        const contacts = await listContacts();
        const index = contacts.findIndex((item) => item.id == contactId);
        if(index == -1){
            return null;
        }
        const deleteContact = contacts.splice(index,1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return deleteContact;
    }
    catch (error){
        console.error("Error removing contact:", error.message);
    }
};

// Add Contact
const addContact = async ({ name, email, phone }) => {
    try{
        const contacts = await listContacts();
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone,
        };
        const allContacts = [...contacts, newContact];
        await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
        return newContact;
    }
    catch (error){
        console.error("Error adding new contact:", error.message);
    }
};

// export

export { listContacts, getContactById, removeContact, addContact };



