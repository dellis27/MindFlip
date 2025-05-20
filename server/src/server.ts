import express from 'express';
import cors from 'cors';
import routes from './routes';
import { database } from './config/connection';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
database.connect();

// Routes
app.use(routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});