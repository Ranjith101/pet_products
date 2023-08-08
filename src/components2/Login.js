// // Login.js
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Form, Button } from 'react-bootstrap';
// import axios from 'axios';
// import '../styles/login.css';

// const Login = ({ onLoginSuccess }) => { // Receive onLoginSuccess function as a prop
//     const { register, handleSubmit, formState: { errors } } = useForm();

//     // const onSubmit = (data) => {
//     //     // Make a POST request to the login endpoint on the backend server
//     //     axios.post('http://localhost:3001/api/login', data)
//     //         .then((response) => {
//     //             // Handle the response from the server
//     //             console.log(response.data);
//     //             onLoginSuccess(); // Call onLoginSuccess function
//     //         })
//     //         .catch((error) => {
//     //             // Handle any errors that occurred during the request
//     //             console.error(error);
//     //         });
//     // };
//     const onSubmit = (data) => {
//         // Make a POST request to the login endpoint
//         axios.post('http://localhost:3001/api/login', data)
//             .then((response) => {
//                 const token = response.data.token; // Extract the token from the response
//                 localStorage.setItem("token",token);
//                 onLoginSuccess(token); // Call the onLoginSuccess function and pass the token
//             })
//             .catch((error) => {
//                 // Handle login error
//                 console.error(error);
//             });
//     };
    
//     return (
//         <div>
//             <h2>Login Form</h2>
//             <Form onSubmit={handleSubmit(onSubmit)}>
//             <Form.Group>
//                                             <Form.Label>Username</Form.Label>
//                                             <Form.Control type="text" placeholder="Enter username" name="username" {...register('username', { required: true })} />
//                                             {errors.username && <Form.Text className="text-danger">This field is required</Form.Text>}
//                                         </Form.Group>
//                                         <Form.Group>
//                                             <Form.Label>Password</Form.Label>
//                                             <Form.Control type="password" placeholder="Enter password" name="password" {...register('password', { required: true })} />
//                                             {errors.password && <Form.Text className="text-danger">This field is required</Form.Text>}
//                                         </Form.Group>
//                                         <Button variant="primary" type="submit">Login</Button>
//                                         {/* <p>Don't have an account? <Button variant="link" onClick={toggleForm}>Register</Button></p> */}
//             </Form>
//         </div>
//     );
// };

// export default Login;

// Login.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import '../styles/login.css';

const Login = ({ onLoginSuccess }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        axios.post('http://localhost:3001/api/login', data)
            .then((response) => {
                const token = response.data.token;
                localStorage.setItem("token", token);
                onLoginSuccess(token);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    
    return (
        <div>
            <h2 className='text-center text-uppercase'>Login</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" name="username" {...register('username', { required: true })} />
                    {errors.username && <Form.Text className="text-danger">This field is required</Form.Text>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" name="password" {...register('password', { required: true })} />
                    {errors.password && <Form.Text className="text-danger">This field is required</Form.Text>}
                </Form.Group>
                <Button variant="primary" type="submit">Login</Button>
            </Form>
        </div>
    );
};

export default Login;
