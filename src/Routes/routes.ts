import express from "express";
import { UserController } from "../Controller/Users/userController";
import { AdminController } from "../Controller/Admin/adminController";
import { JobsController } from "../Controller/Jobs/JobsController";
import { SchedulingController } from "../Controller/Scheduling/schedulingController";

const routes = express.Router();

routes.get('/list/user', UserController.findAll);
routes.get('/list/:id', UserController.findAllById);
routes.post('/create/user', UserController.createUser);
routes.put('/update/:id', UserController.updateUser);
routes.delete('/delete/:id', UserController.deleteUser);

routes.get('/list/admin', AdminController.findAll);
routes.get('/list/:id', AdminController.findAdminId);
routes.post('/create/admin', AdminController.createAdmin);
routes.put('/update/:id', AdminController.updateAdmin);
routes.delete('/delete/:id', AdminController.deleteAdmin);

routes.get('/list/jobs', JobsController.findAllJobs);
routes.get('/list/:id', JobsController.findjobsId);
routes.post('/create/jobs', JobsController.createJobs);
routes.put('/update/:id', JobsController.updateJobs);
routes.delete('/delete/:id', JobsController.deleteJobs);

routes.get('/list/:id', SchedulingController.listScheduling);
routes.post('/create/jobs', SchedulingController.createScheduling);
routes.put('/update/:id', SchedulingController.updateScheduling);
routes.delete('/delete/:id', SchedulingController.deleteScheduling);

export default routes;