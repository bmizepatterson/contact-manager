// This isn't set up to copy yet!

let app = new Vue({

    el: "#app",

    data: {

        nextId: 1,
        contacts: [],
        showForm: true,
        formFirst: '',
        formLast: '',
        formEmail: '',
        formPhone: '',
        formOldId: '',
        sortAscending: false,
        sortBy: '',
        filter: ''
    },

    mounted: function() {

        if (localStorage.contacts) {
            this.contacts = JSON.parse(localStorage.contacts);
        }
        this.nextId = this.findNextId();
    },

    computed: {

        displayList: function() {

            // First, filter.
            let search = this.filter.trim().toLowerCase();
            let filteredContacts = this.contacts;

            if (search) {
                filteredContacts = filteredContacts.filter((contact) => {
                    if (
                        contact.firstname.toLowerCase().indexOf(search) !== -1 ||
                        contact.lastname.toLowerCase().indexOf(search) !== -1 ||
                        contact.emailaddr.toLowerCase().indexOf(search) !== -1 ||
                        contact.phonenum.toLowerCase().indexOf(search) !== -1
                    ) {
                        return contact;
                    }
                });
            }


            // Then, sort.


            return filteredContacts;

        }
    },

    methods: {

        addOrUpdateContact: function() {

            // TODO: validate input

            // If updating then just delete the old one and add a new
            if (this.formOldId) {
                this.deleteContact(this.formOldId);
            }

            let newContact = {
                id: this.nextId,
                firstname: this.formFirst,
                lastname: this.formLast,
                emailaddr: this.formEmail,
                phonenum: this.formPhone
            };

            this.contacts.push(newContact);
            this.saveToDisk();
            this.clearForm();
            this.nextId++;
        },

        sortContacts: function(field) {
            console.log("Sorting contacts by [" + field + "]");

            // TODO: validate input
            if (field == this.sortBy) {
                // Toggle sort ascending
                this.sortAscending = !this.sortAscending;
            } else {
                this.sortBy = field;
                this.sortAscending = true;
            }
        },

        toggleForm: function() {
            this.showForm = !this.showForm;
            if (!this.showForm) this.clearForm();
        },

        editContact: function(id) {
            let updateContact = this.contacts[this.findContactById(id)];
            this.formFirst = updateContact.firstname;
            this.formLast = updateContact.lastname;
            this.formEmail = updateContact.emailaddr;
            this.formPhone = updateContact.phonenum;
            this.formOldId = updateContact.id;
            this.showForm = true;
        },

        deleteContact: function(id) {

            // TODO: Ask for confirmation

            this.contacts.splice(this.findContactById(id), 1);
            this.saveToDisk();
        },

        findContactById: function(id) {
            let index = -1;
            for (let i = 0; i < this.contacts.length; i++) {
                if (this.contacts[i].id === id) {
                    index = i;
                    break;
                }
            }
            return index;
        },

        clearForm: function() {
            this.formFirst = this.formLast = this.formEmail = this.formPhone = this.formOldId = '';
        },

        saveToDisk: function() {
            localStorage.setItem('contacts', JSON.stringify(this.contacts));
        },

        findNextId: function() {
            let max = 0;    // Let IDs start at one
            this.contacts.forEach((contact) => {
                if (contact.id > max) max = contact.id;
            });
            return ++max;
        }
    }

});
