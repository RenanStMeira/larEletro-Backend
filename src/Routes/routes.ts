import express from "express";
import { UserController } from "../Controller/userController";

const routes = express.Router();

routes.get('/list/user', UserController.findAll);

routes.post('/create/user', UserController.createUser);


export default routes;