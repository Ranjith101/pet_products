import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useUser } from '../utils/UserContext'; // Update the path to UserContext

function SecondRegistrationForm() {
  const { user } = useUser(); // Get user from the context
  const [subscription, setSubscription] = useState('basic');
  // ... other state variables for subscription

  const handleSubscriptionUpdate = () => {
    // Handle updating subscription information
    // You can send the subscription details to the server or update the state
  };

  return (
    <div className="cylindrical-form">
      <Form>
        {/* Display pre-filled user info */}
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" value={user.name} readOnly />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={user.email} readOnly />
        </Form.Group>
        <Form.Group controlId="mobile">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control type="tel" placeholder="Enter mobile number" value={user.mobile} readOnly />
        </Form.Group>
        {/* ... other pre-filled form groups */}
        
        {/* Subscription section */}
        <Form.Group controlId="subscription">
          <Form.Label>Subscription</Form.Label>
          <div className="subscription-options">
            <div
              className={`subscription-option ${subscription === 'basic' ? 'selected' : ''}`}
              onClick={() => setSubscription('basic')}
            >
              Basic
            </div>
            <div
              className={`subscription-option ${subscription === 'medium' ? 'selected' : ''}`}
              onClick={() => setSubscription('medium')}
            >
              Medium
            </div>
            <div
              className={`subscription-option ${subscription === 'pro' ? 'selected' : ''}`}
              onClick={() => setSubscription('pro')}
            >
              Pro
            </div>
          </div>
        </Form.Group>

        {/* Button to update subscription */}
        <Button variant="primary" onClick={handleSubscriptionUpdate}>
          Update Subscription
        </Button>
      </Form>
    </div>
  );
}

export default SecondRegistrationForm;
