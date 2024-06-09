import mongoose,{ Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role:string
}

const userScheme: Schema = new Schema({
    firstName:{ type: String, required: true },
    lastName:{ type: String, required: true },
    email:{ type: String, required: true,unique: true },
    password:{ type: String, required: true  },
    role: { type: String, default: 'user' },
});

export default mongoose.model<IUser>('User', userScheme);