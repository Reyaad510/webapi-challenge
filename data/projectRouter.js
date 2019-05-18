const express = require('express');

const Projects = require('./helpers/projectModel');

const router = express.Router();



// Get projects

router.get('/', async (req, res) => {
    try {
        const projects = await Projects.get();
        res.status(200).json(projects);
    } catch(err) {
        res.status(500).json({ message: "Error retrieving projects!" })
    }
})


// Create projects

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

// Update project

router.put('/:id', async(req, res) => {
    const { id } = req.params;
    const changes = req.body;

    try {
        const project = await Projects.update(id, changes);
        if(!changes.name || !changes.description) {
            res.status(400).json({ message: "Provide name and desc"})
        } else if(project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ error: 'Could not find specific ID' })
        }
    } catch(err) {
        res.status(500).json({ error: "Project could not be modified" })
    }
})


// Remove Project

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const removeProject = await Projects.remove(id);
        if(removeProject > 0) {
            res.status(200).json({ message: "Project has been removed" })
        } else {
            res.status(500).json({ error: "Id not found" })
        }
    } catch(err) {
        res.status(500).json({ error: "Project could not be removed" })
    }
})


module.exports = router;