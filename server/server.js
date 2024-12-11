const bcrypt = require('bcryptjs'); // Add bcrypt for password comparison
const jwt = require('jsonwebtoken'); // JWT for generating tokens

require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require('./models/User');
const authenticateToken = require('./middleware/authMiddleware');
const eventRoutes = require('./routes/eventRoutes'); // Ensure this path is correct


const app = express();
const port = 5001;
// Middleware to log each incoming request (for debugging)
app.use((req, res, next) => {
    console.log(`${req.method} request made to: ${req.url}`);  // Logs each HTTP request
    next();  // Make sure to call next() to pass control to the next middleware
  });
  
  app.use(cors());
  app.use(express.json()); // Body parser middleware

  app.use(cors({
    origin: "http://localhost:5173",  // Allow requests from the frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],  // Allow necessary HTTP methods
    credentials: true,  // Enable credentials if you need to send cookies or authentication headers
  }));

  
  // Database connection
  const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/lifeorganizer"; // Use Atlas URI from .env
  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log("Database connection error:", err));

// Middleware to authenticate token
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) return res.sendStatus(401); // No token provided

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403); // Invalid token
//     req.user = user; // Attach user info to the request object
//     next();
//   });
// }

  app.get('/', (req, res) => {
      res.send('Hello from the backend!');
  });

  app.use('/events', authenticateToken, eventRoutes); // Attach event routes with authentication


    app.post("/register", (req, res) => {
      const { email, password, username } = req.body;
    
      if (!email || !password || !username) {
        return res.status(400).json({ message: "All fields are required" });
      }
    
      // Check if the user already exists
      User.findOne({ email })
        .then((existingUser) => {
          if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
          }
    
          // Hash the password before saving
          bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) throw err;
    
            const newUser = new User({ email, password: hashedPassword, username });
    
            // Save the new user to the database
            newUser.save()
              .then(() => {
                res.json({ message: "User registered successfully" });
              })
              .catch((err) => {
                console.error("Error registering user:", err);
                res.status(500).json({ message: "Error registering user", error: err.message });
              });
          });
        })
        .catch((err) => {
          console.error("Error checking if user exists:", err);
          res.status(500).json({ message: "Error checking user", error: err.message });
        });
    });
    

    // Login route for authenticating user
app.post("/login", (req, res) => {
  const { username, email, password } = req.body;

  console.log("Received data:", req.body); // Log incoming data

  if (!password || (!username && !email)) {
    console.log("Validation failed");
    return res.status(400).json({ message: "Password and either username or email are required" });
    // return res.status(400).json({ message: "Password and either username or email are required" });
  }

  // Find user by username or email
  const query = username ? { username } : { email };
  User.findOne(query)
    .then((user) => {
      if (!user) {
        console.log("User not found");
        return res.status(400).json({ message: "User not found" });
        // return res.status(400).json({ message: "User not found" });
      }

      // Compare the entered password with the hashed password in the database
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          throw err;
        }
        // if (err) throw err;
        if (!isMatch) {
          console.log("Invalid credentials");
          return res.status(400).json({ message: "Invalid credentials" });
          // return res.status(400).json({ message: "Invalid credentials" });
        }
        console.log("User authenticated successfully");

        // If passwords match, create a JWT token
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '60h' });

        // Respond with user data and token
        res.json({
          message: "Login successful",
          user: { id: user._id, username: user.username, email: user.email },
          token: token
        });
      });
    })
    .catch((err) => {
      console.error("Error logging in:", err);
      res.status(500).json({ message: "Server error during login", error: err.message });
    });
});



  //start server
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });





// const bcrypt = require('bcryptjs'); // Add bcrypt for password comparison
// const jwt = require('jsonwebtoken'); // JWT for generating tokens

// require('dotenv').config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const User = require('./models/User');

// const app = express();
// const port = 5001;
// // Middleware to log each incoming request (for debugging)
// app.use((req, res, next) => {
//     console.log(`${req.method} request made to: ${req.url}`);  // Logs each HTTP request
//     next();  // Make sure to call next() to pass control to the next middleware
//   });
  
//   app.use(cors());
//   app.use(express.json()); // Body parser middleware
//   app.get('/', (req, res) => {
//       res.send('Hello from the backend!');
//   });
//   app.use(cors({
//     origin: "http://localhost:5173",  // Allow requests from the frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE"],  // Allow necessary HTTP methods
//     credentials: true,  // Enable credentials if you need to send cookies or authentication headers
//   }));

  
//   // Database connection
//   const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/lifeorganizer"; // Use Atlas URI from .env
//   mongoose
//     .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("Database connected successfully"))
//     .catch((err) => console.log("Database connection error:", err));


//     app.post("/register", (req, res) => {
//         const { email, password, username } = req.body;
        
//         if (!email || !password || !username) {
//           return res.status(400).json({ message: "All fields are required" });
//         }
      
//         // Check if the user already exists
//         User.findOne({ email })
//           .then((existingUser) => {
//             if (existingUser) {
//               return res.status(400).json({ message: "User already exists" });
//             }
            
//             // Create a new user
//             const newUser = new User({ email, password, username });
      
//             // Save the new user to the database
//             return newUser.save();
//           })
//           .then(() => {
//             res.json({ message: "User registered successfully" });
//           })
//           .catch((err) => {
//             console.error("Error registering user:", err);
//             res.status(500).json({ message: "Error registering user", error: err.message });
//           });
//       });


//       // Login route for authenticating user
// app.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   // Find user by email
//   User.findOne({ email })
//     .then((user) => {
//       if (!user) {
//         return res.status(400).json({ message: "User not found" });
//       }

//       // Compare the entered password with the hashed password in the database
//       bcrypt.compare(password, user.password, (err, isMatch) => {
//         if (err) throw err;
//         if (!isMatch) {
//           return res.status(400).json({ message: "Invalid credentials" });
//         }

//         // If passwords match, create a JWT token
//         const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         // Respond with user data and token
//         res.json({
//           message: "Login successful",
//           user: { id: user._id, username: user.username, email: user.email },
//           token: token
//         });
//       });
//     })
//     .catch((err) => {
//       console.error("Error logging in:", err);
//       res.status(500).json({ message: "Server error during login", error: err.message });
//     });
// });
      
  
//   app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
//   });


