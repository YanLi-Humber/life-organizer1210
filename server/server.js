const bcrypt = require('bcryptjs'); // Add bcrypt for password comparison
const jwt = require('jsonwebtoken'); // JWT for generating tokens

require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require('./models/User');
const Event = require("./models/Event"); // Make sure to create an Event model schema

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
    

//     // Login route for authenticating user
// // app.post("/login", (req, res) => {
// //   const { username, email, password } = req.body;
//   app.post("/login", (req, res) => {
//     const { identifier, password } = req.body;

//   console.log("Received data:", req.body); // Log incoming data

//   // if (!password || (!username && !email)) {
//   if (!identifier || !password) {
//     console.log("Validation failed");
//     return res.status(400).json({ message: "Password and either username or email are required" });
//     // return res.status(400).json({ message: "Password and either username or email are required" });
//   }

//   // Find user by username or email
//   // const query = username ? { username } : { email };
//   const query = { $or: [{ username: identifier }, { email: identifier }] };
//   User.findOne(query)
//     .then((user) => {
//       if (!user) {
//         console.log("User not found");
//         return res.status(400).json({ message: "User not found" });
//         // return res.status(400).json({ message: "User not found" });
//       }

//       // Compare the entered password with the hashed password in the database
//       bcrypt.compare(password, user.password, (err, isMatch) => {
//         if (err) {
//           console.error("Error comparing passwords:", err);
//           throw err;
//         }
//         // if (err) throw err;
//         if (!isMatch) {
//           console.log("Invalid credentials");
//           return res.status(400).json({ message: "Invalid credentials" });
//           // return res.status(400).json({ message: "Invalid credentials" });
//         }
//         console.log("User authenticated successfully");

//         // If passwords match, create a JWT token
//         const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '60h' });

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

app.post("/login", (req, res) => {
  const { identifier, password } = req.body;

  console.log("Received data:", req.body); // Log incoming data

  if (!identifier || !password) {
    console.log("Validation failed");
    return res.status(400).json({ message: "Identifier and password are required" });
  }

  // Find user by email or username
  const query = { $or: [{ username: identifier }, { email: identifier }] };
  User.findOne(query)
    .then((user) => {
      if (!user) {
        console.log("User not found");
        return res.status(400).json({ message: "Invalid credentials" });
      }

      console.log("User found:", user); // Log user details for debugging

      // Compare the entered password with the hashed password in the database
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return res.status(500).json({ message: "Server error during password comparison" });
        }

        console.log("Password comparison result:", isMatch); // Log comparison result


        if (!isMatch) {
          console.log("Invalid credentials");
          return res.status(400).json({ message: "Invalid credentials" });
        }

        console.log("User authenticated successfully");

        // If passwords match, create a JWT token
        const token = jwt.sign(
          { id: user._id, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: '60h' }
        );

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


app.put("/settings", authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create an event
app.post("/events", authenticateToken, async (req, res) => {
  try {
    const { title, description, date } = req.body;

    if (!title || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const event = new Event({
      title,
      description,
      date,
      userId: req.user.id, // Attach userId from authenticated user
    });

    await event.save();
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Get all events for the logged-in user
app.get("/events", authenticateToken, async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user.id }).sort({ date: 1 }); // Sort by date
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single event by ID
app.get("/events/:id", authenticateToken, async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id, userId: req.user.id });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update an event by ID
app.put("/events/:id", authenticateToken, async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, description, date },
      { new: true } // Return the updated document
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event updated successfully", event });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete an event by ID
app.delete("/events/:id", authenticateToken, async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Server error" });
  }
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


