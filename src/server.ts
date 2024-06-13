import  express, { response }  from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import accountRoutes from "./routes/accountRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import { errorHandler } from "./middleware/errorMiddleware";
import typeDefs from "./graphql/schemas/userSchema";
import resolvers from "./graphql/resolvers/userResolver";
import bodyParser from "body-parser"



dotenv.config();
const startServer = async () => {
    const app = express();
    app.use(express.json());

    // GraphQL setup
    const server = new ApolloServer({typeDefs,resolvers,});
    await server.start()
    app.use('/graphql',expressMiddleware(server));

    // REST API
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
};

startServer();