import React, { useEffect, useState } from "react";
import {
  Input,
  Spinner,
  InputGroup,
  InputRightElement,
  Button
} from "@chakra-ui/react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

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
        <div className="LoginFormContainer col2">
        <div className="loginHeading">Login</div>
      <form className="formContainer" onSubmit={handleSubmit}>
        <FormControl isInvalid={isError}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={accnt}
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
          {!isError ? (
            <FormHelperText></FormHelperText>
          ) : (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          )}
        </FormControl>

        <label>Password</label>
        <InputGroup size="md">
          <Input
            value={pass}
            onChange={handlePassChange}
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <div className="forgotPassword">Forgot password?</div>
      {submission ? (
        <Spinner size='lg' color='orange.500' />
      ) : 
        ( <Button
            id="submitButton"
            onClick={submitClick}
              loadingText='Submitting'
              colorScheme='teal'
              variant='outline'
        > 
             Login
        </Button>)
  }
      </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
