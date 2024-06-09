import Account, { IAccount } from '../models/Account';
import { IAccountService } from '../interfaces/IAccountService';

export class AccountService implements IAccountService {
    async createAccount(userId: string, accountType: string): Promise<IAccount>{
        const account = new Account({ userId, accountType});
        return account.save();
    }

    async getAccount(userId: string): Promise<IAccount | null>{
        return Account.findOne({ userId});
    }

    async updateBalance(accountId: string, amount: number): Promise<IAccount | null> {
        return Account.findByIdAndUpdate(accountId, { $inc: { balance : amount }}, { new: true });
    }
}