import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleRegistration = async () => {
    try {
      if (password !== confirmPassword) {
        // Handle password mismatch
        return;
      }

      const response = await axios.post('http://localhost:3001/register', {
        username: name,
        email,
        mobile,
        password,
      });

      // Registration successful, you can show a success message or redirect to login page
      console.log(response.data.message);
    } catch (error) {
      // Handle registration error, e.g., duplicate email or server error
      console.error('Registration error:', error.response.data.error);
    }
  };

  return (
    <Form>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="mobile">
        <Form.Label>Mobile Number</Form.Label>
        <Form.Control type="tel" placeholder="Enter mobile number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="confirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" onClick={handleRegistration}>Register</Button>
    </Form>
  );
}

export default RegistrationForm;
