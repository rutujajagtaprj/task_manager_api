const fs = require("fs");
const validator = require('validator');

const saveToDatabase = (DB) => {
    fs.writeFileSync(`${__dirname}/tasksDb.json`, JSON.stringify(DB, null, 2), { encoding: 'utf-8' });
}

const customBodyValidator = (task) => {

    const { title, description, completed } = task;
    if (!title || validator.isEmpty(title)) {
        throw {
            status: 400,
            message: 'Title is required.'
        }
    }

    if (!description || validator.isEmpty(description)) {
        throw {
            status: 400,
            message: 'Description is required.'
        }
    }
    if (typeof completed !== 'boolean') {
        throw {
            status: 400,
            message: 'Completed is required and it should be boolean.'
        }
    }
}

module.exports = {
    saveToDatabase,
    customBodyValidator
}