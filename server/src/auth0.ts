import { AuthenticationClient, ManagementClient } from 'auth0';
import { Request } from 'express';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';


// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
export const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and 
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_API_IDENTIFIER,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});

/**
 * Build an instance of Auth0's authentication API client
 * @see https://www.npmjs.com/package/auth0
 */
export function buildAuthenticationClient() {
  const authenticationClient = new AuthenticationClient({
    domain: process.env.AUTH0_DOMAIN as string, // TODO: Validate
    clientId: process.env.AUTH0_CLIENT_ID,
  });

  return authenticationClient;
}

/**
 * Build an instance of Auth0's management API client
 * @param scope Scopes to request
 * @see https://www.npmjs.com/package/auth0
 */
export function buildManagementClient(scopeOrScopes: string | string[]) {
  const managementClient = new ManagementClient({
    domain: process.env.AUTH0_DOMAIN as string, // TODO: Validate
    clientId: process.env.AUTH0_MGMT_CLIENT_ID as string,
    clientSecret: process.env.AUTH0_MGMT_CLIENT_SECRET as string,
    scope: Array.isArray(scopeOrScopes) ? scopeOrScopes.join(' ') : scopeOrScopes,
  });
  return managementClient;
}

/**
 * Get access token in the request
 * @param req Request
 */
export function getAccessToken(req: Request) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  throw new Error('No Bearer access token not found in Authorization headers');
}