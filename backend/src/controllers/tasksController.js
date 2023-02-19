const tasksModels = require('../models/tasksModels')

const getAll = async (req, res) => {
    const tasks = await tasksModels.getAll()
    return res.status(200).json(tasks)
}
const createTask = async (req, res) => {
    const createTask = await tasksModels.createTask(req.body)
    return res.status(201).json(createTask)
}
const deleteTask = async (req, res) => {
    const {id} = req.params
    await tasksModels.deleteTask(id)
    return res.status(204).json()
}
const updateTask = async (req, res) => {
    const {id} = req.params
    await tasksModels.updateTask(id, req.body)
    return res.status(204).json()
}

module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask
}