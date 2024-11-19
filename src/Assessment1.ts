// Define the Client class
class Client {
  isVIP: boolean;
  clientID: number;
  name: string;
  DOB: Date;
  gender: 'Male' | 'Female' | 'Unspecified';
  fitnessProgram:
    | 'fat loss'
    | 'senior fitness'
    | 'muscle gain'
    | 'pre/postnatal fitness'
    | 'contest preparation'
    | 'overall fitness';
  contactInfo: {
    phoneNumber: string;
    address: string;
    email?: string;
  };
  joinedDate: Date;
  endingDate: Date;
  specialHealthNotes?: string;

  constructor(
    isVIP: boolean,
    clientID: number,
    name: string,
    DOB: Date,
    gender: 'Male' | 'Female' | 'Unspecified',
    fitnessProgram:
      | 'fat loss'
      | 'senior fitness'
      | 'muscle gain'
      | 'pre/postnatal fitness'
      | 'contest preparation'
      | 'overall fitness',
    contactInfo: {
      phoneNumber: string;
      address: string;
      email?: string;
    },
    joinedDate: Date,
    endingDate: Date,
    specialHealthNotes?: string
  ) {
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

  displayClientInfo(): string {
    if (this.contactInfo.email == null) {
      var emailGiven = "None given"
    } else {
      var emailGiven = this.contactInfo.email
    };
    if (this.isVIP ? true : false) {
      var checked = "checked"
    } else {
      var checked = ""
    };
    if (this.specialHealthNotes != "") {
      var notes = this.specialHealthNotes?.toString()
    } else {
      var notes = "None given"
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
let clients: Client[] = [];

// Add client
function addClient(): void {
  const clientID = Number(
    (document.getElementById('clientID') as HTMLInputElement).value
  );
  const name = (document.getElementById('name') as HTMLInputElement).value;
  const DOB = new Date(
    (document.getElementById('dob') as HTMLInputElement).value
  );
  const gender = (document.getElementById('gender') as HTMLSelectElement)
    .value as 'Male' | 'Female' | 'Unspecified';
  const fitnessProgram = (
    document.getElementById('fitnessProgram') as HTMLSelectElement
  ).value as
    | 'fat loss'
    | 'senior fitness'
    | 'muscle gain'
    | 'pre/postnatal fitness'
    | 'contest preparation'
    | 'overall fitness';
  const phoneNumber = (
    document.getElementById('phoneNumber') as HTMLInputElement
  ).value;
  const address = (document.getElementById('address') as HTMLInputElement)
    .value;
  const email =
    (document.getElementById('email') as HTMLInputElement).value || undefined;
  const joinedDate = new Date(
    (document.getElementById('joinedDate') as HTMLInputElement).value
  );
  const endingDate = new Date(
    (document.getElementById('endingDate') as HTMLInputElement).value
  );
  const specialHealthNotes =
    (document.getElementById('specialHealthNotes') as HTMLTextAreaElement)
      .value || undefined;
  const isVIP = (document.getElementById('isVIP') as HTMLInputElement).checked;

  if (clients.filter(client => client.clientID == clientID).length != 0) {
    displayMessage('Client ID must be unique!', 'error');
    return;
  }


  const client = new Client(
    isVIP,
    clientID,
    name,
    DOB,
    gender,
    fitnessProgram,
    { phoneNumber, address, email },
    joinedDate,
    endingDate,
    specialHealthNotes
  );

  clients.push(client);

  displayMessage('Client added successfully!', 'success');
}

// Display all clients
function displayClients(): void {
  const display = document.getElementById('clientList')!;
  display.innerHTML = clients
    .map(client => client.displayClientInfo())
    .join('');
}

// Display VIP clients
function displayVIPClients(): void {
  const display = document.getElementById('clientList')!;
  display.innerHTML = clients
    .filter(client => client.isVIP)
    .map(client => client.displayClientInfo())
    .join('');
}

// case insensitive search of n-number properties of type T
// returns true if at least one of the property values includes the query value
function clientIDSearch(): void {
  const id = (document.getElementById("searchQuery") as HTMLInputElement).value;
  const display = document.getElementById('clientList')!;
  display.innerHTML = clients
    .filter(client => client.clientID.toString() == id)
    .map(client => client.displayClientInfo())
    .join('');
}


// Display a message
function displayMessage(message: string, type: 'success' | 'error'): void {
  const msgDiv = document.createElement('div');
  msgDiv.textContent = message;
  msgDiv.style.color = type === 'success' ? 'green' : 'red';
  document.body.prepend(msgDiv);
  setTimeout(() => msgDiv.remove(), 3000);
}

//Edit client
function editClient(id: Number) {
  document.querySelectorAll("#client-card-" + id.toString() + " *:disabled").forEach((input) => input.removeAttribute("disabled"))
}

//Update client
function updateClient(id: Number) {
  document.querySelectorAll("#client-card-" + id.toString() + " .editable").forEach((input) => input.setAttribute("disabled", ""))

  const name = (document.getElementById('name-' + id.toString()) as HTMLInputElement).value;

  const gender = (document.getElementById('gender-' + id.toString()) as HTMLSelectElement)
    .value as 'Male' | 'Female' | 'Unspecified';
  const fitnessProgram = (
    document.getElementById('fitnessProgram-' + id.toString()) as HTMLSelectElement
  ).value as
    | 'fat loss'
    | 'senior fitness'
    | 'muscle gain'
    | 'pre/postnatal fitness'
    | 'contest preparation'
    | 'overall fitness';
  const phoneNumber = (
    document.getElementById('phoneNumber-' + id.toString()) as HTMLInputElement
  ).value;
  const address = (document.getElementById('address-' + id.toString()) as HTMLInputElement)
    .value;
  const email =
    (document.getElementById('email-' + id.toString()) as HTMLInputElement).value || undefined;
  const specialHealthNotes =
    (document.getElementById('specialHealthNotes-' + id.toString()) as HTMLTextAreaElement)
      .value || undefined;
  const isVIP = (document.getElementById('isVIP-' + id.toString()) as HTMLInputElement).checked;

}