//Imports the Express framework
const express = require('express');

//Imports the path module for file path manipulation
const path = require('path');

//Creates an Express application instance
const app = express();

const PORT = 3000; //Port number

//Serves static files from the 'public' folder (directory)
app.use(express.static(path.join(__dirname, 'public')));

//Handles GET requests to the root URL ('/')
app.get('/', (req, res) => {
    //Sends the 'index.html' file as the response
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Starts the server and listening on the port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
