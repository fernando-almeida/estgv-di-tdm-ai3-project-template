
import { Request, Response, Router } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { buildApiErrorMessage } from '../shared/index';

const router = Router();

/**
 * Send email on behalf of the logged in user
 * @param req Request
 * @param res Response
 */
async function handleCreateSupportTicket(req: Request, res: Response) {
    // TODO: Handle creation of a support ticker => Just send email via SendGrid to admin
    res.status(INTERNAL_SERVER_ERROR)
        .send(buildApiErrorMessage('Not implemented'));
}
// Register routes
router.post('/', handleCreateSupportTicket);

export default router;
