import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { UserService } from '../services/userService';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('User Service', () => {
  let userService: UserService;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/banking_test');
    userService = new UserService();
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    await User.deleteMany({});
  });

  it('should register a new user', async () => {
    const bcryptHashMock = bcrypt.hash as jest.MockedFunction<typeof bcrypt.hash>;
    bcryptHashMock.mockResolvedValue('hashedPassword' as never); // Explicitly typing as never to resolve TypeScript error

    const user: IUser = await userService.registerUser('Test', 'User', 'test@example.com', 'password123');

    expect(user.email).toBe('test@example.com');
    expect(bcryptHashMock).toHaveBeenCalledWith('password123', 10);

    const foundUser = await User.findOne({ email: 'test@example.com' });
    expect(foundUser).not.toBeNull();
    expect(foundUser?.password).toBe('hashedPassword');
  });

  it('should login a user and return a token', async () => {
    const bcryptHashMock = bcrypt.hash as jest.MockedFunction<typeof bcrypt.hash>;
    const bcryptCompareMock = bcrypt.compare as jest.MockedFunction<typeof bcrypt.compare>;
    const jwtSignMock = jwt.sign as jest.MockedFunction<typeof jwt.sign>;

    bcryptHashMock.mockResolvedValue('hashedPassword' as never); // Explicitly typing as never to resolve TypeScript error
    bcryptCompareMock.mockResolvedValue(true as never); // Explicitly typing as never to resolve TypeScript error
    jwtSignMock.mockReturnValue('jwtToken' as never); // Explicitly typing as never to resolve TypeScript error

    await userService.registerUser('Test', 'User', 'login@example.com', 'password123');
    const result = await userService.loginUser('login@example.com', 'password123');

    const user = await User.findOne({ email: 'login@example.com' });
    expect(bcryptCompareMock).toHaveBeenCalledWith('password123', 'hashedPassword');
    expect(jwtSignMock).toHaveBeenCalledWith({ id: expect.any(String) }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    expect(result.token).toBe('jwtToken');
  });

  it('should throw an error if email is incorrect during login', async () => {
    await userService.registerUser('Test', 'User', 'login@example.com', 'password123');
    await expect(userService.loginUser('wrong@example.com', 'password123')).rejects.toThrow('Invalid email or password');
  });

  it('should throw an error if password is incorrect during login', async () => {
    const bcryptCompareMock = bcrypt.compare as jest.MockedFunction<typeof bcrypt.compare>;
    bcryptCompareMock.mockResolvedValue(false as never); // Explicitly typing as never to resolve TypeScript error

    await userService.registerUser('Test', 'User', 'wrongpassword@example.com', 'password123');
    await expect(userService.loginUser('wrongpassword@example.com', 'wrongpassword')).rejects.toThrow('Invalid email or password');
  });
});





