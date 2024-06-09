import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { IUserService } from "../interfaces/IUserService";

export class UserService implements IUserService {
  async registerUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    return user.save();
  }

  async loginUser(email: string, password: string): Promise<{token:string}> {
    const user = await User.findOne({ email });
    if(!user) {
        throw new Error('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      throw new Error('Invalid email or password');
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET!, { expiresIn:'1h'});
    return { token };
  }
}
