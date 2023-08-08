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

    // Fetch the newly inserted user data
    const user = await getUserFromDatabase(insertResult.insertId);

    const token = jwt.sign(user, secretKey);

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

    // Fetch the existing user data
    const user = await getUserFromDatabase(existingUserRows[0].id);

    const token = jwt.sign(user, secretKey);

    res.json({ token });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// app.get('/api/user-data', async (req, res) => {
//   const token = req.header('Authorization');

//   if (!token) {
//     return res.status(401).json({ message: 'Token not provided' });
//   }

//   try {
//     // Verify the token and decode the user data
//     const decoded = jwt.verify(token, secretKey);

//     // Fetch the user data from the database
//     const user = await getUserFromDatabase(decoded.id);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json({ userData: user });
//   } catch (error) {
//     console.error('Token verification error:', error);
//     res.status(401).json({ message: 'Invalid token' });
//   }
// });

app.get('/api/user-data/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Fetch the user data from the database based on the username
    const user = await getUserFromDatabaseByUsername(username);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ userData: user });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ...
app.listen(3001, () => {
  console.log('Server started on port 3001');
});