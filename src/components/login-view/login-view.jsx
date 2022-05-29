import React, { useState } from 'react';
import axios from 'axios';

import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import './login-view.scss';

//login for user - taking username and password
export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
   // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');


  //validation of registration data
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr('Username must be more than 5 characters');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be at least 6 characters');
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //calling validation on user input
    const isReq = validate();

    axios.post('https://radiant-depths-97196.herokuapp.com/login', { Username: username, Password: password} )
    .then(response => {
          const data = response.data;
          props.onLoggedIn(data)
    })
    .catch(err => {
      console.log(err)
      console.log('Not a valid user')
      // setUsernameErr('The credentials are not valid')
    })
  };

  return (
    <Form> 
   <Row className="d-flex justify-content-evenly">
   <Col></Col>
   <Col xs={4} className="left_side">
     <Form className="d-flex flex-column justify-content-between align-items-center p-2 mt-4"> 
       <Form.Group controlId="formUsername" className="mt-3">
       {usernameErr && <p>{usernameErr}</p>}
         <Form.Label>Username:</Form.Label>
         <Form.Control type="text" onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
         
       </Form.Group>

       <Form.Group controlId="formPassword" className="mt-3">
       {passwordErr && <p>{passwordErr}</p>}
         <Form.Label>Password:</Form.Label>
         <Form.Control type="password" placeholder="Password" value={password} 
             onChange={e => setPassword(e.target.value)}  
         />
         </Form.Group>

       <Button variant="primary" type="submit" onClick={handleSubmit} className="mt-4">
         Submit
       </Button>
     </Form>
   </Col>
   
   <Col xs={6} className="right_side d-flex flex-column justify-content-center align-items-center p-2 mt-4">
     <p>Please enter your details to login into the application.</p>
     <p>If you don't have an account, please <Link to="/register">register</Link></p>
   </Col>
   <Col></Col>
  </Row>
  </Form>
)
}