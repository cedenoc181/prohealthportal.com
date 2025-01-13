import React, { useState } from "react";
import { Input, InputGroup, InputRightElement, Stack, Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
// import GoogleButton from "react-google-button";
import logo from "../../images/prohealth-logo.png";
import "./Login.css";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { loginUser } from "../../ReduxActionsMain/userActions.js";
import { fetchMyAccount } from "../../ReduxActionsMain/userActions.js";


export const Login = ({ loginUser, onLogin, fetchMyAccount }) => {
  
  const [show, setShow] = useState(false);
  const [accnt, setAccnt] = useState(""); // Email input state
  const [pass, setPass] = useState("");  // Password input state
  const [submission, setSubmission] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = () => setShow(!show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmission(true);
  
    try {
      const user = await loginUser({ email: accnt, password: pass });
      if (user) {
        localStorage.setItem("jwt", user.token);
         // Fetch user account when authenticated
        await fetchMyAccount(user.token);
        console.log(user.user)
        onLogin(); // Trigger App's isAuthenticated update
        navigate("/overview");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setSubmission(false);
    }
  };

  return (
    <div id="LoginPage">
      <div className="LoginFormContainer col5">
        <div className="loginHeading">Welcome!</div>
        <p className="loginPrompt">Sign in to access ProHealth portal</p>
        <form className="formContainer" onSubmit={handleSubmit}>
          <Stack className="inputfield" spacing={10}>
            {/* Email Input */}
            <Input
              size="lg"
              variant="flushed"
              placeholder="Email"
              _placeholder={{ opacity: 1, color: "black.500" }}
              value={accnt}
              onChange={(e) => setAccnt(e.target.value)} // Controlled input
            />
            {/* Password Input */}
            <InputGroup>
              <Input
                size="lg"
                type={show ? "text" : "password"}
                variant="flushed"
                placeholder="Password"
                _placeholder={{ opacity: 1, color: "black.500" }}
                value={pass}
                onChange={(e) => setPass(e.target.value)} // Controlled input
              />
              <InputRightElement width="4.5rem">
                <Button
                  className="showPW"
                  colorScheme="blue"
                  variant="outline"
                  h="2rem"
                  size="sm"
                  onClick={handleClick}
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <div className="forgotPassword">
              {/* p element below will hold the forgot password functionality */}
              {/* <p>Forgot Password?</p> */}
            </div>
            {/* Login Button */}
            <Button
              className="loginButton"
              rightIcon={<ArrowForwardIcon />}
              colorScheme="blue"
              variant="outline"
              type="submit"
              isDisabled={submission} 
            >
              {submission ? "Loading..." : "Login"}
            </Button>
            {/* <div className="logDivider">
              <span className="line1">line through text</span> or{" "}
              <span className="line2">line through text</span>
            </div> */}
            {/* Google Login Button */}
            {/* <GoogleButton
              id="googleButton"
              label="Login with Google"
              type="light"
              onClick={() => {
                console.log("Google login clicked");
              }}
            /> */}
          </Stack>
        </form>
      </div>
      <figure className="figure col5">
        <img className="phf-logo" src={logo} alt="phf" />
        <figcaption className="phf-logo-caption">
          Improving Quality of Life Through Physical and Occupational Therapy
        </figcaption>
      </figure>
    </div>
  );
};

// Map Redux state to component props
const mapStateToProps = (state) => ({});

// Map Redux actions to component props
const mapDispatchToProps = {
  loginUser,
  fetchMyAccount,
};

// Connect Redux to the component
export default connect(mapStateToProps, mapDispatchToProps)(Login);
