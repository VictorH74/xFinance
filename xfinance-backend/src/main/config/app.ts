import express, { Express } from 'express';
import { setupDbClient } from './database';
import setupRoutes from './routes';
import setupMiddlewares from './middlewares';


export default async function setupApp(): Promise<Express> {
    await setupDbClient();
    const app = express();
    setupMiddlewares(app);
    setupRoutes(app);
    return app;
}