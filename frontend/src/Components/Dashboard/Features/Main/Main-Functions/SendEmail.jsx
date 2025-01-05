import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from '@chakra-ui/react'
import { connect } from 'react-redux'
import './SendEmail.css';


export const SendEmail = ({ templateObject = {}, user }) => {
  const form = useRef();

  
  const [formData, setFormData] = useState({
    to_email: '',
    subject: templateObject.subject || '',
    content: templateObject.body || '',
  });

  useEffect(() => {
    if (templateObject) {
      setFormData({
        to_email: '',
        subject: templateObject.subject || '',
        content: templateObject.body || '',
      });
    }
  }, [templateObject]);

console.log(user)
console.log(templateObject)

// email sender function 

const sendEmail = (e) => {
  e.preventDefault();

    // Fetch EmailJS config from the backend
    fetch('http://127.0.0.1:3000/email_config', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}` // Replace with your token retrieval method
      }
    }) // Adjust the URL if needed
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((config) => {

      console.log(config.service_id, config.public_key, config.template_id, config.private_key)
  emailjs
    .sendForm(config.service_id, config.template_id, form.current, {
      publicKey: config.public_key,
      privateKey: config.private_key,
    })
    .then(
      () => {
        console.log('SUCCESS!');
      },
      (error) => {
        console.log('FAILED...', error.text);
      },
    );
});

};

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



  return (
    <div className="main-container">
    <h2 className="email-title">Send an Email</h2>
    <form className="email-form" ref={form} onSubmit={sendEmail}>
      <label>To:</label>
      <input
        type="email"
        name="to_email"
        value={formData.to_email}
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
        type="text"
        name="message"
        value={formData.content}
        onChange={handleChange}
        placeholder="Write your message here..."
        required
      />
      <label>From:</label>
      <input class="sender-input" type='name' name='user_full_name' value={user.full_name} />
      <input class="sender-input" type='email' name='user_email' value={user.email} />
      <div className="sending-email-button"> 
      <Button  colorScheme='blue' type="submit" variant='solid' size='lg'>
          Send Email
      </Button>       
      </div>
       </form>
    <div className="current-datetime">{currentDateTime}</div>
  </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.data,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SendEmail)

