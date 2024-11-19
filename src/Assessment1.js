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
        return "\n        <div class=\"client-card\">\n          <h3>".concat(this.name, " (").concat(this.clientID, ")</h3>\n          <p><strong>Gender:</strong> ").concat(this.gender, "</p>\n          <p><strong>Fitness Program:</strong> ").concat(this.fitnessProgram, "</p>\n          <p><strong>Phone Number:</strong> ").concat(this.contactInfo.phoneNumber, "</p>\n          <p><strong>Joined Date:</strong> ").concat(this.joinedDate.toLocaleDateString(), "</p>\n          <p><strong>Ending Date:</strong> ").concat(this.endingDate.toLocaleDateString(), "</p>\n          ").concat(this.specialHealthNotes
            ? "<p><strong>Notes:</strong> ".concat(this.specialHealthNotes, "</p>")
            : '', "\n          <p><strong>VIP Client:</strong> ").concat(this.isVIP ? 'Yes' : 'No', "</p>\n        </div>\n      ");
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
    for (var i in clients) {
        if (i == clientID.toString()) {
            displayMessage('Client ID must be unique!', 'error');
            return;
        }
    }
    var client = new Client(isVIP, clientID, name, DOB, gender, fitnessProgram, { phoneNumber: phoneNumber, address: address, email: email }, joinedDate, endingDate, specialHealthNotes);
    clients.push(client);
    displayClients();
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
    var display = document.getElementById('vipClientList');
    display.innerHTML = clients
        .filter(function (client) { return client.isVIP; })
        .map(function (client) { return client.displayClientInfo(); })
        .join('');
}
// Display a message
function displayMessage(message, type) {
    var msgDiv = document.createElement('div');
    msgDiv.textContent = message;
    msgDiv.style.color = type === 'success' ? 'green' : 'red';
    document.body.prepend(msgDiv);
    setTimeout(function () { return msgDiv.remove(); }, 3000);
}
