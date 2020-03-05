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
        let result = confirm("Are you sure?");
        $.ajax({
            url: PhoneBook.API_BASE_URL + "?id=" + id,
            method: "DELETE"
        }).done(function () {
            if (result) {
                PhoneBook.getContacts();
            }
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

    updateContact: function (id) {


        let firstName = $("#edit-first-name").val();
        let lastName = $("#edit-last-name").val();
        let phone = $("#edit-phone").val();
        let address = $("#edit-address").val();

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
            window.PhoneBook.reload(false);

        });
    },


    getContactRow: function (contact) {

        return `<tr>
        <td id="firstNameID" data-firstName="firstName" class="trows" onclick="document.getElementById('edit-first-name').style.visibility = 'visible';
        document.getElementById('edit-last-name').style.visibility = 'visible';
        document.getElementById('edit-phone').style.visibility = 'visible';
        document.getElementById('edit-address').style.visibility = 'visible';
        document.getElementById('save').style.visibility = 'visible';
        ">
        ${contact.firstName}<br>
<!--        <input id="edit-first-name" type="text" placeholder="edit First Name" style="visibility: hidden">-->
        </td>
        <td id="lastNameID" data-lastName="lastName" class="trows" onclick="document.getElementById('edit-last-name').style.visibility = 'visible';
        document.getElementById('edit-first-name').style.visibility = 'visible';
        document.getElementById('edit-phone').style.visibility = 'visible';
        document.getElementById('edit-address').style.visibility = 'visible';
        document.getElementById('save').style.visibility = 'visible';">
        ${contact.lastName}<br>
<!--        <input id="edit-last-name" type="text" placeholder="edit Last Name" style="visibility: hidden">-->
        </td>
        <td id="phoneID" data-phone="phone" class="trows" onclick="document.getElementById('edit-phone').style.visibility = 'visible';
        document.getElementById('edit-first-name').style.visibility = 'visible';
        document.getElementById('edit-last-name').style.visibility = 'visible';
        document.getElementById('edit-address').style.visibility = 'visible';
        document.getElementById('save').style.visibility = 'visible';">
        ${contact.phone}<br>
<!--        <input id="edit-phone" type="tel" placeholder="edit Phone" style="visibility: hidden">-->
        </td>
        <td id="addressID" data-address="address" class="trows" onclick="document.getElementById('edit-address').style.visibility = 'visible';
        document.getElementById('edit-first-name').style.visibility = 'visible';
        document.getElementById('edit-last-name').style.visibility = 'visible';
        document.getElementById('edit-phone').style.visibility = 'visible';
        document.getElementById('save').style.visibility = 'visible';">
        ${contact.address}<br>
<!--        <input id="edit-address" type="text" placeholder="edit address" style="visibility: hidden">-->
        </td>
        <td>
        <button id="edit" type="submit" class="buttons"style="display: inline-flex; 
        padding-left: 10px; border: none; background-color: transparent" data-id=${contact.id}>
        <i class="fas fa-user-edit"></i></button>
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

        $("#customers").delegate("#edit", "click", function (event) {
            event.preventDefault();
            let id = $(this).data("id");
            PhoneBook.updateContact(id);
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
