window.PhoneBook = {

    API_BASE_URL: "http://localhost:8081/names",

    getContacts: function () {
        $.ajax({
            url: PhoneBook.API_BASE_URL,
            method: "GET"
        }).done(function (response) {
            PhoneBook.displayContacts(JSON.parse(response));
        })
    },

    deleteContact: function (id) {
        $.ajax({
            url: PhoneBook.API_BASE_URL + "?id="+ id,
            method: "DELETE"
        }).done(function () {
            PhoneBook.getContacts();
        })
    },

    updateContact: function (id, firstName, lastName, phone, address) {
        let requestBody = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            address: address
        };

        $.ajax({
            url: PhoneBook.API_BASE_URL + "?id=" + id,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            PhoneBook.getContacts();

        });
    },


    getContactRow: function (contact) {

            return `<tr>
        <td id="firstName" data-firstName="firstName" onclick="">${contact.firstName}</td>
        <td data-lastName="lastName">${contact.lastName}</td>
        <td data-phone="phone">${contact.phone}</td>
        <td data-address="address">${contact.address}</td>
        <td>
        <a id="delete" class="buttons" style="display: inline-flex; padding-left: 10px" data-id=${contact.id}>
        <i class="fas fa-trash-alt"></i></a>
        <a id="edit" class="buttons" style="display: inline-flex; padding-left: 20px" data-id=${contact.id}>
        <i class="fas fa-user-edit"></i></a>
        </td>
    </tr>`


    },

    displayContacts: function (contacts) {
        let tableBody = "";

        contacts.forEach(contact => tableBody += PhoneBook.getContactRow(contact));

        $("#customers tbody").html(tableBody);
    },

    createContact: function () {
        let firstNameValue = $("#firstName_create").val();
        let lastNameValue = $("#lastName_create").val();
        let phoneValue = $("#phone_create").val();
        let addressValue = $("#address_create").val();

        let requestBody = {
            firstName: firstNameValue,
            lastName: lastNameValue,
            phone: phoneValue,
            address: addressValue
        }

        $.ajax({
            url: PhoneBook.API_BASE_URL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            PhoneBook.getContacts();
        })
    },


    bindEvents: function () {
        $("#adding_contact_form").submit(function (event) {
            event.preventDefault();
            PhoneBook.createContact();
        });

        $("#customers").delegate("#edit", "change", function () {
        event.preventDefault();

        let contactId = $(this).data("id");
        let contactFirstName = $(this).data("firstName");
        let contactLastName = $(this).data("lastName");
        let contactPhone = $(this).data("phone");
        let contactAddress = $(this).data("address");

        PhoneBook.updateContact(contactId,contactFirstName,contactLastName,contactPhone,contactAddress);
        });

        $("#customers").delegate("#delete", "click", function (event) {
            event.preventDefault();
            let contactId = $(this).data("id");

            PhoneBook.deleteContact(contactId);

        });
    }
};

PhoneBook.getContacts();
PhoneBook.bindEvents();
