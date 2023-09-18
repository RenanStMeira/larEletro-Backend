import { Request, Response } from "express";
import { user } from "../models/userModel";

export class UserController {
    static async createUser(req: Request, res: Response) {
        const { name, email, contact, adress, password } = req.body;

        try {
            const newUser = await user.create({
                name: name,
                email: email,
                contact: contact,
                password: password,
                adress: adress
            });

            return res.status(200).json({ message: `Usuário criado com sucesso!` });
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao criar usuário!' });
        }
    };

    static async findAll(req: Request, res: Response) {
        
        try {
            // const id = req.params.id;

            const findAll = await user.find({});

            res.status(200).json(findAll);
        } catch (error) {
            res.status(400).json({ message: `${error.message} - falha ao buscar usuario` });
        }
    };
};    