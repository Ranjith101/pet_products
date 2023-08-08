// const express = require('express');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const mysql = require('mysql2/promise');
// const cors = require('cors');
// const crypto = require('crypto');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// // Create a MySQL connection pool
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'ra_users',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// const secretKey = crypto.randomBytes(64).toString('hex');

// // Register a new user
// // app.post('/api/register', async (req, res) => {
// //   const { username, email, mobile, password } = req.body;

// //   try {
// //     const connection = await pool.getConnection();
// //     const [existingUserRows] = await connection.execute(
// //       'SELECT * FROM p_users WHERE username = ? OR email = ? OR mobile = ?',
// //       [username, email, mobile]
// //     );
// //     connection.release();

// //     if (existingUserRows.length > 0) {
// //       return res.status(400).json({ message: 'Username, email, or mobile already exists' });
// //     }

// //     const salt = await bcrypt.genSalt(10);
// //     const hashedPassword = await bcrypt.hash(password, salt);

// //     const connection2 = await pool.getConnection();
// //     const [insertResult] = await connection2.execute(
// //       'INSERT INTO p_users (username, email, mobile, password) VALUES (?, ?, ?, ?)',
// //       [username, email, mobile, hashedPassword]
// //     );
// //     connection2.release();

// //     const token = jwt.sign({ userId: insertResult.insertId }, secretKey);

// //     res.json({ token });
// //   } catch (error) {
// //     console.error('Error:', error);
// //     res.status(500).json({ message: 'Internal server error' });
// //   }
// // });


// // Generate a token with a specified length
// const generateToken = (length) => {
//     const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//     let token = '';
  
//     for (let i = 0; i < length; i++) {
//       const randomIndex = Math.floor(Math.random() * characters.length);
//       token += characters[randomIndex];
//     }
  
//     return token;
//   };
  
//   // Register a new user
//   app.post('/api/register', async (req, res) => {
//     const { username, email, mobile, password } = req.body;
  
//     try {
//       const connection = await pool.getConnection();
//       const [existingUserRows] = await connection.execute(
//         'SELECT * FROM p_users WHERE username = ? OR email = ? OR mobile = ?',
//         [username, email, mobile]
//       );
//       connection.release();
  
//       if (existingUserRows.length > 0) {
//         return res.status(400).json({ message: 'Username, email, or mobile already exists' });
//       }
  
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);
  
//       const connection2 = await pool.getConnection();
//       const [insertResult] = await connection2.execute(
//         'INSERT INTO p_users (username, email, mobile, password) VALUES (?, ?, ?, ?)',
//         [username, email, mobile, hashedPassword]
//       );
//       connection2.release();
  
//       // Generate a token with a length of 10 characters
//       const token = generateToken(10);
  
//       res.json({ token });
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });
  
// // // Login a user
// // app.post('/api/login', async (req, res) => {
// //   const { username, password } = req.body;

// //   try {
// //     const connection = await pool.getConnection();
// //     const [existingUserRows] = await connection.execute(
// //       'SELECT * FROM p_users WHERE username = ? OR mobile = ?',
// //       [username, username]
// //     );
// //     connection.release();

// //     if (existingUserRows.length === 0) {
// //       return res.status(400).json({ message: 'Invalid username or password' });
// //     }

// //     const validPassword = await bcrypt.compare(password, existingUserRows[0].password);

// //     if (!validPassword) {
// //       return res.status(400).json({ message: 'Invalid username or password' });
// //     }

// //     const token = jwt.sign({ userId: existingUserRows[0].id }, secretKey);

// //     res.json({ token });
// //   } catch (error) {
// //     console.error('Error:', error);
// //     res.status(500).json({ message: 'Internal server error' });
// //   }
// // });

// app.post('/api/login', async (req, res) => {
//     const { username, password } = req.body;
  
//     try {
//       const connection = await pool.getConnection();
//       const [existingUserRows] = await connection.execute(
//         'SELECT * FROM p_users WHERE username = ? OR mobile = ?',
//         [username, username]
//       );
//       connection.release();
  
//       if (existingUserRows.length === 0) {
//         return res.status(400).json({ message: 'Invalid username or password' });
//       }
  
//       const validPassword = await bcrypt.compare(password, existingUserRows[0].password);
  
//       if (!validPassword) {
//         return res.status(400).json({ message: 'Invalid username or password' });
//       }
  
