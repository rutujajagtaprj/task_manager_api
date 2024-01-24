const express = require("express");
const bodyParser = require("body-parser");
const taskRouter = require("./v1/routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/api/v1/tasks", taskRouter);


app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
})