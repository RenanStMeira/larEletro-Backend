import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class JobsController{
    static async createJobs(req: Request, res: Response){
        const { name, description, price, } = req.body

        try {
            const newJobs = await prisma.jobs.create({
                data: {
                    name,
                    description,
                    price,
                }
            });

            return res.status(200).json({message: `jobs ${name} successfully created!`});
        } catch (error) {
            return res.status(400).json({message: 'Error creating jobs', error});
        }
    };

    static async findAllJobs(req: Request, res: Response){
        const { id } = req.params;

        try {
            const findAllJobs = await prisma.jobs.findMany({
                where: {
                    id,
                },
            });

            return res.status(200).json(findAllJobs);
        } catch (error) {
            return res.status(400).json({ message: `${error.message} - Failed to fetch jobs` });
        }
    };

    static async findjobsId(req: Request, res: Response){
        const { id } = req.params;

        try {
            const jobsId = await prisma.jobs.findUnique({
                where: {
                    id: (id),
                }
            });

            if (!jobsId) {
                return res.status(404).json({message: 'Jobs not found'})
            };

            return res.status(200).json(jobsId)
        } catch (error) {
            return res.status(400).json({ message: 'Error when searching for jobs by ID' });

        }
    };   
    static async updateJobs(req: Request, res: Response){
        const { id } = req.params;
        const { name, description, price } = req.body;

        try {
            const updateJobs = await prisma.jobs.update({
                where: { id },
                data: {
                    name,
                    description,
                    price,
                },
            });

            if (!updateJobs) {
                return res.status(404).json({ message: 'jobs not found' });
            };

            return res.status(200).json({ message: `jobs ${name} updated successfully` });
        } catch (error) {
            return res.status(400).json({ message: 'Error updating jobs' });
        }
    };
    static async deleteJobs(req: Request, res: Response){
        const { id } = req.params;

        try {
            const deleteJobs = await prisma.jobs.delete({
                where: {id},
            });

            return res.status(200).json({ message: `jobs deleted successfully` });
        } catch (error) {
            return res.status(400).json({ message: 'Error deleting jobs', error });
        }
    };
};