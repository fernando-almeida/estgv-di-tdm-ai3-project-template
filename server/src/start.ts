import app from '@server';
import { logger } from '@shared';

// Start the server
const port = Number(process.env.PORT || 3000);

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'bernardomendonca1998@gmail.com',
  from: 'test@example.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);

app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
