import React, { useEffect, useState } from "react";
import { Input, InputGroup, InputRightElement, Stack, Button } from "@chakra-ui/react";
import { ArrowForwardIcon, EmailIcon } from '@chakra-ui/icons'
import GoogleButton from 'react-google-button'
import logo from '../../images/prohealth-logo.png'

import "./Login.css";
import { connect } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();

export const Login = (props) => {

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [accnt, setAccnt] = useState("");
  const [pass, setPass] = useState("");

  const handleInputChange = (e) => setAccnt(e.target.value);
  const handlePassChange = (e) => setPass(e.target.value);
  const isError = accnt === "";

  const [submission, setSubmission] = useState(false);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/account/login', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },   
    body: JSON.stringify({
        email: accnt,
        password: pass,
      })
    })
    setSubmission(false)
    .then((res) => res.json())
    .then((data) => {
        console.log(`you logged in ${accnt}`, data);
        localStorage.setItem("jwt", data.token);
        // navigate("/overview");
        // onLogin(data.user); //pass in onlogin function
      });
}


        function submitClick(){
            setTimeout(() => {
                setSubmission(!submission)
            console.log("loading submission ... ")
          }, 100)
        };



  return (
    <div id="LoginPage">
        <div className="LoginFormContainer col5">
        <div className="loginHeading">Welcome!</div>
        <p className="loginPrompt">Sign in to access ProHealth portal</p>
      <form className="formContainer" onSubmit={handleSubmit}>
      <Stack className="inputfield"  spacing={10}>
            <Input className="" size='lg' variant='flushed' placeholder='Email' _placeholder={{ opacity: 1, color: 'black.500' }}/> 
            <InputGroup>
            <Input className="" size='lg' type={show ? 'text' : 'password'} variant='flushed' placeholder='Password' _placeholder={{ opacity: 1, color: 'black.500' }}/>
            <InputRightElement width='4.5rem'>
             <Button className="showPW" colorScheme='blue' variant='outline' h='2rem' size='sm' onClick={handleClick} >
                {show ? 'Hide' : 'Show'}
             </Button>
            </InputRightElement>

            </InputGroup>
            <div className="forgotPassword"><a href="#">Forgot Password?</a></div>
            <Button className="loginButton" rightIcon={<ArrowForwardIcon />} colorScheme='blue' variant='outline'>
                 Login
            </Button>      
            <div className="logDivider">
       <span className="line1">line through the text</span> or  <span className="line2">line through the text</span> 
      </div>
      <GoogleButton
            id="googleButton"
            label="Login with Google"
            type="light"
            // disabled // can also be written as disabled={true} for clarity
             onClick={() => { console.log('this will not run on click since it is disabled') }}
      />   
      </Stack>
      </form>
      </div>
      <figure className="figure col5">
      <img className="phf-logo"  src={logo} alt="phf"/>
      <figcaption className="phf-logo-caption">Improving Quality of Life Through Physical and Occupational Therapy</figcaption>
      </figure>
     
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
