import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from '@chakra-ui/react'
import { connect } from 'react-redux'
import './SendEmail.css';


export const SendEmail = ({ templateObject, user, exitSendEmail }) => {
  const form = useRef();

  const [fullName, setFullName] = useState("");
  
  const [formData, setFormData] = useState({
    to_name: '',
    to_email: '',
    subject: '',
    content: '',
  });

  useEffect(() => {
    if (templateObject) {
      setFormData({
        to_name: '',
        to_email: '',
        subject: templateObject.subject || '',
        content: templateObject.body || '',
      });
    };
    if (user) {
      let  name = user.first_name + " " + user.last_name;
      setFullName(name);
    }
  }, [templateObject, user]);

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

  emailjs
    .sendForm(config.service_id, config.template_id, form.current, {
      publicKey: config.public_key,
      privateKey: config.private_key,
    })
    .then(
      () => {
        console.log('SUCCESS!');
        alert("Email sent successfully");
        setFormData({
          to_name: '',
          to_email: '',
          subject: '',
          content: '',
        });
      },
      (error) => {
        console.log('FAILED...', error.text);
        alert("Email was not sent, please try again later");
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update the field
    }));
  };

  console.log(formData.content);
  console.log(formData.subject);



  return (
    <div className="main-container">
      <div>
        <button className="exitEmailSender" onClick={exitSendEmail} data-toggle="tooltip" data-placement="top" title="exit email sender form">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
        </svg>
        </button>
      </div>
    <h2 className="email-title">Send an Email</h2>
    <form className="email-form" ref={form} onSubmit={sendEmail}>

      <label for="to_name">Full Name: </label>
      <input 
              id="to_name"
              type="name"
              name="to_name"
              value={formData.to_name}
              onChange={handleChange}
              placeholder="Receiver's name"
              required
      />
      <label for="to_email">Email:</label>
      <input
        id="to_email"
        type="email"
        name="to_email"
        value={formData.to_email}
        onChange={handleChange}
        placeholder="Receiver's Email"
        required
      />
      <label for="subject">Subject:</label>
      <input
        id="subject"
        type="text"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="Email Subject"
        required
      />
      <label for="content">Content:</label>
      <textarea
        id="content"
        type="text"
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Write your message here..."
        required
      />
      <input class="sender-input" type='email' name='user_email' value={user.email} disabled/>
      <input class="sender-input1" type='name' name='user_full_name' value={fullName}/>
      <div className="sending-email-button"> 
      <Button  colorScheme='blue' type="submit" variant='solid' size='lg' data-toggle="tooltip" data-placement="top" title="send email">
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

