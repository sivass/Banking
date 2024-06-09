import { ITransaction } from '../models/Transaction';

export interface ITransactionService {
    createTransaction(accountId: string, amount: number, transactionType: string): Promise<ITransaction>;
    getTransaction(accountId: string): Promise<ITransaction[]>;
}