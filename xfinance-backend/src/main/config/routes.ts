import { Express, Router } from 'express';
import userRoutes from '@/main/routes/user.route';
import categoryRoutes from '@/main/routes/category.route';
import financeMetaRoutes from '@/main/routes/financeMeta.route';
import transactionRoutes from '@/main/routes/transaction.route';

export default function setupRoutes(app: Express) {
    const router = Router();
    app.use(router);
    userRoutes(router);
    categoryRoutes(router);
    financeMetaRoutes(router);
    transactionRoutes(router);
}
