export * from './Logger';
export * from './Misc';

/**
 * Build API error message
 * @param message Message
 */
export function buildApiErrorMessage(message: string) {
    return {
        message,
    } as Api.IError;
}
