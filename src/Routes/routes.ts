import express from "express";
import { UserController } from "../Controller/Users/userController";
import { AdminController } from "../Controller/Admin/adminController";

const routes = express.Router();

routes.get('/list/user', UserController.findAll);
routes.get('/list/:id', UserController.findAllById);
routes.post('/create/user', UserController.createUser);
routes.put('/update/:id', UserController.updateUser);
routes.delete('/delete/:id', UserController.deleteUser);

routes.get('/list/user', AdminController.findAll);
routes.get('/list/:id', AdminController.findAdminId);
routes.post('/create/user', AdminController.createAdmin);
routes.put('/update/:id', AdminController.updateAdmin);
routes.delete('/delete/:id', AdminController.deleteAdmin);

export default routes;