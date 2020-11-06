import { ErrorObject } from 'ajv';
import { APIGatewayProxyResultV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { API_ERROR } from '../../config/error-code';
import { ApiError } from '../api_error';

export const successProxyResult = <T>(data: T): APIGatewayProxyStructuredResultV2 => {
  const result: APIGatewayProxyStructuredResultV2 = {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
  return result;
};

export const errorProxyResult = (statusCode: number, errorCode: string, errorMessage: string, ajvError?: ErrorObject[] | null): APIGatewayProxyStructuredResultV2 => {
  const result: APIGatewayProxyResultV2 = {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ errorCode, errorMessage, attributesError: ajvError }),
  };
  return result;
};

export const exceptionProxyResult = (err: unknown): APIGatewayProxyStructuredResultV2 => {
  if (err instanceof ApiError) {
    return errorProxyResult(500, err.code, err.message);
  }
  if (err instanceof Error) {
    return errorProxyResult(500, API_ERROR, err.message);
  }
  return errorProxyResult(500, API_ERROR, JSON.stringify(err));
};
