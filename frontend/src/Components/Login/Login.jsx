import React, { useEffect, useState } from "react";
import { Input, Stack, Button } from "@chakra-ui/react";
import { ArrowForwardIcon, EmailIcon } from '@chakra-ui/icons'
import GoogleButton from 'react-google-button'

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
    <div>
        <div className="LoginFormContainer col6">
        <div className="loginHeading">Login</div>
      <form className="formContainer" onSubmit={handleSubmit}>
      <Stack className="inputfield"  spacing={7}>
            <Input className="" leftIcon={<EmailIcon />} variant='flushed' placeholder='Email' /> 
            <Input className="" variant='flushed' placeholder='Password' />
            <div className="forgotPassword"><a href="#">Forgot Password?</a></div>
            <Button className="loginButton" rightIcon={<ArrowForwardIcon />} colorScheme='orange' variant='outline'>
                 Login
            </Button>      
            <div className="logDivider">
        or 
      </div>
      <GoogleButton
            className="googleButton"
            label="Login with Google"
            type="light"
            // disabled // can also be written as disabled={true} for clarity
             onClick={() => { console.log('this will not run on click since it is disabled') }}
      />   
      </Stack>


      </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
