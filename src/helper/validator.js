class validator 
{
    static validateTaskInfo(taskInfo){
        if(taskInfo.hasOwnProperty("taskID") &&
        taskInfo.hasOwnProperty("taskTitle") &&
        taskInfo.hasOwnProperty("taskStatus")){
            return {
                "status": true,
                "message": "task has been added"
            }
        }
        else{
            return {
                "status": false,
                "message": "task info is malformed, please provided all the parameters"
            }
        }
    }
}
module.exports = validator;