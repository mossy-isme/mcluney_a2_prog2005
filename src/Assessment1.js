// Define the Client class
var Client = /** @class */ (function () {
    function Client(isVIP, clientID, name, DOB, gender, fitnessProgram, contactInfo, joinedDate, endingDate, specialHealthNotes) {
        this.isVIP = isVIP;
        this.clientID = clientID;
        this.name = name;
        this.DOB = DOB;
        this.gender = gender;
        this.fitnessProgram = fitnessProgram;
        this.contactInfo = contactInfo;
        this.joinedDate = joinedDate;
        this.endingDate = endingDate;
        this.specialHealthNotes = specialHealthNotes;
    }
    Client.prototype.displayClientInfo = function () {
        var _a;
        if (this.contactInfo.email == null) {
            var emailGiven = "None given";
        }
        else {
            var emailGiven = this.contactInfo.email;
        }
        ;
        if (this.isVIP ? true : false) {
            var checked = "checked";
        }
        else {
            var checked = "";
        }
        ;
        if (this.specialHealthNotes != "") {
            var notes = (_a = this.specialHealthNotes) === null || _a === void 0 ? void 0 : _a.toString();
        }
        else {
            var notes = "None given";
        }
        return "\n        <div class=\"client-card\" id=\"client-card-".concat(this.clientID, "\">\n\n          <h3><input class=\"editable\" type=\"text\" id=\"name-").concat(this.clientID, "\" value=\"").concat(this.name, "\" disabled/> (").concat(this.clientID, ")</h3>\n          <button style=\"width:30%\" onclick=\"editClient(").concat(this.clientID, ")\">Edit Client</button>\n          <button style=\"width:30%\" onclick=\"deleteClient(").concat(this.clientID, ")\">Delete Client</button>\n\n          <p style=\"float:none\"><strong>Gender: </strong><select class=\"editable\" id=\"gender-").concat(this.clientID, "\" value=\"").concat(this.gender, "\" disabled>\n          <option value=\"Male\">Male</option>\n          <option value=\"Female\">Female</option>\n          <option value=\"Unspecified\">Unspecified</option></select\n        ></p>\n\n          <p><strong>Fitness Program: </strong><select class=\"editable\" id=\"fitnessProgram-").concat(this.clientID, "\" value=\"").concat(this.fitnessProgram, "\" disabled>\n          <option value=\"fat loss\">Fat loss</option>\n          <option value=\"senior fitness\">Senior fitness</option>\n          <option value=\"muscle gain\">Muscle gain</option>\n          <option value=\"pre/postnatal fitness\">Pre/Postnatal fitness</option>\n          <option value=\"contest preparation\">Contest preparation</option>\n          <option value=\"overall fitness\">Overall fitness</option></select\n        ></p>\n          \n          <p><strong>Address: </strong><input type=\"text\" class=\"editable\" id=\"address-").concat(this.clientID, "\" value=\"").concat(this.contactInfo.address, "\" required disabled/></p>\n          <p><strong>Phone Number: </strong><input type=\"text\" class=\"editable\" id=\"phoneNumber-").concat(this.clientID, "\" value=\"").concat(this.contactInfo.phoneNumber, "\" required disabled/></p>\n          <p><strong>Email: </strong><input type=\"email\" class=\"editable\" id=\"email-").concat(this.clientID, "\" value=\"").concat(emailGiven, "\" disabled/>\n </p>\n          <p><strong>DOB: </strong> ").concat(this.DOB.toLocaleDateString(), "</p>\n          <p><strong>Joined Date: </strong> ").concat(this.joinedDate.toLocaleDateString(), "</p>\n          <p><strong>Ending Date: </strong> ").concat(this.endingDate.toLocaleDateString(), "</p>\n          <p><strong>Notes: </strong><textarea class=\"editable\" id=\"specialHealthNotes-").concat(this.clientID, "\" value=\"").concat(notes, "\" disabled></textarea></p>\n          <p><strong>VIP Client: </strong><input type=\"checkbox\" class=\"editable checkbox\" id=\"isVIP-").concat(this.clientID, "\" ").concat(checked, " disabled/></p>\n          <button id=\"updateButton\" class=\"editable\" onclick=\"updateClient(").concat(this.clientID, ")\" disabled>Update details</button>\n        </div>\n      ");
    };
    return Client;
}());
// Database of clients
var clients = [];
// Add client
function addClient() {
    var clientID = Number(document.getElementById('clientID').value);
    var name = document.getElementById('name').value;
    var DOB = new Date(document.getElementById('dob').value);
    var gender = document.getElementById('gender')
        .value;
    var fitnessProgram = document.getElementById('fitnessProgram').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var address = document.getElementById('address')
        .value;
    var email = document.getElementById('email').value || undefined;
    var joinedDate = new Date(document.getElementById('joinedDate').value);
    var endingDate = new Date(document.getElementById('endingDate').value);
    var specialHealthNotes = document.getElementById('specialHealthNotes')
        .value || undefined;
    var isVIP = document.getElementById('isVIP').checked;
    if (clients.filter(function (client) { return client.clientID == clientID; }).length != 0) {
        displayMessage('Client ID must be unique!', 'error');
        return;
    }
    var client = new Client(isVIP, clientID, name, DOB, gender, fitnessProgram, { phoneNumber: phoneNumber, address: address, email: email }, joinedDate, endingDate, specialHealthNotes);
    clients.push(client);
    displayMessage('Client added successfully!', 'success');
}
// Display all clients
function displayClients() {
    var display = document.getElementById('clientList');
    display.innerHTML = clients
        .map(function (client) { return client.displayClientInfo(); })
        .join('');
}
// Display VIP clients
function displayVIPClients() {
    var display = document.getElementById('clientList');
    display.innerHTML = clients
        .filter(function (client) { return client.isVIP; })
        .map(function (client) { return client.displayClientInfo(); })
        .join('');
}
// case insensitive search of n-number properties of type T
// returns true if at least one of the property values includes the query value
function clientIDSearch() {
    var id = document.getElementById("searchQuery").value;
    var display = document.getElementById('clientList');
    display.innerHTML = clients
        .filter(function (client) { return client.clientID.toString() == id; })
        .map(function (client) { return client.displayClientInfo(); })
        .join('');
}
// Display a message
function displayMessage(message, type) {
    var msgDiv = document.createElement('div');
    msgDiv.innerHTML = "<p style='text-align: centre'>" + message + "</p>";
    msgDiv.style.position = "absolute";
    msgDiv.style.top = "50%";
    msgDiv.style.left = "45%";
    msgDiv.style.width = "10%";
    msgDiv.style.height = "8%";
    msgDiv.style.backgroundColor = "lightgray";
    msgDiv.style.fontWeight = "bold";
    msgDiv.style.textAlign = "center";
    msgDiv.style.borderRadius = "25px";
    msgDiv.style.color = type === 'success' ? 'green' : 'red';
    document.body.prepend(msgDiv);
    setTimeout(function () { return msgDiv.remove(); }, 3000);
}
//Edit client
function editClient(id) {
    document.querySelectorAll("#client-card-" + id.toString() + " *:disabled").forEach(function (input) { return input.removeAttribute("disabled"); });
}
//Delete client
function deleteClient(id) {
    clients = clients.filter(function (e) { return e.clientID.toString() !== id.toString(); });
    displayClients();
    displayMessage('Client deleted sucessfully!', 'success');
}
//Update client
function updateClient(id) {
    document.querySelectorAll("#client-card-" + id.toString() + " .editable").forEach(function (input) { return input.setAttribute("disabled", ""); });
    var name = document.getElementById('name-' + id.toString()).value;
    var gender = document.getElementById('gender-' + id.toString())
        .value;
    var fitnessProgram = document.getElementById('fitnessProgram-' + id.toString()).value;
    var phoneNumber = document.getElementById('phoneNumber-' + id.toString()).value;
    var address = document.getElementById('address-' + id.toString())
        .value;
    var email = document.getElementById('email-' + id.toString()).value || undefined;
    var specialHealthNotes = document.getElementById('specialHealthNotes-' + id.toString())
        .value || undefined;
    var isVIP = document.getElementById('isVIP-' + id.toString()).checked;
}
