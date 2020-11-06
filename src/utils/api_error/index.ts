import { ErrorObject } from 'ajv';
import { API_ERROR } from '../../config/error-code';

export class ApiError extends Error {
  code: string;

  ajvError?: ErrorObject[] | null;

  constructor(code = API_ERROR, message?: string, ajvError?: ErrorObject[] | null) {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
    this.name = 'ApiError';
    this.code = code;
    this.message = message || code;
    this.ajvError = ajvError;
  }
}
