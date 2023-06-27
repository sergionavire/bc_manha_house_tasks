import express from "express";
import * as userService from './user.service';

export const userController = express.Router();

userController.get('/select', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const users = await userService.findUsersToSelect();
    if (users === null) {
        res.sendStatus(404);
    } else {
        res.status(200).json(users);
    }
});


userController.get('/:id', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const id = Number(req.params.id);
    const user = await userService.findUserById(id);
    if (user === null) {
        res.sendStatus(404);
    } else {
        res.status(200).json(user);
    }
});

userController.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const users = await userService.findUsers();
    if (users === null) {
        res.sendStatus(404);
    } else {
        res.status(200).json(users);
    }
});

userController.post('/', async (req, res) => {    
    res.header('Access-Control-Allow-Origin', '*');
    
    const response = await userService.createUser(req.body);
    const status = response.success ? 201 : 422;
    
    res.status(status).json(response);
});

userController.put('/:id', async (req, res) => {    
    res.header('Access-Control-Allow-Origin', '*');
    const id = Number(req.params.id);
    const response = await userService.updateUser(id, req.body);
    const status = response.success ? 201 : 422;
    // console.log(response);
    
    res.status(status).json(response);
});


userController.delete('/:id', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const id = Number(req.params.id);
    const user = await userService.deleteUser(id);
    if (user === null) {
        res.sendStatus(404);
    } else {
        res.status(200).json(user);
    }
});
