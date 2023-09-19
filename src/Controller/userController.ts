import { Request, Response } from "express";
// import { user } from "../models/userModel";
import  { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserController {
    static async createUser(req: Request, res: Response) {
        const { name, email, contact, password, adress } = req.body;

        try {
            const newUser = await prisma.users.create({
                data: {
                    name,
                    email,
                    contact,
                    password,
                    adress,
                },
            });
        
            return res.status(200).json({ message: `Usuário criado com sucesso!` });
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao criar usuário!' });
        }
    };

    static async findAll(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const findAll = await prisma.users.findMany({
                where: {
                    id,
                }
            })

            return res.status(200).json(findAll);
        } catch (error) {
            return res.status(400).json({ message: `${error.message} - falha ao buscar usuario` });
        }
    };

    static async findAllById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const user = await prisma.users.findUnique({
                where: {
                    id: (id),
                },
            });

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar usuário por ID' });
        } 
    };    

    static async updateUser(req: Request, res: Response) {
        const { id } = req.params; // Captura o ID dos parâmetros da URL
        const { name, email, contact, password, adress } = req.body;
    
        try {
            const updateUser = await prisma.users.update({
                where: { id }, // Converte o ID para número, se necessário
                data: {
                    name,
                    email,
                    contact,
                    password,
                    adress,
                },
            });
    
            if (!updateUser) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
    
            return res.status(200).json({ message: `Usuario ${name} atualizado com sucesso` });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Erro ao atualizar usuário' });
        }
    };

    static async deleteUser (req: Request, res: Response) {
        const { id } = req.params;

        try {
            const deleteUser = await prisma.users.delete({
                where: {
                    id
                }
            });

            return res.status(200).json({ message: `Usuario deletado com sucesso` });
        } catch (error) { 
            return res.status(400).json({ message: 'Erro deletar usuario', error });
            
        }
    };
};