import { NextFunction } from 'connect';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import logger from 'morgan';
import path from 'path';
// tslint:disable-next-line: no-var-requires
import swaggerUi, { SwaggerOptions } from 'swagger-ui-express';
// tslint:disable-next-line: no-var-requires
import YAML from 'yamljs';
import BaseRouter from './routes';

/**
 * Handle invalid API endpoint
 * @param err Error
 * @param req Request
 * @param res Response
 * @param next Next middleware
 */
function handleInvalidApiEndpoint(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // tslint:disable-next-line
  console.error(err.stack);
  res.status(404).send('API endpoint does not exist!');
}

function configureApiDocumentation(expressApp: express.Express) {
  const swaggerOptions: SwaggerOptions = {
    validatorUrl: null,
    oauth: {
      clientId: 'your-client-id1',
      clientSecret: 'your-client-secret-if-required1',
      realm: 'your-realms1',
      appName: 'your-app-name1',
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

// Export express instance
export default app;
