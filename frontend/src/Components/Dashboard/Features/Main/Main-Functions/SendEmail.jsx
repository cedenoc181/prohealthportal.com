import React, { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react'

import './SendEmail.css';

export const SendEmail = () => {
  const [formData, setFormData] = useState({
    receiver: '',
    subject: '',
    content: '',
  });
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    // Set initial current date and time
    const now = new Date();
    const formattedDateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    setCurrentDateTime(formattedDateTime);

    // Update time every minute
    const interval = setInterval(() => {
      const updatedNow = new Date();
      const updatedFormattedDateTime = `${updatedNow.toLocaleDateString()} ${updatedNow.toLocaleTimeString()}`;
      setCurrentDateTime(updatedFormattedDateTime);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle sending email, could be an API call here
    console.log('Email Sent:', formData);
  };

  return (
    <div className="main-container">
      <h2 className="email-title">Send an Email</h2>
      <form className="email-form" onSubmit={handleSubmit}>
        <label>To:</label>
        <input
          type="email"
          name="receiver"
          value={formData.receiver}
          onChange={handleChange}
          placeholder="Receiver's Email"
          required
        />
        <label>Subject:</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Email Subject"
          required
        />
        <label>Content:</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Write your message here..."
          required
        />
        <p className="sending-email">Sending from: sender@example.com</p>
        <div className="email-submit-button">
        <Button  colorScheme='blue' type="submit" variant='solid' size='lg'>
            Send Email
        </Button>       
        </div>
         </form>
      <div className="current-datetime">{currentDateTime}</div>
    </div>
  );
};

export default SendEmail;
