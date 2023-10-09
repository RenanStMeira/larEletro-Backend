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

  describe('UserController', () => {
    afterAll(async () => {
      await prisma.$disconnect();
    });
  
    describe('createUser', () => {
      test('should create a new user', async () => {
        const req: Request = {
          body: {
            name: 'Test User',
            email: 'test@example.com',
            contact: '123456789',
            password: 'password',
            address: 'Test Address',
          },
        } as Request;
        const res: Response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
  
        await userController.createUser(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'User Test User created successfully!' });
      });
    });
  
    describe('findAll', () => {
      test('should find all users', async () => {
        const req: Request = {
            params: { id: '1' },
        } as unknown as Request;
        const res: Response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
  
        await userController.findAll(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        // Adicione aqui expectativas para a resposta JSON, se necessário
      });
    });
  
    describe('findAllById', () => {
      test('should find a user by ID', async () => {
        const req: Request = {
            params: { id: '1' },
        } as unknown as Request;
        const res: Response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
  
        await userController.findAllById(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        // Adicione aqui expectativas para a resposta JSON, se necessário
      });
    });
  
    describe('updateUser', () => {
      test('should update a user', async () => {
        const req: Request = {
            params: { id: '1' },
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
    });
  
    describe('deleteUser', () => {
      test('should delete a user', async () => {
        const req: Request = {
            params: { id: '1' },
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
  });
  


// const prismaMock = mock(PrismaClient);

// describe('UserControllers Tests', () => {
//     let userController: UserController;
//     let req: Request;
//     let res: Response;

//     beforeEach(() => {
//         userController = new UserController();
//         req = {
//             params: {
//                 id: '13375807-4f50-4e3f-a203-caa94cacdb95'
//             }
//         } as unknown as Request;
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         } as unknown as Response;
//     });

//     it('Shold return a user', () => {
//         const user = {
//             id: '13375807-4f50-4e3f-a203-caa94cacdb95',
//             name: 'test name',
//             email: 'email@test.com',
//             contact: '18999999999'
//         };

//         const userMock = jest.fn().mockResolvedValue(user)

//         res.json= userMock;
//         userController.findAll(req, res);
//         expect(res.json).toBe(userMock);
//     });
// });