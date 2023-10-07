import express from "express";
import { UserController } from "../Controller/Users/userController";
import { AdminController } from "../Controller/Admin/adminController";
import { JobsController } from "../Controller/Jobs/JobsController";
import { SchedulingController } from "../Controller/Scheduling/schedulingController";
import { LoginUser } from "../Auth/loginUser";
import { LoginAdmin } from "../Auth/loginAdmin";
import { Payment } from "../Config/Payment/stripeConfig"

const routes = express.Router();

routes.get('/list/user', UserController.findAll);
routes.get('/list/:id', UserController.findAllById);
routes.post('/create/user', UserController.createUser);
routes.put('/update/:id', UserController.updateUser);
routes.delete('/delete/:id', UserController.deleteUser);

routes.get('/list/admin', AdminController.findAll);
routes.get('/list/admin/:id', AdminController.findAdminId);
routes.post('/create/admin', AdminController.createAdmin);
routes.put('/update/admin/:id', AdminController.updateAdmin);
routes.delete('/delete/admin/:id', AdminController.deleteAdmin);

routes.get('/list/jobs', JobsController.findAllJobs);
routes.get('/list/:id', JobsController.findjobsId);
routes.post('/create/jobs', JobsController.createJobs);
routes.put('/update/:id', JobsController.updateJobs);
routes.delete('/delete/:id', JobsController.deleteJobs);

routes.get('/scheduling/:id', SchedulingController.listScheduling);
routes.post('/create/scheduling', SchedulingController.createScheduling);
routes.put('/update/scheduling/:id', SchedulingController.updateScheduling);
routes.delete('/delete/scheduling/:id', SchedulingController.deleteScheduling);

routes.post('/login/user', LoginUser.login);
routes.post('/login/admin', LoginAdmin.loginAdmin);

routes.post('/create/pay', Payment.createPay);
routes.post('/list/pay/:id', Payment.listPay);
routes.delete('/delete/pay/:id', Payment.listPay);



export default routes;