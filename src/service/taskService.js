const Task = require("../database/Task");
const { v4: uuid } = require('uuid');

const getAllTasks = (completed, sort) => {
    const allTasks = Task.getAllTasks(completed, sort);
    return allTasks;
}
//Rutuja

const getOneTask = (taskId) => {
    const task = Task.getOneTask(taskId);
    return task;
}
const createNewTask = (newTask) => {

    const task = {
        ...newTask,
        id: uuid(),
        createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    }
    try {
        const createdTask = Task.createNewTask(task);
        return createdTask;
    } catch (error) {
        throw error;
    }
}

const updateOneTask = (taskId, taskBodyToUpdate) => {
    try {
        const updatedTask = Task.updateOneTask(taskId, taskBodyToUpdate);
        return updatedTask;
    } catch (error) {
        throw error;
    }

};

const deleteOneTask = (taskId) => {
    try {
        Task.deleteOneTask(taskId);
    } catch (error) {
        throw error;
    }
};

const getTasksWithPriority = (level) => {

    const pLevel = level.toLowerCase();
    const priorityList = ['low', 'medium', 'high'];
    if (!priorityList.includes(pLevel)) {
        throw {
            status: 400,
            message: 'Please provide valid priority level: low or medium or high.',
        }
    }
    try {
        const priorityTasks = Task.getTasksWithPriority(pLevel);
        return priorityTasks;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllTasks,
    getOneTask,
    createNewTask,
    updateOneTask,
    deleteOneTask,
    getTasksWithPriority
}