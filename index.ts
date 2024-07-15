import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typeDefs";
import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";
const PORT = parseInt(process.env.PORT || "4000");

// Database connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Db Connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(-1);
  });

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
  listen: { port: PORT },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
