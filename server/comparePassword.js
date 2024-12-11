const bcrypt = require('bcryptjs');

const hashedPasswordFromDB = "$2a$10$FqMlttthexP4ib3f8oxPjOmJ6P.OLAWZ2jHgi4aS3xb7vLI.ScTLK";
const plaintextPassword = "password1234";

bcrypt.compare(plaintextPassword, hashedPasswordFromDB, (err, isMatch) => {
  if (err) {
    console.error("Error during manual comparison:", err);
  } else {
    console.log("Manual password comparison result:", isMatch);
  }
});
