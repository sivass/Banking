import bcrypt from 'bcryptjs';
import jwt  from 'jsonwebtoken';
import User from '../../models/User';
import { UserService } from '../../services/userService';
let userService = new UserService();
const resolvers = {
    Query: {
        getUser: async (_: any, { id}: { id: string}) => {
            return await User.findById(id);
        },
        getUsers: async () => {
            return await User.find({})
        },
    },
Mutation: {
    createUser: async (_: any, { firstName, lastName, email,password }: { firstName: string, lastName: string, email: string, password: string}) =>{
        const user = await userService.registerUser(firstName, lastName, email, password);
        return user;
    },
    loginUser: async (_: any,{ email, password }: { email: string, password: string}) => {  
        const token = await userService.loginUser(email, password);
        return token;
    },
},
};

export default resolvers;