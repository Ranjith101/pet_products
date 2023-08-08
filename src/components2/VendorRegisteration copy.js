// // // import React, { useState, useEffect } from 'react';
// // // import { Container, Row, Col } from 'react-bootstrap';
// // // import Register from './Register';
// // // import axios from 'axios';

// // // const VendorRegister = () => {
// // //   const [userData, setUserData] = useState(null);
// // //   const [token, setToken] = useState('');

// // // //   useEffect(() => {
// // // //     // Fetch user data after successful login (adjust the URL as needed)
// // // //     axios.get('http://localhost:3001/api/user-data', {
// // // //       headers: {
// // // //         Authorization: `Bearer ${token}`
// // // //       }
// // // //     })
// // // //       .then((response) => {
// // // //         setUserData(response.data.userData);
// // // //       })
// // // //       .catch((error) => {
// // // //         console.error(error);
// // // //       });
// // // //   }, [token]);

// // // useEffect(() => {
// // //     // Fetch user data after successful login (adjust the URL as needed)
// // //     axios.get('http://localhost:3001/api/user-data', {
// // //       headers: {
// // //         Authorization: `Bearer ${token}`
// // //       }
// // //     })
// // //       .then((response) => {
// // //         setUserData(response.data.userData);
// // //       })
// // //       .catch((error) => {
// // //         console.error(error);
// // //       });
// // //   }, [token]);
  

// // // useEffect(() => {
// // //     // Fetch and store the token from local storage when the component mounts
// // //     const storedToken = localStorage.getItem('token');
// // //     console.log(storedToken);
// // //     if (storedToken) {
// // //       setToken(storedToken);
// // //     }
// // //   }, []);

// // //   return (
// // //     <Container>
// // //       <Row className="justify-content-center">
// // //         <Col md={6}>
// // //           {userData && <Register userData={userData} isVendorForm={true} />}
// // //         </Col>
// // //       </Row>
// // //     </Container>
// // //   );
// // // };

// // // export default VendorRegister;


// // import React, { useState, useEffect } from 'react';
// // import { Container, Row, Col } from 'react-bootstrap';
// // import Register from './Register';
// // import axios from 'axios';

// // const VendorRegister = () => {
// //   const [userData, setUserData] = useState(null);
// //   const [token, setToken] = useState('');

// //   useEffect(() => {
// //     // Fetch and store the token from local storage when the component mounts
// //     const storedToken = localStorage.getItem('token');
// //     if (storedToken) {
// //       setToken(storedToken);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     // Fetch user data after successful login (adjust the URL as needed)
// //     if (token) { // Only make the request if the token is available
// //       axios.get('http://localhost:3001/api/user-data', {
// //         headers: {
// //           Authorization: `Bearer ${token}`
// //         }
// //       })
// //       .then((response) => {
// //         setUserData(response.data.userData);
// //       })
// //       .catch((error) => {
// //         console.error(error);
// //       });
// //     }
// //   }, [token]);

// //   return (
// //     <Container>
// //       <Row className="justify-content-center">
// //         <Col md={6}>
// //           {userData && <Register userData={userData} isVendorForm={true} />}
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // };

// // export default VendorRegister;


// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import axios from 'axios';

// const VendorRegister = () => {
//   const [userData, setUserData] = useState(null);
//   const [token, setToken] = useState('');

//   useEffect(() => {
//     // Fetch user data after successful login (adjust the URL as needed)
//     axios.get('http://localhost:3001/api/user-data', {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
//       .then((response) => {
//         setUserData(response.data.userData);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, [token]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
    
//     try {
//       const response = await axios.post('http://localhost:3001/api/register', {
//         username: 'dummyuser',
//         email: 'dummy@example.com',
//         mobile: '1234567890',
//         password: 'dummy123'
//       });
      
//       if (response.data.token) {
//         setToken(response.data.token);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <Container>
//       <Row className="justify-content-center">
//         <Col md={6}>
//           <Form onSubmit={handleSubmit}>
//             <Button type="submit">Register Dummy User</Button>
//           </Form>
//           {userData && (
//             <div>
//               <h2>User Data:</h2>
//               <p>Username: {userData.username}</p>
//               <p>Email: {userData.email}</p>
//               <p>Mobile: {userData.mobile}</p>
//             </div>
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default VendorRegister;


import React from 'react'
import Register from './Register'

const VendorRegisteration = () => {
  return (
    <div>
        <Register isVendorForm={true}/>
    </div>
  )
}

export default VendorRegisteration