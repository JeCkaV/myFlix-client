import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {Form, Button, Card, CardGroup, Container, Row, Col, Link} from 'react-bootstrap';

import './registration-view.scss';

export function RegistrationView (props) {
	
  const baseURL = 'https://radiant-depths-97196.herokuapp.com/';
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  //Declare hook for each input
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  //form validation logic
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username is required");
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr("Username must be 5 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password is required (6 characters long)");
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr("Password must be 6 characters long");
      isReq = false;
    }
    if (!email) {
      setEmailErr("Add Email");
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setEmail("Email must be a valid email address");
      isReq = false;
    }

    return isReq;
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios.post(baseURL + 'users', { Username: username, Password: password, Email: email, Birthday: birthday })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert("Your registration has been successfully processed. You can now proceed to login.");
          window.open("/", "_self");
          //open in the current tab
        })
        .catch((response) => {
		alert("Your registration has NOT been successfully processed. Please try again.");
		window.open("/register", "_self");			
        });
    }
  };
	return (
    <>
          <Row className="justify-content-center my-5">
 				<Col md={4}>
 				<Form>
 			<Form.Group>
 				<Form.Label>Username*</Form.Label>
 				<Form.Control 
					type="text" 
					placeholder="Username" 
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Password*</Form.Label>
				<Form.Control 
					type="password" 
					placeholder="Password" 
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					minLength="8"
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Email*</Form.Label>
				<Form.Control 
					type="email" 
					placeholder="Email" 
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Birthday</Form.Label>
				<Form.Control 
					type="date" 
					placeholder="dd-mm-yyyy" 
					onChange={(e) => setBirthday(e.target.value)}
					value={birthday}
				/>
			</Form.Group>
			<Button variant="secondary" className="my-4" type="submit" onClick={handleRegistration}>
					Submit
			</Button>
			</Form>
			</Col>
			</Row>
      </>
	)
}

RegistrationView.propTypes = {
    user: PropTypes.exact({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      birthday: PropTypes.string
    }).isRequired,
  };
