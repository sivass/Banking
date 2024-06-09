import { IAccount } from "../models/Account";

export interface IAccountService {
    createAccount(userId: string, accountType: string): Promise<IAccount>;
    getAccount(userId: string): Promise<IAccount | null>;
    updateBalance(accountId: string, amount: number): Promise<IAccount | null>;
}