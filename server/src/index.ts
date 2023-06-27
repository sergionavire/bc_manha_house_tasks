import express from "express";
import { userController } from "./user/user.controller";
import { houseController } from "./house/house.controller";
import { workDayController } from "./word_day/work_day.controller";
import { workDayTaskController } from "./word_day_task/work_day_task.controller";
import cors from "cors";

const app = express();
const port = 8080;
const host = "0.0.0.0"; //"localhost";
const messageListen = `Server listen on http://${host}:${port}`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/users", userController);
app.use("/houses", houseController);
app.use("/work_days", workDayController);
app.use("/work_day_tasks", workDayTaskController);

app.listen(port, host, () => {
  console.log(messageListen);
});
