import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import bcrypt from 'bcryptjs';
import User, { IUser} from '../models/User';
import { UserService }  from '../services/userService';
import jwt  from 'jsonwebtoken';

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
let userService: UserService;

describe('UserService - createUser', () => {
  let mongoServer: MongoMemoryServer;
  
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    userService = new UserService();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await User.deleteMany({});
  });

  it('should create a user successfully', async () => {
    const bcryptHashMock = jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never);

    const userData = {
      firstName: 'test',
      lastName: 'user',
      email: 'testuser@gmail.com',
      password: 'password123',
    };

    const createdUser = await userService.registerUser('Test','User','testuser@gmail.com','password123');

    expect(createdUser).toBeDefined();
    expect(createdUser.email).toBe(userData.email);
    expect(bcryptHashMock).toHaveBeenCalledWith(userData.password, 10);

    bcryptHashMock.mockRestore();
  });

  it('should throw an error if the user already exists and required input missing', async () => {
    const bcryptHashMock = jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never);
    const userData = {
      firstName: 'test',
      lastName: 'user',
      email: 'testuser@gmail.com',
      password: 'password123',
    };

    // Create a user first
    await userService.registerUser('Test','User','testuser@gmail.com','password123');

    // Try to create the same user again
    await expect(userService.registerUser('Test','User','testuser@gmail.com','password123')).rejects.toThrow('User already exists');
    await expect(userService.registerUser('Test','User','','password123')).rejects.toThrow('User validation failed: email: Path `email` is required.');
    expect(bcryptHashMock).toHaveBeenCalledWith(userData.password, 10);

    bcryptHashMock.mockRestore();
  });

  it('should login a user and return a token', async () => {
    const bcryptHashMock = jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never);
    const bcryptCompareMock = jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
    const jwtSignMock  = jest.spyOn(jwt, 'sign').mockReturnValue('jwtToken' as never);
    
    await userService.registerUser('Test','User','testuser@gmail.com','password123');
    const userLogin = await userService.loginUser('testuser@gmail.com','password123');
    expect(bcryptCompareMock).toHaveBeenCalledWith('password123','hashedPassword');
    expect(jwtSignMock).toHaveBeenCalledWith({ id: expect.anything() }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    expect(userLogin.token).toBe('jwtToken');
    bcryptHashMock.mockRestore();
    bcryptCompareMock.mockRestore();
    jwtSignMock.mockRestore();
  });
});
