import { APIGatewayProxyEventV2 } from '../../src/handler/example/node_modules/aws-lambda';

export const proxyEventCreator = (body: string): APIGatewayProxyEventV2 => {
  return {
    version: '',
    routeKey: '',
    rawPath: '',
    rawQueryString: '',
    headers: { 'Content-Type': 'application/json' },
    requestContext: {
      accountId: '',
      apiId: '',
      domainName: '',
      domainPrefix: '',
      requestId: '',
      http: {
        method: 'POST',
        path: '/customer',
        protocol: 'HTTP/1.1',
        sourceIp: '',
        userAgent: '',
      },
      routeKey: '',
      time: '',
      timeEpoch: 0,
      stage: 'dev',
    },
    isBase64Encoded: false,
    body,
  };
};
