import express from "express";
import path from "node:path";
import type { Request, Response } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { authenticateToken } from "./services/auth.js";
import { typeDefs, resolvers } from "./schemas/index.js";
import db from "./config/connection.js";

// test
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Define __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

const startApolloServer = async () => {
  try {
    await server.start();
    await db;
    
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use(
      "/graphql",
      expressMiddleware(server as any, {
        context: authenticateToken as any,
      })
    );

    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "../client/dist")));

      app.get("*", (_req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, "../client/dist/index.html"));
      });
    }
    db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    })
  });
  } catch (error) {
    console.error("Server startup error:", error);
  }
};

startApolloServer();