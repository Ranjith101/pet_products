import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css'; // Import your custom CSS file for styling
import LoginForm from './components/Login';
import SecondRegistrationForm from './components/Second_Form'; // Import the SecondRegistrationForm component
import { UserProvider, useUser } from './utils/UserContext';
import RegistrationForm from './components/Register';

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add isLoggedIn state
  const { setUser } = useUser();
  const toggleRegistration = () => {
    setIsRegistered(!isRegistered);
  };
  const handleLoginSuccess = async () => {
    try {
      const response = await fetch('http://localhost:3001/user-details', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const user = await response.json();
        setUser(user); // Set the user in the context
        setIsLoggedIn(true);
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <UserProvider>
      <div className="app-background">
        <Container>
          <Row className="mt-5">
            <Col md={{ span: 6, offset: 3 }}>
              <div className="form-container">
                <h2>{isRegistered ? 'Login' : 'Register'}</h2>
                {/* Render the appropriate form based on login status */}
                {isLoggedIn ? (
                  <SecondRegistrationForm />
                ) : (
                  isRegistered ? (
                    <LoginForm onLoginSuccess={handleLoginSuccess} /> // Pass onLoginSuccess prop
                  ) : (
                    <RegistrationForm />
                  )
                )}
                <p className="mt-3">
                  {isRegistered ? "Don't have an account? " : "Already have an account? "}
                  <button className="btn btn-link" onClick={toggleRegistration}>
                    {isRegistered ? 'Register here' : 'Login here'}
                  </button>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </UserProvider>
  );
}

export default App;
