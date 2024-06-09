import mongoose, { Document, Schema} from "mongoose";

export interface IAccount extends Document {
    userId: string;
    accountType: string;
    balance: number;
}

const accountSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    accountType: { type: String, required: true },
    balance: { type: Number, default: 0},
});

export default mongoose.model<IAccount>('Account', accountSchema);