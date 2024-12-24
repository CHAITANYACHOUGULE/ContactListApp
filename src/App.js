import React, { useState } from 'react';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const addContact = () => {
    if (newContact.name && newContact.email && newContact.phone) {
      if (editingIndex !== null) {
        const updatedContacts = [...contacts];
        updatedContacts[editingIndex] = newContact;
        setContacts(updatedContacts);
        setEditingIndex(null);
      } else {
        setContacts([...contacts, newContact]);
      }
      setNewContact({ name: '', email: '', phone: '' });
    }
  };

  const editContact = (index) => {
    setNewContact(contacts[index]);
    setEditingIndex(index);
  };

  const deleteContact = (index) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      <h1>Contact List</h1>
      <div className="form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newContact.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newContact.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={newContact.phone}
          onChange={handleChange}
        />
        <button onClick={addContact}>{editingIndex !== null ? 'Update' : 'Add'} Contact</button>
      </div>
      <div className="contact-list">
        {contacts.map((contact, index) => (
          <div key={index} className="contact-card">
            <p><strong>Name:</strong> {contact.name}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Phone:</strong> {contact.phone}</p>
            <button onClick={() => editContact(index)}>Edit</button>
            <button onClick={() => deleteContact(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
