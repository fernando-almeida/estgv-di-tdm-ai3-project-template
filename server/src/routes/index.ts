import { Request, Response, Router } from 'express';
import UserRouter from './Users';

// Export the base-router
export default Router;

// Init router and path
const router = Router();

function sendEmail(msg) {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // {
    //     to: 'test@example.com',
    //     from: 'test@example.com',
    //     subject: 'Sending with Twilio SendGrid is Fun',
    //     text: 'and easy to do anywhere, even with Node.js',
    //     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    // };
    return sgMail.send(msg);
}

function sendCustomEmail(req: Request, res: Response) {
    const msg = req.body;
    sendEmail(msg)
        .then(resSg => res.status(201).json({ message: 'OK'}))
        .catch(err => res.status(500).json({ message: 'NOT OK'})); 
}
function sendSupportEmail(req: Request, res: Response) {
    const msg = req.body;
    msg.to = 'Recetor';
    sendEmail(msg)
        .then(resSg => res.status(201).json({ message: 'OK'}))
        .catch(err => res.status(500).json({ message: 'NOT OK'})); 
}

// Add sub-routes
router.use('/users', UserRouter);

router.post('/sendEmail', /*checkJwt, */sendCustomEmail);
router.post('/support', sendSupportEmail);


