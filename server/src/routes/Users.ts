import { UserDao } from '@daos';
import { buildApiErrorMessage, logger, paramMissingError } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { IUserDao } from '../daos/User/UserDao';


const USER_ID_HTTP_PARAM_NAME = 'userId';
const USER_ID_HTTP_ROUTE_PARAM = `:${USER_ID_HTTP_PARAM_NAME}(\\d+)`;

/**
 * Get user identifier from path
 * @param req Request
 */
function getUserIdFromRequestPath(req: Request) {
    const userId = req.params[USER_ID_HTTP_PARAM_NAME];
    if (!userId) {
        throw new Error('User identifier not found in path');
    }
    return parseInt(userId, 10);
}

// Init shared
const router = Router();
const userDao: IUserDao = new UserDao();

/**
 * List existing users ("GET /api/users/")
 * @param req Request
 * @param res Response
 */
async function handleUsersList(req: Request, res: Response) {
    const filter: Api.IUserFilter | undefined = req.query;
    try {
        const users = await userDao.list(filter);
        return res.status(OK).json(users);
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json(buildApiErrorMessage(err.message));
    }
}

/**
 * Handle request for creating a new user (P)
 * @param req Request
 * @param res Response
 */
async function handleUsersCreate(req: Request, res: Response) {
    try {
        const userCreateData: Api.IUserCreateData = req.body;
        if (!userCreateData) {
            return res.status(BAD_REQUEST)
                    .json(buildApiErrorMessage(paramMissingError));
        }
        const userCreated = await userDao.create(userCreateData);
        return res.status(CREATED).json(userCreated).end();
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json(buildApiErrorMessage(err.message));
    }
}

/**
 * Handle update of a given user ("PUT /api/users")
 * @param req Request
 * @param res Response
 */
async function handleUserUpdate(req: Request, res: Response) {
    try {
        const userId = getUserIdFromRequestPath(req);
        const userUpdateData: Api.IUserUpdateData = req.body;
        if (!userUpdateData) {
            return res.status(BAD_REQUEST).json(buildApiErrorMessage(paramMissingError));
        }

        const updatedUser = await userDao.updateById(userId, userUpdateData);
        return res.status(OK).json(updatedUser).end();
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json(buildApiErrorMessage(err.message));
    }
}

/**
 * Handle get of a given user ("GET /api/users/:userId")
 * @param req Request
 * @param res Response
 */
async function handleUserGet(req: Request, res: Response) {
    try {
        const userId = getUserIdFromRequestPath(req);
        if (!userId) {
            return res.status(BAD_REQUEST).json(buildApiErrorMessage(paramMissingError));
        }

        const user = await userDao.getById(userId);
        return res.status(OK).json(user).end();
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
}

/**
 * Handle delete of a given user ("DELETE /api/users/:id")
 * @param req Request
 * @param res Response
 */
async function handleUserDelete(req: Request, res: Response) {
    try {
        const userId = getUserIdFromRequestPath(req);
        await userDao.deleteById(userId);
        return res.status(OK).end();
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
}

// Register user routes
router.get('/', handleUsersList);
router.post('/', handleUsersCreate);

// User-specific routes
router.get(`/${USER_ID_HTTP_ROUTE_PARAM}`, handleUserGet);
router.put(`/${USER_ID_HTTP_ROUTE_PARAM}`, handleUserUpdate);
router.delete(`/${USER_ID_HTTP_ROUTE_PARAM}`, handleUserDelete);

export default router;