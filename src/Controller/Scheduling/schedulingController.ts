import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class SchedulingController{
    static async createScheduling(req: Request, res: Response){
        const { name, email, contact, dateService, messageuser } = req.body;

        try {
            const createScheduling = await prisma.scheduling.create({
                data: {
                    name, email, contact, dateService, messageuser
                },
            });
            return res.json(createScheduling);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    static async listScheduling(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const scheduling = await prisma.scheduling.findUnique({
                where: {
                    id: id,
                }
            });

            if (scheduling){
               return res.json(scheduling);

            }else {
               return res.status(404).json({ message: 'User not found' })
            }
               } catch {
                return res.status(400).json({ message: 'Internal Server Error' })
        }
     };

     static async updateScheduling(req: Request, res: Response){
        const { id } = req.params;
        const { name, email, contact, dateService, messageuser } = req.body;

        try {
            const updateScheduling = await prisma.scheduling.update({
                where: { id },
                data: {
                    name, email, contact, dateService, messageuser
                },
            });

            return res.status(201).json({message: `Scheduling for ${name} updated successfully`});
        } catch (error) {
            return res.status(404).json({message: ''})
        }
     };

     static async deleteScheduling(req: Request, res: Response){
        const { id } = req.params;

        try {
            const deleteScheduling = await prisma.scheduling.delete({
                where: {
                    id: (id),
                },
            });

            return res.status(201).json({message: 'Appointment deleted successfully'});
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' })
        }
     };
};