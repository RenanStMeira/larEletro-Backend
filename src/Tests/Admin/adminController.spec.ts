import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { AdminController } from "../../Controller/Admin/adminController";
import { mock } from "ts-mockito";

const prismaMock = mock(PrismaClient);

describe('AdminController tests', () => {
    let adminController: AdminController;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        adminController = new AdminController();
        req = {
            params: {
                id: '13375807-4f50-4e3f-a203-caa94cacdb95'
            }
        } as unknown as Request;
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
    });
    it ('should return a admin', () => {
        const admin = {
            id: '13375807-4f50-4e3f-a203-caa94cacdb95',
            name: "Teste Meira",
            email: "teste@gmail.com",
            password: "123456",
            contact: "18935002592",
            cnpj: "34408772000189"
        };

        const adminMock = jest.fn().mockResolvedValue(admin);

        res.json = adminMock;
        adminController.findAll(req, res);
        expect(res.json).toBe(adminMock);
    });
});

