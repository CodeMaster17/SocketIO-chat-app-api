const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
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
app.use('/api/chat', chatRoutes) //creating another endpoint
app.use('/api/message', messageRoutes) //creating another endpoint for one on one messages




// DEPLOYMENT OF APP


// for error handling if thee request goes to some other location
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 4000;


const server = app.listen(4000, console.log(`server started on port ${PORT}`.yellow.bold));


// using socket.io
const io = require("socket.io")(server, {
    pingTimeout: 60000, //amount of time it will wait when being inactive (given in milliseconds)
    // if the user doesn't sends any message for 60s , it will close the server to save the bandwidth

    cors: {
        origin: "http://localhost:4000",
        // credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});