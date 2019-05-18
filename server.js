const express = require('express');

const server = express();

const actionRouter = require('./data/actionRouter');
const projectRouter = require('./data/projectRouter');

server.use(express.json());



server.get('/', (req, res) => {
    res.send(`<h1> Is this thing working? </h1>`)
})

// Router
server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);







module.exports = server;