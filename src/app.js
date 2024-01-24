const express = require('express');
const taskData = require('./task.json');
const validator = require('./helper/validator');
const path = require('path');
const fs = require('fs');
const PORT = 8080;


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());


//Getting All task details

app.get('/tasks',(req,res)=>
{
    return res.status(200).json(taskData);
})


//geting details of particular task
app.get('/task/:taskID',(req,res)=>
{
  const allTaskData = taskData.taskDetails;
  let taskIdPassed = req.params.taskID; 
  let filteredtask = allTaskData.filter(val => val.taskID == taskIdPassed);
  if(filteredtask.length > 0)
  {
    return res.status(200).json(filteredtask[0]);
  }
  else{
    return res.status(404).send("No task found with the provided id");

  }

})

//create a new task
app.post('/task',(req, res) => {
    
    const userProvidedTaskDetails = req.body;
    let writePath = path.join(__dirname, '.', 'task.json');

    if(validator.validateTaskInfo(userProvidedTaskDetails).status == true) {

        let taskDataModified = JSON.parse(JSON.stringify(taskData));
        taskDataModified.taskDetails.push(userProvidedTaskDetails);
        fs.writeFile(writePath, JSON.stringify(taskDataModified), {encoding: 'utf8', flag:'w'}, (err, data) => {
            if(err) {
                return res.status(500).send("Something went wrong while creating the task");
            } else {
                return res.status(201).send(validator.validateTaskInfo(userProvidedTaskDetails).message);
            }
        });
    }
})
//update the existing task details
app.put('/tasks/:taskID', (req, res) => {

    let taskIdPassed = req.params.taskID; 

    const allTaskData = taskData.taskDetails;
    let filteredtask = allTaskData.filter(val => val.taskID == taskIdPassed);
    

    if (!filteredtask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      const userProvidedTaskDetails = req.body;
      if(validator.validateTaskInfo(userProvidedTaskDetails).status == true) {
        let writePath = path.join(__dirname, '.', 'task.json');

        fs.appendFile(writePath, JSON.stringify(userProvidedTaskDetails, null, taskIdPassed), {encoding: 'utf8', flag:'w'}, (err, data) => {
    
            if(err) {
                return res.status(500).send("Something went wrong while updating the task");
            } else {
                return res.status(201).send("task details updated successfully");
            }
        });
  }
else{
        return res.status(400).json({ error: 'Invalid request data' });

   
}
}
)


app.listen(PORT, (error) => {
    if(error) {
        console.log("something went wrong while starting the server");
    } else {
        console.log("server is running on port 8080");
    }
});