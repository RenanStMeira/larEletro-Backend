import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const stripe = require('stripe')('sk_test_51NydR7BbKjBT8C085FgG23bxkelKM0R8yvi5pKQz4bxVB63nhCoivckGhJhLnUcn3wMvGtEuMldNX6hzJ4zvnOhP00NX02PxYj');

const YOUR_DOMAIN = 'http://localhost:3333';

export class Payment {
    static async createPay(req: Request, res: Response) {
       
        try {
            const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price: 'price_1NyfU7BbKjBT8C088qoPjAwM',
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success.html`, 
            cancel_url: `${YOUR_DOMAIN}/cancel.html`,
          });
        
           return res.status(200).json({ id: session.id });
        } catch (error) {
            return res.status(400).json({ message: 'Error when making payment' });
        }
    };

    static async listPay(req: Request, res: Response) {
      const { id } = req.params;

      try {
          const sessions = await stripe.checkout.sessions.list({
              limit: 100,
          });

          const filteredSessions = sessions.data.filter(session => session.id === id);

          return res.status(200).json(filteredSessions);
      } catch (error) {
          console.error(error);
          return res.status(500).json({ error: "Erro ao listar pagamentos" });
      }
  };

  static async deletePay(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await stripe.checkout.session.del(id);

      return res.status(200).json({ message: 'Payment session deleted successfully.' });

    } catch (error) {
      
      return res.status(500).json({ error: 'Error deleting payment session.' });
    }
  };
};
