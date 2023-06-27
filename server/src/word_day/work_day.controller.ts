import express from "express";
import * as workDayService from './work_day.service';

export const workDayController = express.Router();

workDayController.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    
    const workDays = await workDayService.findWorkDays();
    if (workDays === null) {
        res.sendStatus(404);
    } else {
        res.status(200).json(workDays);
    }
});

workDayController.get('/to-show/:id', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const id = Number(req.params.id);
    const workDay = await workDayService.findWorkDayByIdToShow(id);
    if (workDay === null) {
        res.sendStatus(404);
    } else {
        res.status(200).json(workDay);
    }
});

workDayController.get('/:id', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const id = Number(req.params.id);
    const workDay = await workDayService.findWorkDayById(id);
    if (workDay === null) {
        res.sendStatus(404);
    } else {
        res.status(200).json(workDay);
    }
});


workDayController.post('/', async (req, res) => {    
    res.header('Access-Control-Allow-Origin', '*');
    
    const response = await workDayService.createWorkDay(req.body);
    const status = response.success ? 201 : 422;
    
    res.status(status).json(response);
});

workDayController.put('/:id', async (req, res) => {    
    res.header('Access-Control-Allow-Origin', '*');
    const id = Number(req.params.id);
    const response = await workDayService.updateWorkDay(id, req.body);
    const status = response.success ? 201 : 422;
    // console.log(response);
    
    res.status(status).json(response);
});


workDayController.delete('/:id', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const id = Number(req.params.id);
    const workDay = await workDayService.deleteWorkDay(id);
    if (workDay === null) {
        res.sendStatus(404);
    } else {
        res.status(200).json(workDay);
    }
});
