const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secretKey = process.env.JWT_SECRET || 'yOurSecr3tK3yF0rJWT$igning';

function authenticateUser(req, res, next) {
  const authHeader = req.headers['authorization'];
  const authToken = authHeader && authHeader.split(' ')[1];

  if (!authToken) {
    return res.status(403).send({ error: 'Unauthorized - Token missing' });
  }

  console.log('Token:', authToken);
  console.log('Secret Key:', secretKey);

  jwt.verify(authToken, secretKey, (err, decoded) => {
    if (err) {
      console.error('JWT Verify Error:', err);

      if (err.name === 'TokenExpiredError') {
        return res.status(401).send({ error: 'Token expired' });
      } else if (err.name === 'JsonWebTokenError') {
        console.error('Token Payload:', jwt.decode(authToken)); // Log decoded payload
        return res.status(401).send({ error: 'Invalid token' });
      } else {
        return res.status(500).send({ error: 'Internal Server Error' });
      }
    } else {
      console.log('Decoded:', decoded);
      req.user = decoded;
      next();
    }
  });
}

module.exports = authenticateUser;
