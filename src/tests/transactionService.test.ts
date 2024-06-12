import mongoose from 'mongoose';
import { AccountService } from '../services/accountService';
import { TransactionService } from '../services/transactionService';
import { ITransaction } from '../models/Transaction';
import { UserService } from '../services/userService';
import User,{ IUser } from '../models/User';
import { IAccount } from '../models/Account';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('Transaction Service', () => {
  let accountService: AccountService;
  let transactionService: TransactionService;
  let transaction: ITransaction;
  let userService: UserService;
  let user: IUser;
  let account: IAccount;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    accountService = new AccountService();
    userService = new UserService();
    transactionService = new TransactionService(accountService);
    user = await userService.registerUser('Test','User','test@example.com','test@12345');
    account = await accountService.createAccount(user.id, 'savings');
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });
  afterEach(async () => {
    jest.clearAllMocks();
    await User.deleteMany({});
  });


  it('should create a new transaction', async () => {
    transaction = await transactionService.createTransaction(account.id, 100, 'credit');
    expect(transaction.amount).toBe(100);
    expect(transaction.transactionType).toBe('credit');
  });

  it('should get transactions by accountId', async () => {
    const transactions = await transactionService.getTransaction(account.id);
    expect(transactions.length).toBeGreaterThan(0);
  });
});
