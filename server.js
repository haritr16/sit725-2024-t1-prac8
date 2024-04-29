
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
let http = require('http').createServer(app);
const socketIo = require('socket.io');
const formRoutes = require('./routes/formRoutes');
let io = require('socket.io')(http);


// MongoDB Connection
const mongoURI = 'mongodb+srv://s223295149:cMLGEplq4XoycbeA@cluster0.uus7rft.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/', formRoutes);

module.exports = app;

// server connection handler
io.on('connection', socket => {
    console.log('A user connected');

    // Generate and emit random number every 5 seconds
    setInterval(() => {
        const randomNumber = Math.floor(Math.random() * 100);
        console.log('Random number:', randomNumber);
        socket.emit('randomNumber', randomNumber);
    }, 5000);

    // Handle server disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});



// Start server
const PORT = process.env.PORT || 3000;

http.listen(3000, 
    () => { console.log('express server started'); });