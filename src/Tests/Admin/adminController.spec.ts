import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { AdminController } from "../../Controller/Admin/adminController";
import { mock } from "ts-mockito";

jest.mock('@prisma/client', () => {
    return {
      PrismaClient: jest.fn().mockImplementation(() => {
        return {
          admin: {
            create: jest.fn(),
          },
          $disconnect: jest.fn(),
        };
      }),
    };
  });
  
const prisma = new PrismaClient();
const adminController = new AdminController();

describe('Admincrontroller tests', () => {
    afterAll(async () => {
        await prisma.$disconnect();
    });

        it('should create a new admin', async () => {
            const req: Request ={
                body: {
                    name: 'admin Test',
                    email: 'test@admin.com',
                    password: '123456',
                    contact: '18999999999',
                    cnpj: '111111111111'
                },
            } as Request;

            const res : Response = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            await adminController.createAdmin(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({message: 'Admin criado com sucesso'});
           
        });
    });









// const prismaMock = mock(PrismaClient);

// describe('AdminController tests', () => {
//     let adminController: AdminController;
//     let req: Request;
//     let res: Response;

//     beforeEach(() => {
//         adminController = new AdminController();
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
//     it ('should return a admin', () => {
//         const admin = {
//             id: '13375807-4f50-4e3f-a203-caa94cacdb95',
//             name: "Teste",
//             email: "teste@gmail.com",
//             password: "123456",
//             contact: "18999999999",
//             cnpj: "1111111111111"
//         };

//         const adminMock = jest.fn().mockResolvedValue(admin);

//         res.json = adminMock;
//         adminController.findAll(req, res);
//         expect(res.json).toBe(adminMock);
//     });
// });

