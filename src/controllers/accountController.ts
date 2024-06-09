import { Request, Response } from "express";
import { AccountService } from "../services/accountService";

export class AccountController {
    constructor(private accountService: AccountService) {}

    async createAccountController(req: Request, res: Response): Promise<void>{
        try {
            const { accountType} = req.body;
            const userId = (req as any).user.id;
            const account = await this.accountService.createAccount(userId, accountType);
            res.status(201).json({account});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error' });
        }
    }

    async getAccountController(req: Request, res: Response): Promise<void>{
        try {
            const userId = (req as any).user.id;
            const account = await this.accountService.getAccount(userId);
            if(!account){
                res.status(404).json({message: 'Account not found'});
                return;
            }
            res.status(200).json({account});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error' });
        }
    }
}