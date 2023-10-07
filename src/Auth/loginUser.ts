import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../Middlewares/jwt";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class LoginUser{
   static async login(req: Request, res: Response){
        const { email, password } = req.body;
    
        try{
            const users = await prisma.users.findUnique({
                where:{ email },
            });
    
            if(!users) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            };

            const isPasswordValid = await bcrypt.compare(password, users.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Senha incorreta' })
            };
    
            const token = generateToken({ id: users.id });
    
            const { password:_, ...userLogin } = users;
    
            return res.json({
                user: userLogin,
                token: token,
            });
    
        } catch (err) {
            return res.status(400).json({ message: 'Erro ao fazer login' });
            }
        };
    
    };