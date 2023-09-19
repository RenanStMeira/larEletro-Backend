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

            return res.status(200).json({message: `jobs ${name} criado com sucesso!`});
        } catch (error) {
            return res.status(400).json({message: 'Erro ao criar jobs', error});
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
            return res.status(400).json({ message: `${error.message} - falha ao buscar jobs` });
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
                return res.status(404).json({message: 'Usuário não encontrado'})
            };

            return res.status(200).json(jobsId)
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar jobs por ID' });

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
                return res.status(404).json({ message: 'jobs não encontrado' });
            };

            return res.status(200).json({ message: `jobs ${name} atualizado com sucesso` });
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao atualizar jobs' });
        }
    };
    static async deleteJobs(req: Request, res: Response){
        const { id } = req.params;

        try {
            const deleteJobs = await prisma.jobs.delete({
                where: {id},
            });

            return res.status(200).json({ message: `jobs deletado com sucesso` });
        } catch (error) {
            return res.status(400).json({ message: 'Erro deletar jobs', error });
        }
    };
};