
import { Request, Response, Router } from 'express';
import { ACCEPTED, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { buildAuthenticationClient, checkJwt, getAccessToken } from '../auth0';
import { sendEmail } from '../email';

const router = Router();

/**
 * Send email on behalf of the logged in user
 * @param req Request
 * @param res Response
 */
async function handleSendEmail(req: Request, res: Response) {
    try {
        // TODO: Handle sending of email via SendGrid
        const sendEmailRequest = req.body as Api.SendEmailRequest; // TODO: Validate message data in body
        let fromEmail = sendEmailRequest.from;
        if (fromEmail === undefined) {
            // TODO: Get user profile from Auth0 auth0 API
            const auth0AuthClient = buildAuthenticationClient();
            const accessToken = getAccessToken(req);
            // TODO: User profile should be cached to avoid many calls to API in order to not get rate limited
            const userProfile = await auth0AuthClient.getProfile(accessToken);
            fromEmail = userProfile.email as string;
        };

        const resSendEmail = await sendEmail(
            fromEmail,
            sendEmailRequest.to,
            sendEmailRequest.subject,
            sendEmailRequest.message);
        res.status(ACCEPTED);
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR);
    }
}
// Register routes
router.post('/send_email', checkJwt, handleSendEmail);

export default router;