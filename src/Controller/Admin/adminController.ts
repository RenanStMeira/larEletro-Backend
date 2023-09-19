import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AdminController{
    static async createAdmin(req: Request, res: Response){
        const { name, email, password,contact, cnpj } = req.body

        try {
            const newAdmin = await prisma.admin.create({
                data: {
                    name,
                    email,
                    password,
                    contact,
                    cnpj
                }
            });

            return res.status(200).json({message: `Admin ${name} criado com sucesso!`});
        } catch (error) {
            return res.status(400).json({message: 'Erro ao criar admin', error});
        }
    };

    static async findAll(req: Request, res: Response){
        const { id } = req.params;

        try {
            const findAll = await prisma.admin.findMany({
                where: {
                    id,
                },
            });

            return res.status(200).json(findAll);
        } catch (error) {
            return res.status(400).json({ message: `${error.message} - falha ao buscar admin` });
        }
    };

    static async findAdminId(req: Request, res: Response){
        const { id } = req.params;

        try {
            const adminId = await prisma.admin.findUnique({
                where: {
                    id: (id),
                }
            });

            if (!adminId) {
                return res.status(404).json({message: 'Usuário não encontrado'})
            };

            return res.status(200).json(adminId)
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar admin por ID' });

        }
    };   
    static async updateAdmin(req: Request, res: Response){
        const { id } = req.params;
        const { name, email, password,contact, cnpj } = req.body;

        try {
            const updateAdmin = await prisma.admin.update({
                where: { id },
                data: {
                    name,
                    email,
                    password,
                    contact,
                    cnpj
                },
            });

            if (!updateAdmin) {
                return res.status(404).json({ message: 'Admin não encontrado' });
            };

            return res.status(200).json({ message: `Admin ${name} atualizado com sucesso` });
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao atualizar admin' });
        }
    };
    static async deleteAdmin(req: Request, res: Response){
        const { id } = req.params;

        try {
            const deleteAdmin = await prisma.admin.delete({
                where: {id},
            });

            return res.status(200).json({ message: `Admin deletado com sucesso` });
        } catch (error) {
            return res.status(400).json({ message: 'Erro deletar admin', error });
        }
    };
};