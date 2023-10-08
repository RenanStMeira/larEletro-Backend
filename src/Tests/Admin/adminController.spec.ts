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
                id: 'b0cdf861-a1d9-469f-b3bb-abee63513e31'
            }
        } as unknown as Request;
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
    });
});

