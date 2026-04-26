jwt extract:

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET; // Your secret key

jwt.verify(token, secret, (err, user) => {
  if (err) return res.sendStatus(403); // Forbidden if token is invalid
  req.user = user; // Store decoded data (e.g., userId) in the request object
  next();
});


const authHeader = req.headers['authorization'];
// The header usually looks like "Bearer <token>"
const token = authHeader && authHeader.split(' ')[1]; 
