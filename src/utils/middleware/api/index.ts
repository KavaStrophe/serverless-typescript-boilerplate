import middy from '@middy/core';
import Ajv from 'ajv';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Context } from 'aws-lambda';
import { API_ERROR, AUTHENTICATION_ERROR, DUPLICATE_ERROR, INVALID_REQUEST_ERROR, NOT_FOUND } from '../../../config/error-code';
import { ApiError } from '../../api_error';
import { errorProxyResult, successProxyResult } from '../../gateway_proxy_result';

const ajv = new Ajv({ allErrors: true });

export const apiMiddleware = (
  schema: Record<string, unknown>,
  input: 'body' | 'pathParameters' | 'empty'
): middy.MiddlewareObject<APIGatewayProxyEventV2, APIGatewayProxyResultV2, Context> => {
  return {
    before: (handler, next) => {
      switch (input) {
        case 'body': {
          const { event } = handler;
          if (event.body === undefined) {
            throw new ApiError(INVALID_REQUEST_ERROR, 'Cannot read the json body');
          }
          const validate = ajv.compile(schema);
          const valid = validate(JSON.parse(event.body));
          if (valid === false) {
            throw new ApiError(INVALID_REQUEST_ERROR, 'The body json input format is not correct', validate.errors);
          }
          break;
        }
        case 'pathParameters': {
          const { event } = handler;
          if (event.pathParameters === undefined) {
            throw new ApiError(INVALID_REQUEST_ERROR, 'Cannot read the path parameters');
          }
          const validate = ajv.compile(schema);
          const valid = validate(event.pathParameters);
          if (valid === false) {
            throw new ApiError(INVALID_REQUEST_ERROR, 'The path parameters input format is not correct', validate.errors);
          }
          break;
        }
        case 'empty':
          break;
        default:
          break;
      }
      next();
    },
    after: (handler) => {
      // give back the result object in json
      handler.callback(null, successProxyResult(handler.response));
    },
    onError: (handler) => {
      // catch error and send error code and message
      const { error } = handler;
      if (error.name === 'ApiError') {
        const apiError = error as ApiError;
        switch (apiError.code) {
          case API_ERROR: {
            handler.callback(null, errorProxyResult(500, API_ERROR, error.message));
            break;
          }
          case AUTHENTICATION_ERROR: {
            handler.callback(null, errorProxyResult(403, AUTHENTICATION_ERROR, error.message));
            break;
          }
          case DUPLICATE_ERROR: {
            handler.callback(null, errorProxyResult(409, DUPLICATE_ERROR, error.message));
            break;
          }
          case INVALID_REQUEST_ERROR: {
            handler.callback(null, errorProxyResult(400, INVALID_REQUEST_ERROR, error.message, apiError.ajvError));
            break;
          }
          case NOT_FOUND: {
            handler.callback(null, errorProxyResult(404, NOT_FOUND, error.message));
            break;
          }
          default: {
            handler.callback(null, errorProxyResult(500, API_ERROR, error.message));
            break;
          }
        }
        return;
      }
      handler.callback(null, errorProxyResult(500, API_ERROR, error.message));
    },
  };
};
