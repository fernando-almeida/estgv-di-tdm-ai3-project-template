import { Router } from 'express';
import AccountRouter from './Account';
import CommunicationRouter from './Communication';
import SupportRouter from './Support';
import UserRouter from './Users';

function sendEmail(msg: any) {
    
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: 'bernardomendonca1998@gmail.com',
//   from: 'test@example.com',
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
return sgMail.send(msg);
}

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/communication', CommunicationRouter);
router.use('/support', SupportRouter);
router.use('/account', AccountRouter);

// Export the base-router
export default router;