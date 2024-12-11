const jwt = require("jsonwebtoken");

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401); // No token provided

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user; // Attach user info to the request object
    next();
  });
}

module.exports = authenticateToken;








// const jwt = require('jsonwebtoken');

// const authenticate = (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1]; // Extract the token

//     if (!token) {
//         return res.status(403).json({ message: 'Access Denied: No token provided' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
//         req.user = { id: decoded.id}; // Attach decoded user ID to request
//         next();
//     } catch (err) {
//         console.error('Token verification failed:', err.message);
//         return res.status(403).json({ message: 'Access Denied: Invalid token' });
//     }
// };

// module.exports = authenticate;






// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// // Middleware to authenticate and authorize the user
// const authenticate = async (req, res, next) => {
//     try {
//         // Extract token from Authorization header
//         const token = req.headers.authorization?.split(' ')[1]; // Format: "Bearer <token>"
        
//         if (!token) {
//             return res.status(403).json({ message: 'Access Denied: No token provided' });
//         }

//         // Verify token and decode user information
//         jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
//             if (err) {
//                 return res.status(403).json({ message: 'Access Denied: Invalid token' });
//             }

//             // Attach the user information to the request object
//             const user = await User.findById(decoded.id).select('-password'); // Exclude password
//             if (!user) {
//                 return res.status(404).json({ message: 'User not found' });
//             }

//             req.user = user; // Attach user to the request object for further use
//             next(); // Proceed to the next middleware or route handler
//         });
//     } catch (error) {
//         console.error('Error in authentication middleware:', error.message);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// module.exports = authenticate;
/*************** */

// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const authenticate = async (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"

//     if (!token) {
//         return res.status(403).json({ message: 'Access Denied: No token provided' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
//         req.user = await User.findById(decoded.id).select('-password'); // Fetch user details
//         next();
//     } catch (err) {
//         return res.status(403).json({ message: 'Access Denied: Invalid token' });
//     }
// };

// module.exports = authenticate;

//************ */
// const jwt = require('jsonwebtoken');

// const authenticate = (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) return res.status(401).json({ message: 'Access Denied' });

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid Token' });
//   }
// };

// module.exports = authenticate;
