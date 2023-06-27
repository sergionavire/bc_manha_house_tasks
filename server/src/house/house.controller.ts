import express from "express";
import * as houseService from './house.service';

export const houseController = express.Router();

houseController.get('/select', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const houses = await houseService.findHousesToSelect();
    if (houses === null) {
        res.sendStatus(404);
    } else {
        res.status(200).json(houses);
    }
});

houseController.get('/count', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const search = req.query.search !== undefined ? req.query.search.toString() : '';
    
    const count = await houseService.houseCount(search);
      

    if (count === null) {
        res.sendStatus(404);
    } else {
        res.status(200).json(count);
    }
});


houseController.get('/:id', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const id = Number(req.params.id);
    const house = await houseService.findHouseById(id);
    if (house === null) {
        res.sendStatus(404);
    } else {
        res.status(200).json(house);
    }
});

houseController.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const offset = req.query.offset ? Number(req.query.offset) : undefined;
    
    const order_by = req.query.order_by as string | undefined;
    const direction = req.query.direction as string | undefined;
    const search = req.query.search !== undefined ? req.query.search.toString() : undefined;
    
    const houses = await houseService.findHouses({
        limit,
        offset,
        search,
        order_by,
        direction,
      });
      

    if (houses === null) {
        res.sendStatus(404);
    } else {
        res.status(200).json(houses);
    }
});

houseController.post('/', async (req, res) => {    
    res.header('Access-Control-Allow-Origin', '*');
    
    const response = await houseService.createHouse(req.body);
    const status = response.success ? 201 : 422;
    
    res.status(status).json(response);
});

houseController.put('/:id', async (req, res) => {    
    res.header('Access-Control-Allow-Origin', '*');
    const id = Number(req.params.id);
    const response = await houseService.updateHouse(id, req.body);
    const status = response.success ? 201 : 422;
    
    res.status(status).json(response);
});

houseController.delete('/:id', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const id = Number(req.params.id);
    const house = await houseService.deleteHouse(id);
    if (house === null) {
        res.sendStatus(404);
    } else {
        res.status(200).json(house);
    }
});
