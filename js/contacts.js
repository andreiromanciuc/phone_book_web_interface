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


    getContactsByFirstName: function () {
        let firstName = $("#firstName_search").val();
        $.ajax({
            url: PhoneBook.API_BASE_URL + "?firstName=" + firstName,
            method: "GET"
        }).done(function (response) {
            PhoneBook.displayContacts(JSON.parse(response));
        })
    },

    getContactsByLastName: function () {
        let lastName = $("#lastName_search").val();
        $.ajax({
            url: PhoneBook.API_BASE_URL + "?lastName=" + lastName,
            method: "GET"
        }).done(function (response) {
            PhoneBook.displayContacts(JSON.parse(response));
        })
    },

    deleteContact: function (id) {
        let result = confirm("Are you sure?");
        $.ajax({
            url: PhoneBook.API_BASE_URL + "?id=" + id,
            method: "DELETE"
        }).done(function () {
            if (result) {
                PhoneBook.getContacts();
                location.reload();
            }
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
            location.reload();
        });
    },

    editContacts: function () {
        document.getElementById("firstNameID").innerHTML =
            '<input id="edit-first-name" type="text" placeholder="edit...">';
        document.getElementById("lastNameID").innerHTML =
            '<input id="edit-last-name" type="text" placeholder="edit...">';
        document.getElementById("phoneID").innerHTML =
            '<input id="edit-last-name" type="tel" placeholder="edit...">';
        document.getElementById("addressID").innerHTML =
            '<input id="edit-last-name" type="text" placeholder="edit...">';
    },
//jq/toggle
    // sa pun fieldurile hidden linga nume si sa pun un buton de save
    getContactRow: function (contact) {

        return `<tr>
        <td id="firstNameID" data-firstName="firstName">${contact.firstName}<input id="edit-first-name" type="text" placeholder="edit..." hidden></td>
        <td id="lastNameID" data-lastName="lastName">${contact.lastName}</td>
        <td id="phoneID" data-phone="phone">${contact.phone}</td>
        <td id="addressID" data-address="address">${contact.address}</td>
        <td>
        <a id="edit" class="buttons" style="display: inline-flex; padding-left: 10px" data-id=${contact.id}>
        <i class="fas fa-user-edit"></i></a>
        <a id="delete" class="buttons" style="display: inline-flex; padding-left: 30px" data-id=${contact.id}>
        <i class="fas fa-trash-alt"></i></a>
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
        };

        $.ajax({
            url: PhoneBook.API_BASE_URL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            PhoneBook.getContacts();
            location.reload();
        })
    },


    bindEvents: function () {

        $("#search-firstName").submit(function (event) {
            event.preventDefault();
            PhoneBook.getContactsByFirstName();

        });
        $("#search-lastName").submit(function (event) {
            event.preventDefault();
            PhoneBook.getContactsByLastName();
        });


        $("#adding_contact_form").submit(function (event) {
            event.preventDefault();
            PhoneBook.createContact();

        });

        $("#to-delegate").delegate("#firstNameID", "click", function (event) {
            event.preventDefault();

            let contactId = $(this).data("id");
            let contactFirstName = $('input[name=firstName]').val();
            let contactLastName = $('input[name=lastName]').val();
            let contactPhone = $('input[name=phone]').val();
            let contactAddress = $('input[name=address]').val();

            PhoneBook.updateContact(contactId, contactFirstName, contactLastName, contactPhone, contactAddress);

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
