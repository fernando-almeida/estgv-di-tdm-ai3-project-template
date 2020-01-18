
import { Request, Response, Router } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { buildApiErrorMessage } from '../shared/index';

const router = Router();

/**
 * Send email on behalf of the logged in user
 * @param req Request
 * @param res Response
 */
async function handleSendEmail(req: Request, res: Response) {
    // TODO: Handle sending of email via SendGrid
    res.status(INTERNAL_SERVER_ERROR)
        .send(buildApiErrorMessage('Not implemented'));
}
// Register routes
router.post('/', handleSendEmail);

export default router;
