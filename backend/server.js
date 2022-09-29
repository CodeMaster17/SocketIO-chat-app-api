const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes")
const { notFound, errorHandler } = require("./middleware/errorMiddleware")


dotenv.config();
connectDB();
const app = express();

app.use(express.json()); //to accept the json data

app.get('/', (req, res) => {
    // res.send("API is running");
    // res.send(chats);
})


// end points

/*
app.get('/api/chat', (req, res) => {
    res.send(chats);
})

app.get("/api/chat/:id", (req, res) => {
    // console.log("hello");
    // console.log(req);
    console.log(req.params.id);
    // res.send("hello");
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
});
*/

app.use('/api/user', userRoutes)

// for error handling if thee request goes to some other location
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 4000
app.listen(4000, console.log(`server started on port ${PORT}`.yellow.bold));