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
        formPhone: ''

    },

    methods: {

        addOrUpdateContact: function() {

            // validate input

            let newContact = {
                id: this.nextId,
                firstname: this.formFirst,
                lastname: this.formLast,
                emailaddr: this.formEmail,
                phonenum: this.formPhone
            };

            this.contacts.push(newContact);

            this.formFirst = this.formLast = this.formEmail = this.formPhone = '';

            this.nextId++;
        },

        sortContacts: function(field) {
            console.log("Sorting contacts by [" + field + "]");
        },

        toggleForm: function() {
            this.showForm = !this.showForm;
        }

    }

});
