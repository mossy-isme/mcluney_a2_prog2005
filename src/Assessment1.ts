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
        var emailGiven = "<em>None given</em>"
      } else {
        var emailGiven = this.contactInfo.email
      };
      return `
        <div class="client-card">
          <h3>${this.name} (${this.clientID})</h3>
          <p><strong>Gender:</strong> ${this.gender}</p>
          <p><strong>Fitness Program:</strong> ${this.fitnessProgram}</p>
          <p><strong>Address:</strong> ${this.contactInfo.address}</p>
          <p><strong>Phone Number:</strong> ${this.contactInfo.phoneNumber}</p>
          <p><strong>Email:</strong> ${emailGiven}</p>
          <p><strong>Joined Date:</strong> ${this.joinedDate.toLocaleDateString()}</p>
          <p><strong>Ending Date:</strong> ${this.endingDate.toLocaleDateString()}</p>
          ${
            this.specialHealthNotes
              ? `<p><strong>Notes:</strong> ${this.specialHealthNotes}</p>`
              : ''
          }
          <p><strong>VIP Client:</strong> ${this.isVIP ? 'Yes' : 'No'}</p>
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
    displayClients();
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
  function clientSearch<Client>(
    object: Client,
    properties: Array<keyof Client>,
    query: string
  ): boolean {
    if (query === "") {
        return true;
    } 
    return properties.some((property) => {
        const value = object[property];
        if (typeof value === "string" || typeof value === "number") {
            return value.toString().toLowerCase().includes(query.toLowerCase());
        }
        return false;
    });
  }

  
  // Display a message
  function displayMessage(message: string, type: 'success' | 'error'): void {
    const msgDiv = document.createElement('div');
    msgDiv.textContent = message;
    msgDiv.style.color = type === 'success' ? 'green' : 'red';
    document.body.prepend(msgDiv);
    setTimeout(() => msgDiv.remove(), 3000);
  }

  //  Update client data
  function updateClient(): void {
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
  
    for (let i in clients) {
      if (i == clientID.toString()) {
        displayMessage('Client ID must be unique!', 'error');
        return;
      }
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
    displayClients();
    displayMessage('Client added successfully!', 'success');
  }