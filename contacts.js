const fs = require("fs");
const path = require("path");
const { uuid } = require('uuidv4');


const contactsPath = path.resolve("./db/contacts.json");


function listContacts() {
    fs.readFile(contactsPath, (err, data) => {
        if (err) {
            return console.log(err);
        }

        const contacts = JSON.parse(data);
        console.log('List of contacts: ');
        console.table(contacts);
    });
}


function getContactById(contactId) {
    fs.readFile(contactsPath, (err, data) => {
        if (err) {
            return console.log(err);
        }

        const contacts = JSON.parse(data);

        const contact = contacts.find(contact => {
            if (contact.id === contactId) {
                console.log(`Your contact by id - ${contactId}:`);
                console.table(contact);
                return contact;
            }
        });

        if (contact == null) {
            console.log(`Contact with id "${contactId}" not found!`);
        }
    });
}


function removeContact(contactId) {
    fs.readFile(contactsPath, (err, data) => {
        if (err) {
            return console.log(err);
        }

        const contacts = JSON.parse(data);
        const newContact = contacts.filter(contact => contact.id !== contactId);

        if (newContact.length === contacts.length) {
            console.log(
                `Contact with id "${contactId}" don't removed!`,
            );
            return;
        }

        console.log(`Contact deleted. Your list of contacts: `);
        console.table(newContact);

        fs.writeFile(contactsPath, JSON.stringify(newContact), err => {
            if (err) {
                return console.log('error:', err);
            }
        });
    });
}

function addContact(name, email, phone) {
    fs.readFile(contactsPath, (err, data) => {
        if (err) {
            return console.log(err);
        }

        const contacts = JSON.parse(data);

        contacts.push({
            id: uuid(),
            name: name,
            email: email,
            phone: phone,
        });

        console.log(`Contact added. Your list of contacts: `);
        console.table(contacts)

        fs.writeFile(contactsPath, JSON.stringify(contacts), err => {
            if (err) {
                return console.log(err);
            }
        });
    });
}


exports.listContacts = listContacts;
exports.getContactById = getContactById;
exports.removeContact = removeContact;
exports.addContact = addContact;