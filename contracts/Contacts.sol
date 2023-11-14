pragma solidity ^0.8.6;

contract Contacts {

  struct Contact {
    string name;
    string company;
    string email;
    string phoneNumber;
    string note;
    string lastInteraction;
  }

  mapping(address => Contact) private contacts;

  function addOrUpdateContact(string memory name, string memory company, string memory email,
  string memory phoneNumber, string memory note, string memory lastInteraction) public {
    Contact memory newContact = Contact({
      name: name,
      company: company,
      email: email,
      phoneNumber: phoneNumber,
      note: note,
      lastInteraction: lastInteraction
    });

    contacts[msg.sender] = newContact;
  }

  function getContact() public view returns (string memory name, string memory company, string memory email,
  string memory phoneNumber, string memory note, string memory lastInteraction) {
    Contact memory c = contacts[msg.sender];
    return (c.name, c.company, c.email, c.phoneNumber, c.note, c.lastInteraction);
  }

  function deleteContact() public {
    delete contacts[msg.sender];
  }
}