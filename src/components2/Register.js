// // Register.js
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Form, Button } from 'react-bootstrap';
// import axios from 'axios';

// const Register = () => {
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const [isRegistered, setIsRegistered] = useState(false);

//     const onSubmit = (data) => {
//         // Make a POST request to the register endpoint on the backend server
//         axios.post('http://localhost:3001/api/register', data)
//             .then((response) => {
//                 // Handle the response from the server
//                 setIsRegistered(true);
//                 console.log(response.data);
//             })
//             .catch((error) => {
//                 // Handle any errors that occurred during the request
//                 console.error(error);
//             });
//     };

//     return (
//         <div>
//             <h2>Register Form</h2>
//             <Form onSubmit={handleSubmit(onSubmit)}>
//             <Form.Group>
//                 <Form.Label>Username</Form.Label>
//                 <Form.Control type="text" placeholder="Enter username" name="username" {...register('username', { required: true })} />
//                 {errors.username && <Form.Text className="text-danger">This field is required</Form.Text>}
//             </Form.Group>
//             <Form.Group>
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control type="email" placeholder="Enter email" name="email" {...register('email', { required: true })} />
//                 {errors.email && <Form.Text className="text-danger">This field is required</Form.Text>}
//             </Form.Group>
//             <Form.Group>
//                 <Form.Label>Mobile Number</Form.Label>
//                 <Form.Control type="tel" placeholder="Enter mobile number" name="mobile" {...register('mobile', { required: true })} />
//                 {errors.mobile && <Form.Text className="text-danger">This field is required</Form.Text>}
//             </Form.Group>
//             <Form.Group>
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control type="password" placeholder="Enter password" name="password" {...register('password', { required: true })} />
//                 {errors.password && <Form.Text className="text-danger">This field is required</Form.Text>}
//             </Form.Group>
//             <Form.Group>
//                 <Form.Label>Confirm Password</Form.Label>
//                 <Form.Control type="password" placeholder="Confirm password" name="confirmPassword" {...register('confirmPassword', { required: true })} />
//                 {errors.confirmPassword && <Form.Text className="text-danger">This field is required</Form.Text>}
//             </Form.Group>
//             <Button variant="primary" type="submit">Register</Button>
//             {/* <p>Already have an account? <Button variant="link" onClick={toggleForm}>Login</Button></p> */}

//         </Form>
//         </div >
//     );
// };

// export default Register;


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const Register = ({ userData, isVendorForm }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isRegistered, setIsRegistered] = useState(false);

    const onSubmit = (data) => {
        // Make a POST request to the register endpoint on the backend server
        axios.post('http://localhost:3001/api/register', data)
            .then((response) => {
                // Handle the response from the server
                setIsRegistered(true);
                console.log(response.data);
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error(error);
            });
    };

    return (
        <div>
            <h2 className='text-center text-uppercase'>Register</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" name="username" defaultValue={userData ? userData.username : ''} {...register('username', { required: true })} />
                    {errors.username && <Form.Text className="text-danger">This field is required</Form.Text>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" defaultValue={userData ? userData.email : ''} {...register('email', { required: true })} />
                    {errors.email && <Form.Text className="text-danger">This field is required</Form.Text>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="tel" placeholder="Enter mobile number" name="mobile" defaultValue={userData ? userData.mobile : ''} {...register('mobile', { required: true })} />
                    {errors.mobile && <Form.Text className="text-danger">This field is required</Form.Text>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" name="password" {...register('password', { required: true })} />
                    {errors.password && <Form.Text className="text-danger">This field is required</Form.Text>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" name="confirmPassword" {...register('confirmPassword', { required: true })} />
                    {errors.confirmPassword && <Form.Text className="text-danger">This field is required</Form.Text>}
                </Form.Group>
                {isVendorForm && (
                    <Form.Group>
                        <Form.Label>Subscription</Form.Label>
                        <Form.Control as="select" name="subscription" {...register('subscription', { required: true })}>
                            <option value="basic">Basic</option>
                            <option value="medium">Medium</option>
                            <option value="advanced">Advanced</option>
                        </Form.Control>
                        {errors.subscription && <Form.Text className="text-danger">This field is required</Form.Text>}
                    </Form.Group>
                )}
                <Button variant="primary" type="submit">Register</Button>
            </Form>
        </div>
    );
};

export default Register;
