// This isn't set up to copy yet!

let app = new Vue({

    el: "#app",

    data: {

        nextId: 3,

        contacts: [
            {
                id: 1,
                firstname: 'John',
                lastname: 'Deer',
                emailaddr: 'jdeer@example.com',
                phonenum: '867-5309'
            },
            {
                id: 2,
                firstname: 'Jane',
                lastname: 'Doe',
                emailaddr: 'janed@example.com',
                phonenum: '859-123-4567'
            }
        ],

        buttonText: 'Add',

        showForm: true,

        formFirst: '',
        formLast: '',
        formEmail: '',
        formPhone: '',
        formOldId: ''

    },

    methods: {

        addOrUpdateContact: function() {

            // validate input

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

            this.clearForm();

            this.nextId++;
            this.buttonText = 'Add';
        },

        sortContacts: function(field) {
            console.log("Sorting contacts by [" + field + "]");
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
            this.buttonText = 'Update';
        },

        deleteContact: function(id) {

            // TODO: Ask for confirmation

            this.contacts.splice(this.findContactById(id), 1);
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
        }
    }

});
