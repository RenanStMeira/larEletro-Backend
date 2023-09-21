import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../Middlewares/jwt";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class LoginAdmin {
    static async loginAdmin (req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const admin = await prisma.admin.findUnique({
                where: { email },
            });

            if (!admin) {
                return res.status(404).json({ message:' Admin não encontrado' });
            };

            const passwordValid = await bcrypt.compare(password, admin.password);

            if (!passwordValid) {
                return res.status(401).json({ message: 'Senha incorreta' })
            };

            const token = generateToken({ id: admin.id });

            const { password:_, ...adminLogin } = admin;
    
            return res.json({
                admin: adminLogin,
                token: token,
            });

        } catch (error) {
            return res.status(400).json({ message: 'Erro ao fazer login' });
            
        }
    };
};