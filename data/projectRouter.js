const express = require('express');

const Projects = require('./helpers/projectModel');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const projects = await Projects.get();
        res.status(200).json(projects);
    } catch(err) {
        res.status(500).json({ message: "Error retrieving projects!" })
    }
})


router.post('/', async(req, res) => {
    const newProject = req.body;
    try {
        if(!newProject.name || !newProject.description) {
            res.status(400).json({ message: "Please provide name and description!" })
        } else {
            const project = await Projects.insert(req.body);
            res.status(201).json(project);
        }
    } catch(err) {
        res.status(500).json({ message: 'Error adding project!' })
    }
})


module.exports = router;