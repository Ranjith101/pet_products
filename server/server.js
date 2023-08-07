const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const port = 3001;
app.use((cors()))

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ra_users'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
  }
});

app.use(express.json());

// User registration
// User registration
app.post('/register', async (req, res) => {
    const { username, email, mobile, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Check if the provided email or mobile number already exist
    const checkQuery = 'SELECT * FROM pet_users WHERE email = ? OR mobile = ?';
    db.query(checkQuery, [email, mobile], (checkErr, checkResult) => {
      if (checkErr) {
        console.error('Error checking duplicate user:', checkErr);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        if (checkResult.length > 0) {
          res.status(400).json({ error: 'Email or mobile number already registered' });
        } else {
          // Insert the new user if email and mobile are unique
          const insertQuery = 'INSERT INTO pet_users (username, email, mobile, password) VALUES (?, ?, ?, ?)';
          db.query(insertQuery, [username, email, mobile, hashedPassword], (insertErr, insertResult) => {
            if (insertErr) {
              console.error('Error registering user:', insertErr);
              res.status(500).json({ error: 'An error occurred' });
            } else {
              res.json({ message: 'User registered successfully' });
            }
          });
        }
      }
    });
  });
  
// User login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    const query = 'SELECT * FROM pet_users WHERE email = ?';
    db.query(query, [email], async (err, result) => {
      if (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        if (result.length === 0) {
          res.status(401).json({ error: 'Invalid credentials' });
        } else {
          const user = result[0];
          const isPasswordValid = await bcrypt.compare(password, user.password);
  
          if (isPasswordValid) {
            // Generate a new secret key using crypto
            const secretKey = crypto.randomBytes(32).toString('hex');
            
            // Sign the token with the new secret key
            const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
            res.json({ token });
          } else {
            res.status(401).json({ error: 'Invalid credentials' });
          }
        }
      }
    });
  });
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
