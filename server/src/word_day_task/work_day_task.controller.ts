import express from "express";
import * as workDayTaskService from './work_day_task.service';

export const workDayTaskController = express.Router();

workDayTaskController.get('/work_day/:work_day_id', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const workDayId = Number(req.params.work_day_id);
    const workDayTasks = await workDayTaskService.findWorkDayTasks(workDayId);
    
    if (workDayTasks === null) {
        res.sendStatus(404);
    } else {
        res.status(200).json(workDayTasks);
    }
});



workDayTaskController.get('/:id', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const id = Number(req.params.id);
    const workDayTask = await workDayTaskService.findWorkDayTaskById(id);
    if (workDayTask === null) {
        res.sendStatus(404);
    } else {
        res.status(200).json(workDayTask);
    }
});

workDayTaskController.post('/', async (req, res) => {    
    res.header('Access-Control-Allow-Origin', '*');
    
    const response = await workDayTaskService.createWorkDayTask(req.body);
    const status = response.success ? 201 : 422;
    
    res.status(status).json(response);
});


workDayTaskController.delete('/:id', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const id = Number(req.params.id);
    const workDayTask = await workDayTaskService.deleteWorkDayTask(id);
    if (workDayTask === null) {
        res.sendStatus(404);
    } else {
        res.status(200).json(workDayTask);
    }
});
