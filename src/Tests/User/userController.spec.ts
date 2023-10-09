import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { UserController } from "../../Controller/Users/userController";
import { mock } from "ts-mockito";
import bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue('hashedPassword'),
  }));
  
  const prisma = new PrismaClient();
  const userController = new UserController();

  describe('UserController tests', () => {
    afterAll(async () => {
      await prisma.$disconnect();
    });
  
    describe('createUser', () => {
      it('should create a new user', async () => {
        const req: Request = {
          body: {
            name: 'it User',
            email: 'it@example.com',
            contact: '123456789',
            password: '123456789',
            address: 'it Address',
          },
        } as Request;
        const res: Response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
  
        await userController.createUser(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'User it User created successfully!' });
      });

      it('should find all users', async () => {
        const req: Request = {
            params: { id: 'fd7b11ce-aea4-49ca-b36e-6c7b422c0469' },
        } as unknown as Request;
        const res: Response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
  
        await userController.findAll(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
      });
    });
  
      it('should find a user by ID', async () => {
        const req: Request = {
            params: { id: 'fd7b11ce-aea4-49ca-b36e-6c7b422c0469' },
        } as unknown as Request;
        const res: Response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
  
        await userController.findAllById(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
      });

      it('should update a user', async () => {
        const req: Request = {
            params: { id: 'fd7b11ce-aea4-49ca-b36e-6c7b422c0469' },
            body: {
                name: 'Updated User',
                email: 'updated@example.com',
                contact: '987654321',
                password: 'newpassword',
                address: 'Updated Address',
            },
        } as unknown as Request;
        const res: Response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
  
        await userController.updateUser(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'User Updated User updated successfully' });
      });

      it('should delete a user', async () => {
        const req: Request = {
            params: { id: 'fd7b11ce-aea4-49ca-b36e-6c7b422c0469' },
        } as unknown as Request;
        const res: Response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
  
        await userController.deleteUser(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
      });
    });
  
   

