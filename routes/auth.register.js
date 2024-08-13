// packages
let express = require("express");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

// local imports
let user = require("../models/user.js");
const userModel = require("../models/user.js");
let JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// parent router for registration and login
let authRouter = express.Router();

// Route for registering the user
authRouter.post("/register", async (req, res) => {
    try {
        // destructuring the data from req.body
        let { userName, age, password, email, role } = req.body;
        // if user already exists - sending response as, user already exists please login
        let user = await RegisterModel.find({ userName });
        // checking
        if (user.length > 0) {
            return res.status(307).json({ message: "User already exists with this userName, Please login" });
        }
        // hashing the password and storing the user in the database
        bcrypt.hash(password, 5, async function (err, hash) {
            try {
                if (err) {
                    return res.status(500).send("Something went wrong while hashing the password");
                }
                // adding user to DB with hashed password
                let newUser = new userModel({
                    userName,
                    password: hash,
                    email,
                    age,
                    role
                });
                // saving the data to DB
                await newUser.save();
                // Sending the response
                res.status(201).send("User registered successfully");
            } catch (error) {
                res.status(500).send(error);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

// Route for login the user
authRouter.post("/login", async (req, res) => {
    try {
        // Destructuring the data from req.body
        let { password, email } = req.body;
        // Finding whether the user with email is present or not
        let user = await userModel.findOne({ email });

        // If user is not found, sending res as User not found
        if (!user) {
            return res.status(400).send("User not found");
        }

        // If user is present, comparing the passwords
        bcrypt.compare(password, user.password, async function (err, result) {
            if (err) {
                return res.status(500).send(err);
            }

            if (result) {
                // Creating a token with the role and userName from the user object
                jwt.sign({ role: user.role, userName: user.userName }, JWT_SECRET_KEY, function (err, token) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.header("Authorization", `Bearer ${token}`).send("Login successful");
                });
            } else {
                // Wrong password
                res.status(400).send("Wrong Credentials");
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// exports
module.exports = authRouter;
