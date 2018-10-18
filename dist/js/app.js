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
        filter: '',
        error: ''
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
                        contact.lastname.toLowerCase().indexOf(search)  !== -1 ||
                        contact.emailaddr.toLowerCase().indexOf(search) !== -1 ||
                        contact.phonenum.toLowerCase().indexOf(search)  !== -1
                    ) {
                        return contact;
                    }
                });
            }

            // Then, sort.
            if (this.sortBy) {
                filteredContacts.sort(this.compare);
                if (!this.sortAscending) {
                    filteredContacts.reverse();
                }
            }

            return filteredContacts;
        }
    },

    methods: {

        addOrUpdateContact: function() {
            this.error = '';
            // Validate first/last name - need one or both!
            if (!this.formFirst && !this.formLast) {
                this.error = 'Please enter either a <strong>first name</strong> or a <strong>last name</strong> (or both).';
            }
            // Validate email if one is present
            if (this.formEmail && !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(this.formEmail)) {
                this.error = 'Please enter a valid <strong>email address</strong>.';
            }
            // Validate phone number
            if (this.formPhone && !/^[\+\d-\. extEXT\(\)]+$/.test(this.formPhone)) {
                this.error = 'Please enter a valid phone number.';
            }
            if (this.error) return;

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
            if (!this.contacts.length) {
                this.showForm = true;
            }
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
        },

        compare(a, b) {
            const valueA = a[this.sortBy].toLowerCase();
            const valueB = b[this.sortBy].toLowerCase();

            if (valueA < valueB) {
                return -1;
            }
            if (valueA > valueB) {
                return 1;
            }
        }
    }

});