//       // Generate a token with a length of 10 characters
//       const token = generateToken(10);
  
//       res.json({ token });
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });
  

// app.get('/api/user-data', async (req, res) => {
//     const token = req.header('Authorization'); // Get the token from the request header

//     if (!token) {
//         return res.status(401).json({ message: 'Token not provided' });
//     }

//     // try {
//     //     const decoded = jwt.verify(token, secretKey);
        
//     //     // Replace the following line with your actual database query to fetch user data
//     //     const user = await getUserFromDatabase(decoded.userId);
        
//     //     if (!user) {
//     //         return res.status(404).json({ message: 'User not found' });
//     //     }

//     //     res.json({ userData: user });
//     // } catch (error) {
//     //     console.error('Token verification error:', error);
//     //     res.status(401).json({ message: 'Invalid token' });
//     // }
//     try {
//         const token = req.header('Authorization');
//         console.log('Received Token:', token);
        
//         const decoded = jwt.verify(token, secretKey);
//         console.log('Decoded Token:', decoded);
    
//         // ... rest of the code ...
//     } catch (error) {
//         console.error('Token verification error:', error);
//         res.status(401).json({ message: 'Invalid token' });
//     }
    
// });

// app.listen(3001, () => {
//   console.log('Server started on port 3001');
// });


const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ra_users',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to generate a token with a specified length
function generateToken(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }
  return token;
}

// Function to retrieve user data from the database
async function getUserFromDatabase(userId) {
  try {
    const connection = await pool.getConnection();
    const [userRows] = await connection.execute('SELECT * FROM p_users WHERE id = ?', [userId]);
    connection.release();
    return userRows[0];
  } catch (error) {
    console.error('Error fetching user from database:', error);
    return null;
  }
}

const secretKey = crypto.randomBytes(64).toString('hex');

// // Register a new user
// app.post('/api/register', async (req, res) => {
//   const { username, email, mobile, password } = req.body;

//   try {
//     const connection = await pool.getConnection();
//     const [existingUserRows] = await connection.execute(
//       'SELECT * FROM p_users WHERE username = ? OR email = ? OR mobile = ?',
//       [username, email, mobile]
//     );
//     connection.release();

//     if (existingUserRows.length > 0) {
//       return res.status(400).json({ message: 'Username, email, or mobile already exists' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const connection2 = await pool.getConnection();
//     const [insertResult] = await connection2.execute(
//       'INSERT INTO p_users (username, email, mobile, password) VALUES (?, ?, ?, ?)',
//       [username, email, mobile, hashedPassword]
//     );
//     connection2.release();

//     const token = jwt.sign({ userId: insertResult.insertId }, secretKey);

//     res.json({ token });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


app.post('/api/register', async (req, res) => {
    const { username, email, mobile, password } = req.body;
  
    try {
      const connection = await pool.getConnection();
      const [existingUserRows] = await connection.execute(
        'SELECT * FROM p_users WHERE username = ? OR email = ? OR mobile = ?',
        [username, email, mobile]
      );
      connection.release();
  
      if (existingUserRows.length > 0) {
        return res.status(400).json({ message: 'Username, email, or mobile already exists' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const connection2 = await pool.getConnection();
      const [insertResult] = await connection2.execute(
        'INSERT INTO p_users (username, email, mobile, password) VALUES (?, ?, ?, ?)',
        [username, email, mobile, hashedPassword]
      );
      connection2.release();
  
      const token = jwt.sign({ userId: insertResult.insertId }, secretKey);
  
      res.json({ token });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
// Login a user
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const connection = await pool.getConnection();
    const [existingUserRows] = await connection.execute(
      'SELECT * FROM p_users WHERE username = ? OR mobile = ?',
      [username, username]
    );
    connection.release();

    if (existingUserRows.length === 0) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const validPassword = await bcrypt.compare(password, existingUserRows[0].password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = generateToken(10); // Generate a token with a length of 10 characters

    res.json({ token });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// app.get('/api/user-data', async (req, res) => {
//   const token = req.header('Authorization'); // Get the token from the request header

//   if (!token) {
//     return res.status(401).json({ message: 'Token not provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, secretKey);

//     // Replace the following line with your actual database query to fetch user data
//     const user = await getUserFromDatabase(decoded.userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json({ userData: user });
//   } catch (error) {
//     console.error('Token verification error:', error);
//     res.status(401).json({ message: 'Invalid token' });
//   }
// });

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
