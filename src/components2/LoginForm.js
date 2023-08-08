import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Login from './Login';
import Register from './Register';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(''); // Add this line to initialize token state

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const navigate = useNavigate();

  const handleLoginSuccess = (token) => {
    console.log('Token:', token); // Log the token to verify

    setIsLoggedIn(true);
    setToken(token); // Update token state

    // Fetch user data after successful login
    axios.get('http://localhost:3001/api/user-data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setUserData(response.data.userData);
    })
    .catch((error) => {
      console.error(error);
    });

    navigate('/vendor-register');
  };

  return (
    <Container className='mt-4'>
      <Row className="justify-content-center">
        <Col md={6}>
          {isLogin ? (
            <Login onLoginSuccess={handleLoginSuccess} />
          ) : (
            <Register userData={userData} isVendorForm={false} />
          )}
          <Button variant="link" onClick={toggleForm}>
            {isLogin ? 'Register here !' : 'Login here !'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
