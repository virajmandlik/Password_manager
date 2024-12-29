const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require('bcrypt');
const { encrypt, decrypt } = require("./EncryptionHandler");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const session = require("express-session");
const saltRounds = 10;
const PORT = 3001;

// Set up CORS for frontend connection
app.use(cors({
    origin: 'http://localhost:3000', // Allow your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow credentials like cookies to be sent
}));

// Middleware to parse JSON and form data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieparser());

// Session configuration
app.use(session({
    key: "userId",
    secret: "atanu", // You can change this to a more secure secret
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24 * 1000, // 1 day expiration
        httpOnly: true,
    }
}));

// MySQL connection setup
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "", // Use your MySQL root password here
    database: "PasswordManager",
    port: "3306"
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL: ", err);
    } else {
        console.log("Connected to MySQL database.");
    }
});

// Register route
app.post("/register", (req, res) => {
    const { email, password } = req.body;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ msg: "Error hashing password", error: err });
        }

        const data = { email, password: hash };

        let sql = `SELECT * FROM users WHERE email = ?`;
        db.query(sql, [email], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ msg: "Error checking email", error: err });
            }

            if (result.length > 0) {
                return res.status(400).send({ msg: "User email already exists" });
            } else {
                sql = "INSERT INTO users SET ?";
                db.query(sql, data, (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({ msg: "Error registering user", error: err });
                    }
                    res.status(200).send({ msg: "User registered successfully", data: result });
                });
            }
        });
    });
});

// Login route
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    let sql = `SELECT * FROM users WHERE email = ?`;
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ msg: "Error querying user", error: err });
        }

        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, response) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({ msg: "Error comparing password", error: err });
                }

                if (response) {
                    req.session.user = result;
                    return res.send({ login: true, useremail: email });
                } else {
                    return res.send({ login: false, msg: "Incorrect password" });
                }
            });
        } else {
            return res.send({ login: false, msg: "Email not found" });
        }
    });
});

// Check login status
app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ login: true, user: req.session.user[0] });
    } else {
        res.send({ login: false });
    }
});

// Logout route
app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ msg: "Could not log out", error: err });
        }
        res.send({ logout: true });
    });
});

// Add password route
app.post("/addpassword", (req, res) => {
    const { password, title } = req.body;
    const userId = req.session.user ? req.session.user[0].id : null;

    if (!userId) {
        return res.status(401).send({ msg: "Unauthorized access. Please log in." });
    }

    const hashedPassword = encrypt(password);

    const sql = "INSERT INTO passwords (passwords, title, iv, user_id) VALUES (?, ?, ?, ?)";
    db.query(sql, [hashedPassword.password, title, hashedPassword.iv, userId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ msg: "Error adding password", error: err });
        }
        res.send({ msg: "Password added successfully", data: result });
    });
});

// Show passwords route
app.get("/showpasswords", (req, res) => {
    const userId = req.session.user ? req.session.user[0].id : null;
    if (!userId) {
        return res.status(401).send({ msg: "Unauthorized access. Please log in." });
    }

    const sql = "SELECT * FROM passwords WHERE user_id = ?";
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ msg: "Error fetching passwords", error: err });
        }
        res.send(result);
    });
});

// Delete password route
app.delete("/deletepassword/:id", (req, res) => {
    const sql = "DELETE FROM passwords WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ msg: "Error deleting password", error: err });
        }
        res.send({ msg: "Password deleted successfully", data: result });
    });
});

// Update password route
app.put("/updatepassword/:id", (req, res) => {
    const hashedPassword = encrypt(req.body.password);

    const sql = "UPDATE passwords SET passwords = ?, iv = ? WHERE id = ?";
    db.query(sql, [hashedPassword.password, hashedPassword.iv, req.params.id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ msg: "Error updating password", error: err });
        }
        res.send({ msg: "Password updated successfully", data: result });
    });
});

// Decrypt password route
app.post("/decryptpassword", (req, res) => {
    try {
      const decryptedPassword = decrypt(req.body);
      res.send({ decryptedPassword });  // Send the decrypted password back
    } catch (err) {
      console.error("Decryption failed:", err);
      res.status(500).send({ msg: "Decryption error", error: err });
    }
  });
  

// Global error handler
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).send({ msg: "Internal server error", error: err.message });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
