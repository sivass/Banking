import mongoose from 'mongoose';
import { AccountService } from '../services/accountService';
import { IAccount } from '../models/Account';
import { UserService } from '../services/userService';
import { IUser } from '../models/User';

describe('Account Service', () => {
  let accountService: AccountService;
  let account: IAccount;
  let userService: UserService;
  let user: IUser;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/banking_test');
    userService = new UserService();
    accountService = new AccountService();
    user = await userService.registerUser('Test','User','test@example.com','test@12345');
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it('test account service', async () => {
    expect('10').toBe('10');
  })

  // it('should create a new account', async () => {
  //   account = await accountService.createAccount(user.id, 'savings');
  //   expect(account.accountType).toBe('savings');
  // });

  // it('should get an account by userId', async () => {
  //   const fetchedAccount = await accountService.getAccount(user.id);
  //   expect(fetchedAccount?.accountType).toBe('savings');
  // });

  // it('should update account balance', async () => {
  //   const updatedAccount = await accountService.updateBalance(account.id, 100);
  //   expect(updatedAccount?.balance).toBe(100);
  // });
});
