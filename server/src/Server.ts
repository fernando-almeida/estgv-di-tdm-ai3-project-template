import { NextFunction } from 'connect';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import { UnauthorizedError } from 'express-jwt';
import { INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } from 'http-status-codes';
import logger from 'morgan';
import path from 'path';
// tslint:disable-next-line: no-var-requires
import swaggerUi, { SwaggerOptions } from 'swagger-ui-express';
// tslint:disable-next-line: no-var-requires
import YAML from 'yamljs';
import BaseRouter from './routes';
import { buildApiErrorMessage } from './shared/index';

// Augment request definition
interface IUser {
  email: string;
}
interface IJwtTokenAuth0 {
  iss: string;
  sub: string;
  aud: string | string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
}

declare global {
  namespace Express {
    // tslint:disable-next-line
    interface Request {
        user?: IJwtTokenAuth0;
    }
  }
}

/**
 * Handle invalid API endpoint
 * @param err Error
 * @param req Request
 * @param res Response
 * @param next Next middleware
 */
function handleInvalidApiEndpoint(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // tslint:disable-next-line
  res.status(NOT_FOUND).send('API endpoint does not exist!');
}

/**
 * Handle exceptions
 * @param error Error
 * @param req Request
 * @param res Reponse
 * @param next Next middleware
 */
function handleError(error: Error, req: Request, res: Response, next: NextFunction) {
  if (error instanceof UnauthorizedError) {
    return res.status(UNAUTHORIZED).json(buildApiErrorMessage(error.message));
  }
  return res.status(INTERNAL_SERVER_ERROR).json(buildApiErrorMessage(error.message));
}

/**
 * Configure API documentation
 * @param expressApp Express app
 */
function configureApiDocumentation(expressApp: express.Express) {
  // TODO: Validate that env vars have proper values
  const swaggerOptions: SwaggerOptions = {
    validatorUrl: null,
    oauth: {
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      realm: process.env.AUTH0_REALM,
      appName: process.env.AUTH0_APP_NAME,
      scopeSeparator: ',',
      additionalQueryStringParams: {}
    }
  };
  const swaggerUiOptions = {
    customCss: undefined,
    customCssUrl: undefined,
    customfavIcon: undefined,
    customJs: undefined,
    customSiteTitle: 'Project AI3',
    explorer: true,
    isExplorer: undefined,
    swaggerOptions,
    swaggerUrl: undefined,
    swaggerUrls: undefined,
  }; /* Typing @types/swagger-ui-expresss.SwaggerUiOptions is wrong */
  const swaggerDocument = YAML.load('./docs/openapi-spec.yaml');
  expressApp.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, swaggerUiOptions, swaggerOptions)
  );
}

// Init express
const app = express();

// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', BaseRouter);
// app.get('/api', handleInvalidApiEndpoint);

/**
 * Point express to the 'views' directory. If you're using a
 * single-page-application framework like react or angular
 * which has its own development server, you might want to
 * configure this to only serve the index file while in
 * production mode.
 */
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

configureApiDocumentation(app);

app.get('*', (req: Request, res: Response) => {
  res.sendFile('index.html', { root: staticDir });
});
app.use(handleInvalidApiEndpoint); // Will never be called because of the previos middleware

app.use(handleError);

// Export express instance
export default app;