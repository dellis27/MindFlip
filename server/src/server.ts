import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import db from './config/connection.js';
import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';
import { getUserFromToken } from './services/auth.js';
import dotenv from 'dotenv';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;

console.log("Initializing Apollo Server...");
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();
  console.log("Apollo Server Started!");

  // ✅ CORS middleware
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));

  // ✅ Extra middleware to explicitly set CORS response headers
  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ✅ Apollo GraphQL Middleware
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization?.split(' ')[1];
        const user = getUserFromToken(token);
        return { user };
      },
    })
  );

  // ✅ Serve client in production
  if (process.env.NODE_ENV === 'production') {
    console.log("Serving Production Build...");
    app.use(express.static(path.join(__dirname, '../../client/dist')));
  }

  // ✅ Start server
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/graphql`);
  });

  // ✅ Connect to DB
  db.once('open', () => {
    console.log("Database Connected!");
  });

  db.on('error', (err) => {
    console.error("Database Connection Error:", err);
  });
}

startServer();



