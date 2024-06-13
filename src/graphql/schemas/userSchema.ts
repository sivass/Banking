import { ApolloServer  } from "@apollo/server";

const typeDefs = `
    type User{
        id: ID!
        username: String!
        email: String!
        password: String!
    }
    
    type Query {
        getUser(id: ID!): User
        getUsers: [User]
    }
    
    type Mutation {
        createUser(firstName: String!, lastName: String!, email: String!, password: String): User
        loginUser(email: String!, password: String!): String
    }
`;

export default typeDefs;