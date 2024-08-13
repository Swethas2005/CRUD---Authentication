// Packages
const express = require("express");
const dotenv = require("dotenv").config();


// local imports
const PORT = process.env.PORT;
const connection = require("./config/db.js")
const moviesRouter = require("./routes/movie.routes.js")
const authRouter = require("./routes/auth.register.js")

let app = express();

app.use(express.json())
app.use("/movie",moviesRouter)
app.use("/auth",authRouter)

app.get("/",(req,res)=>{
    res.send("Welcome to the Server")
})

app.listen(PORT,async()=>{
   try {
    await connection
    console.log(`Server is running on port ${PORT} and connected to DB`)
   } catch (error) {
    console.log(error);
   }
})



