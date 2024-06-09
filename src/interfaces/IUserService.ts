import { IUser } from "../models/User";

export interface IUserService {
    registerUser(firstName: string, lastName: string, email: string, password: string): Promise<IUser>;
    loginUser(email: string, password: string): Promise<{token: string}>;
}