import { Express, Router } from 'express';
import userRoutes from '@/main/routes/user.route';
import categoryRoutes from '@/main/routes/category.route';
import financeGoalRoutes from '@/main/routes/financeGoal.route';
import transactionRoutes from '@/main/routes/transaction.route';

export default function setupRoutes(app: Express) {
    const router = Router();
    app.use(router);
    userRoutes(router);
    categoryRoutes(router);
    financeGoalRoutes(router);
    transactionRoutes(router);
}
