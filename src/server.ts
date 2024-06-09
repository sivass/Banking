import  express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import accountRoutes from "./routes/accountRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import { errorHandler } from "./middleware/errorMiddleware";

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI!).then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
        console.log(`Server listening on ${process.env.PORT}`);
    });
})
.catch(err => {
    console.log('Error connecting to MongoDB', err);
});