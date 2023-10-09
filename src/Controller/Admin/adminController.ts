import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AdminController{
    delete(req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) {
        throw new Error("Method not implemented.");
    }
    async createAdmin(req: Request, res: Response){
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

            return res.status(200).json({message: `Admin ${name} successfully created!`});
        } catch (error) {
            return res.status(400).json({message: 'Error creating admin', error});
        }
    };

    async findAll(req: Request, res: Response){
        const { id } = req.params;

        try {
            const findAll = await prisma.admin.findMany({
                where: {
                    id,
                },
            });

            return res.status(200).json(findAll);
        } catch (error) {
            return res.status(400).json({ message: `${error.message} - Failed to fetch admin` });
        }
    };

    async findAdminId(req: Request, res: Response){
        const { id } = req.params;

        try {
            const adminId = await prisma.admin.findUnique({
                where: {
                    id: (id),
                }
            });

            if (!adminId) {
                return res.status(404).json({message: 'Admin not found'})
            };

            return res.status(200).json(adminId)
        } catch (error) {
            return res.status(400).json({ message: 'Error when searching for admin by ID' });

        }
    };   
    async updateAdmin(req: Request, res: Response){
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
                return res.status(404).json({ message: 'Admin not found' });
            };

            return res.status(200).json({ message: `Admin ${name} updated successfully` });
        } catch (error) {
            return res.status(400).json({ message: 'Error updating admin' });
        }
    };
    async deleteAdmin(req: Request, res: Response){
        const { id } = req.params;

        try {
            const deleteAdmin = await prisma.admin.delete({
                where: {id},
            });

            return res.status(200).json({ message: `Admin successfully deleted` });
        } catch (error) {
            return res.status(400).json({ message: 'Error delete admin', error });
        }
    };
};