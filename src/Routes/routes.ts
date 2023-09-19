import express from "express";
import { UserController } from "../Controller/userController";

const routes = express.Router();

routes.get('/list/user', UserController.findAll);
routes.get('/list/:id', UserController.findAllById);
routes.post('/create/user', UserController.createUser);
routes.put('/update/:id', UserController.updateUser);
routes.delete('/delete/:id', UserController.deleteUser);

export default routes;