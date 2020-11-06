export const API_ERROR = 'api_error'; // API errors cover any other type of problem and are extremely uncommon.
export const AUTHENTICATION_ERROR = 'authentication_error'; // Failure to properly authenticate yourself in the request.
export const DUPLICATE_ERROR = 'duplicate_error'; // Duplicate errors occur when an element must be unique
export const INVALID_REQUEST_ERROR = 'invalid_request_error'; // Invalid request errors arise when your request has invalid parameters.
export const NOT_FOUND = 'not_found'; // When we cannot find the entity you are looking for
export const FORBIDDEN = 'forbidden'; // The user doesn't have hight access enought to request this path
