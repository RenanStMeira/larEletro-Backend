import { Request, Response } from "express";
import  { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';


const prisma = new PrismaClient();

export class UserController {
    static async createUser(req: Request, res: Response) {
        const { name, email, contact, password, adress } = req.body;

        const hash = await bcrypt.hash(password, 10);
        try {
            const newUser = await prisma.users.create({
                data: {
                    name,
                    email,
                    contact,
                    password: hash,
                    adress,
                },
            });
            const {password: _, ...users} = newUser;
        
            return res.status(200).json({ message: `User ${name} created successfully!` });
        } catch (error) {
            return res.status(400).json({ message: 'Error creating user!' });
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
            return res.status(400).json({ message: `${error.message} - Failed to search for user` });
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
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ message: 'Error when searching for user by ID' });
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
                return res.status(404).json({ message: 'User not found' });
            }
    
            return res.status(200).json({ message: `User ${name} updated successfully` });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Error updating user' });
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

            return res.status(200).json({ message: `User deleted successfully` });
        } catch (error) { 
            return res.status(400).json({ message: 'Error deleting user', error });
            
        }
    };
};