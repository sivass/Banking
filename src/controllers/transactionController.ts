import { Request, Response } from "express";
import { TransactionService } from "../services/transactionService";


export class TransactionController {
    constructor(private transactionService: TransactionService) {}

    async createTransactionController(req: Request, res: Response): Promise<void> {
        try {
            const { accountId, amount, transactionType} = req.body;
            const transaction = await this.transactionService.createTransaction(accountId,amount,transactionType);
            res.status(201).json({ transaction});
        } catch (error) {
            res.status(500).json({ message: error});
        }
    }

    async getTransactionController(req: Request, res: Response): Promise<void> {
        try {
            const { accountId} = req.params;
            const transaction = await this.transactionService.getTransaction(accountId);
            res.status(200).json({ transaction });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error'});
        }
    }
}