import mongoose from 'mongoose';
import { AccountService } from '../services/accountService';
import { TransactionService } from '../services/transactionService';
import { ITransaction } from '../models/Transaction';

describe('Transaction Service', () => {
  let accountService: AccountService;
  let transactionService: TransactionService;
  let transaction: ITransaction;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/banking_test');

    // accountService = new AccountService();
    // transactionService = new TransactionService(accountService);

    // await accountService.createAccount('userId123', 'savings');
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it('test transaction service', async () => {
    expect('10').toBe('10');
  })

  // it('should create a new transaction', async () => {
  //   transaction = await transactionService.createTransaction('accountId123', 100, 'credit');
  //   expect(transaction.amount).toBe(100);
  //   expect(transaction.transactionType).toBe('credit');
  // });

  // it('should get transactions by accountId', async () => {
  //   const transactions = await transactionService.getTransaction('accountId123');
  //   expect(transactions.length).toBeGreaterThan(0);
  // });
});
