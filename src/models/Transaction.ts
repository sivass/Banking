import mongoose, { Document, Schema} from "mongoose";

export interface ITransaction extends Document {
    accountId: string;
    amount: number;
    transactionType: string;
    date: Date;
}

const transactionSchema: Schema = new Schema({
    accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true},
    amount: { type: Number, required: true },
    transactionType: { type: String, required: true},
    date: { type: Date, default: Date.now}
});

export default mongoose.model<ITransaction>('Transaction', transactionSchema);