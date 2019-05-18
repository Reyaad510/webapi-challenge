const express = require('express');

const Actions = require('./helpers/actionModel');
const router = express.Router();




// Read - Obtain actions

router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get();
        res.status(200).json(actions);
    } catch(err) {
        res.status(500).json({ message: 'Error retrieving actions!' })
    }
})


// Create action

router.post('/', async(req, res) => {
    const newAction = req.body;
    try {
        if(!newAction.description || !newAction.notes) {
            res.status(400).json({ message: "Please provide description and notes!" })
        } else {
            const action = await Actions.insert(req.body);
            res.status(201).json(action);
        }
    } catch(err) {
        res.status(500).json({ error: "Error adding action!" })
    }
})


// Update action

router.put('/:id', async(req, res) => {
    const { id } = req.params;
    const changes = req.body;

    try {
        const action = await Actions.update(id, changes);

        if(!changes.description || !changes.notes) {
            res.status(400).json({ message: "Provide desc and note"})
        } else if(action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({ error: 'Could not find specific ID' })
        }
    } catch(err) {
        res.status(500).json({ error: "Action could not be modified" })
    }
})


// Remove action

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const removeAction = await Actions.remove(id);
        if(removeAction > 0) {
            res.status(200).json({ message: "The action has been deleted" })
        } else {
            res.status(500).json({ message: "Post with specific ID not found" })
        }
    } catch(err) {
        res.status(500).json({ error: "Action could not be removed" })
    }
})






module.exports = router;