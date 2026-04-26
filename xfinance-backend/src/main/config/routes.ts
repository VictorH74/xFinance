import { Express, Router } from 'express';
import userRoutes from '@/main/routes/user.route';
import categoryRoutes from '@/main/routes/category.route';
import transactionRoutes from '@/main/routes/transaction.route';
import dashboardRoutes from '../routes/dashboard.route';
import financeGoalRoutes from '../routes/financeGoal.route';
import authRoutes from '../routes/auth.route';

export default function setupRoutes(app: Express) {
    const router = Router();
    app.use(router);
    userRoutes(router);
    categoryRoutes(router);
    financeGoalRoutes(router);
    transactionRoutes(router);
    dashboardRoutes(router);
    authRoutes(router);
}
