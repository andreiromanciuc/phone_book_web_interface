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

    getContactRow: function (contact) {
    return `<tr>
        <td>${contact.firstName}</td>
        <td>${contact.lastName}</td>
        <td>${contact.phone}</td>
        <td>${contact.address}</td>
        <td>
        <a class="buttons" style="display: inline-flex; padding-left: 10px" data-id=${contact.id}>
        <i class="fas fa-trash-alt"></i></a>
        <a class="buttons" style="display: inline-flex; padding-left: 20px" data-id=${contact.id}>
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

    deleteContact: function (contact) {
        $.ajax({
            url: PhoneBook.API_BASE_URL + "?id="+ contact.id,
            method: "DELETE"
        }).done(function (response) {
            PhoneBook.displayContacts(JSON.parse(response));
        })
    },

    bindEvents: function () {
        $("#adding_contact_form").submit(function (event) {
            event.preventDefault();
            PhoneBook.createContact();
        })

    }
};

PhoneBook.getContacts();
PhoneBook.bindEvents();
