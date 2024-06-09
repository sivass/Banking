import Transaction, { ITransaction } from '../models/Transaction';
import { ITransactionService } from '../interfaces/ITransactionService';
import { AccountService } from './accountService';

export class TransactionService implements ITransactionService {
    constructor(private accountService: AccountService) { }
        async createTransaction(accountId: string, amount: number, transactionType: string): Promise<ITransaction>{
            const account = await this.accountService.updateBalance(accountId, transactionType === 'credit' ?  amount : -amount);
            if(!account) {
                throw new Error('Account mot found');
            }

            const transaction = new Transaction({ accountId, amount, transactionType});
            return transaction.save();
        }

        async getTransaction(accountId: string): Promise<ITransaction[]>{
            const transaction = await Transaction.find({accountId});
            return transaction;
        }
}