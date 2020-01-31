import { Router } from 'express';
import AccountRouter from './Account';
import CommunicationRouter from './Communication';
import SupportRouter from './Support';
import UserRouter from './Users';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/communication', CommunicationRouter);
router.use('/support', SupportRouter);
router.use('/account', AccountRouter);

// Export the base-router
export default router;