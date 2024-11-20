"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Define the Client class
class Client {
    constructor(isVIP, clientID, name, DOB, gender, fitnessProgram, contactInfo, joinedDate, endingDate, specialHealthNotes) {
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
    displayClientInfo() {
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
        if (this.specialHealthNotes == null || "") {
            var notes = "None given";
        }
        else {
            var notes = (_a = this.specialHealthNotes) === null || _a === void 0 ? void 0 : _a.toString();
        }
        return `
        <div class="client-card" id="client-card-${this.clientID}">

          <h3><input class="editable" type="text" id="name-${this.clientID}" value="${this.name}" disabled/> (${this.clientID})</h3>
          <button style="width:30%" onclick="editClient(${this.clientID})">Edit Client</button>
          <button style="width:30%" onclick="deleteClient(${this.clientID})">Delete Client</button>

          <p style="float:none"><strong>Gender: </strong><select class="editable" id="gender-${this.clientID}" value="${this.gender}" disabled>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Unspecified">Unspecified</option></select
        ></p>

          <p><strong>Fitness Program: </strong><select class="editable" id="fitnessProgram-${this.clientID}" value="${this.fitnessProgram}" disabled>
          <option value="fat loss">Fat loss</option>
          <option value="senior fitness">Senior fitness</option>
          <option value="muscle gain">Muscle gain</option>
          <option value="pre/postnatal fitness">Pre/Postnatal fitness</option>
          <option value="contest preparation">Contest preparation</option>
          <option value="overall fitness">Overall fitness</option></select
        ></p>
          
          <p><strong>Address: </strong><input type="text" class="editable" id="address-${this.clientID}" value="${this.contactInfo.address}" required disabled/></p>
          <p><strong>Phone Number: </strong><input type="text" class="editable" id="phoneNumber-${this.clientID}" value="${this.contactInfo.phoneNumber}" required disabled/></p>
          <p><strong>Email: </strong><input type="email" class="editable" id="email-${this.clientID}" value="${emailGiven}" disabled/>
 </p>
          <p><strong>DOB: </strong> ${this.DOB.toLocaleDateString()}</p>
          <p><strong>Joined Date: </strong> ${this.joinedDate.toLocaleDateString()}</p>
          <p><strong>Ending Date: </strong> ${this.endingDate.toLocaleDateString()}</p>
          <p><strong>Notes: </strong><textarea class="editable" id="specialHealthNotes-${this.clientID}" value="${notes}" disabled></textarea></p>
          <p><strong>VIP Client: </strong><input type="checkbox" class="editable checkbox" id="isVIP-${this.clientID}" ${checked} disabled/></p>
          <button id="updateButton" class="editable" onclick="updateClient(${this.clientID})" disabled>Update details</button>
        </div>
      `;
    }
}
// Database of clients
let clients = [];
// Add client
function addClient() {
    const clientID = Number(document.getElementById('clientID').value);
    const name = document.getElementById('name').value;
    const DOB = new Date(document.getElementById('dob').value);
    const gender = document.getElementById('gender')
        .value;
    const fitnessProgram = document.getElementById('fitnessProgram').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const address = document.getElementById('address')
        .value;
    const email = document.getElementById('email').value || undefined;
    const joinedDate = new Date(document.getElementById('joinedDate').value);
    const endingDate = new Date(document.getElementById('endingDate').value);
    const specialHealthNotes = document.getElementById('specialHealthNotes')
        .value || undefined;
    const isVIP = document.getElementById('isVIP').checked;
    if (clients.filter(client => client.clientID == clientID).length != 0) {
        displayMessage('Client ID must be unique!', 'error');
        return;
    }
    const client = new Client(isVIP, clientID, name, DOB, gender, fitnessProgram, { phoneNumber, address, email }, joinedDate, endingDate, specialHealthNotes);
    clients.push(client);
    displayMessage('Client added successfully!', 'success');
}
// Display all clients
function displayClients() {
    const display = document.getElementById('clientList');
    display.innerHTML = clients
        .map(client => client.displayClientInfo())
        .join('');
}
// Display VIP clients
function displayVIPClients() {
    const display = document.getElementById('clientList');
    display.innerHTML = clients
        .filter(client => client.isVIP)
        .map(client => client.displayClientInfo())
        .join('');
}
// case insensitive search of n-number properties of type T
// returns true if at least one of the property values includes the query value
function clientIDSearch() {
    const id = document.getElementById("searchQuery").value;
    const display = document.getElementById('clientList');
    display.innerHTML = clients
        .filter(client => client.clientID.toString() == id)
        .map(client => client.displayClientInfo())
        .join('');
}
// Display a message
function displayMessage(message, type) {
    const msgDiv = document.createElement('div');
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
    setTimeout(() => msgDiv.remove(), 3000);
}
//Edit client
function editClient(id) {
    document.querySelectorAll("#client-card-" + id.toString() + " *:disabled").forEach((input) => input.removeAttribute("disabled"));
}
//Delete client
function deleteClient(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const confirmed = yield confirmDialog(); // Wait for user response
        if (confirmed) {
            clients = clients.filter(client => client.clientID !== id);
            displayClients();
            displayMessage('Client deleted successfully!', 'success');
        }
        else {
            displayMessage('Client deletion cancelled.', 'error');
        }
    });
}
//Confirm dialog for deletion
function confirmDialog() {
    return new Promise((resolve) => {
        // Create the modal backdrop
        const modalBackdrop = document.createElement('div');
        modalBackdrop.style.position = 'fixed';
        modalBackdrop.style.top = '0';
        modalBackdrop.style.left = '0';
        modalBackdrop.style.width = '100%';
        modalBackdrop.style.height = '100%';
        modalBackdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modalBackdrop.style.display = 'flex';
        modalBackdrop.style.justifyContent = 'center';
        modalBackdrop.style.alignItems = 'center';
        modalBackdrop.style.zIndex = '9999';
        // Create the modal content
        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = 'white';
        modalContent.style.borderRadius = '8px';
        modalContent.style.padding = '20px';
        modalContent.style.width = '300px';
        modalContent.style.textAlign = 'center';
        modalContent.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
        // Add content to modal
        const message = document.createElement('p');
        message.innerText = 'Are you sure you want to delete this client?';
        modalContent.appendChild(message);
        // Add "Yes" button
        const yesButton = document.createElement('button');
        yesButton.innerText = 'Yes';
        yesButton.style.margin = '10px';
        yesButton.style.padding = '10px';
        yesButton.style.backgroundColor = 'green';
        yesButton.style.color = 'white';
        yesButton.style.border = 'none';
        yesButton.style.borderRadius = '4px';
        yesButton.style.cursor = 'pointer';
        yesButton.onclick = () => {
            modalBackdrop.remove();
            resolve(true);
        };
        modalContent.appendChild(yesButton);
        // Add "No" button
        const noButton = document.createElement('button');
        noButton.innerText = 'No';
        noButton.style.margin = '10px';
        noButton.style.padding = '10px';
        noButton.style.backgroundColor = 'red';
        noButton.style.color = 'white';
        noButton.style.border = 'none';
        noButton.style.borderRadius = '4px';
        noButton.style.cursor = 'pointer';
        noButton.onclick = () => {
            modalBackdrop.remove();
            resolve(false);
        };
        modalContent.appendChild(noButton);
        // Append modal content to modal backdrop
        modalBackdrop.appendChild(modalContent);
        // Append modal to document body
        document.body.appendChild(modalBackdrop);
    });
}
//Update client
function updateClient(id) {
    document.querySelectorAll("#client-card-" + id.toString() + " .editable").forEach((input) => input.setAttribute("disabled", ""));
    const name = document.getElementById('name-' + id.toString()).value;
    const gender = document.getElementById('gender-' + id.toString())
        .value;
    const fitnessProgram = document.getElementById('fitnessProgram-' + id.toString()).value;
    const phoneNumber = document.getElementById('phoneNumber-' + id.toString()).value;
    const address = document.getElementById('address-' + id.toString())
        .value;
    const email = document.getElementById('email-' + id.toString()).value || undefined;
    const specialHealthNotes = document.getElementById('specialHealthNotes-' + id.toString())
        .value || undefined;
    const isVIP = document.getElementById('isVIP-' + id.toString()).checked;
}
