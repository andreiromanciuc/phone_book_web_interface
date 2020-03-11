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
        <td id="firstNameID" data-firstName="firstName" class="trows">
        ${contact.firstName}<br>
        </td>
        <td id="lastNameID" data-lastName="lastName" class="trows">
        ${contact.lastName}<br>
        </td>
        <td id="phoneID" data-phone="phone" class="trows"">
        ${contact.phone}<br>
        </td>
        <td id="addressID" data-address="address" class="trows">
        ${contact.address}<br>
        </td>
        <td>
        
        <a id="edit" type="submit" class="buttons"style="display: inline-flex; 
        padding-left: 10px; border: none; background-color: transparent" data-id=${contact.id}>
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

        $("#customers").on('click', '#edit', function () {
            document.getElementById('edit-tr').style.visibility = 'visible';

            let currentRow = $(this).closest("tr");
            let firstName = currentRow.find("td:eq(0)").text();
            let lastName = currentRow.find("td:eq(1)").text();
            let phoneNumber = currentRow.find("td:eq(2)").text();
            let address = currentRow.find("td:eq(3)").text();

            document.getElementById("edit-first-name").value = $.trim(firstName);
            document.getElementById("edit-last-name").value = $.trim(lastName);
            document.getElementById("edit-phone").value = $.trim(phoneNumber);
            document.getElementById("edit-address").value = $.trim(address);

            $(this).replaceWith('<a id="save" type="submit" style="display: inline-flex; border: none; ' +
                'background-color: transparent; padding-left: 10px" data-id=${contact.id}><i class="fas fa-save"></i></a>')


        });
        $("#customers").delegate("#save", "click", function (event) {
            event.preventDefault();
            let id = $(this).data("id");
            PhoneBook.updateContact(id);
            location.reload();
        });


        $("#customers").on('click', '#cancel', function (event) {
            event.preventDefault();
            PhoneBook.getContacts();
            location.reload();
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
