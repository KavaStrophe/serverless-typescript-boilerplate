import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { createExampleController, deleteExampleController, getByIdExampleController, updateExampleController } from '../../controller/example';
import { Example } from '../../models/example';
import { ExampleCreateInputDto } from '../../models/example/example_create_input_dto';
import { ExampleDeleteInputDto } from '../../models/example/example_delete_input_dto';
import { ExampleGetByIdInputDto } from '../../models/example/example_get_by_id_input_dto';
import { ExampleUpdateInputDto } from '../../models/example/example_update_input_dto';
import schema from '../../models/schema.json';
import { apiMiddleware } from '../../utils/middleware/api';

/**
 * get example by id
 */
const getByIdExampleHandler: APIGatewayProxyHandlerV2<Example> = (event) => {
  const exampleGetByIdInputDto = (event.pathParameters as unknown) as ExampleGetByIdInputDto;
  return getByIdExampleController({ exampleGetByIdInputDto });
};

export const getExample = middy(getByIdExampleHandler);
getExample.use(apiMiddleware(schema.definitions.ExampleGetByIdInputDto, 'pathParameters'));
getExample.use(apiMiddleware({}, 'empty'));

/**
 * update example
 */
const updateExampleHandler: APIGatewayProxyHandlerV2<Example> = async (event) => {
  const exampleUpdateInputDto: ExampleUpdateInputDto = (event.body as unknown) as ExampleUpdateInputDto;
  const result = await updateExampleController({ exampleUpdateInputDto });

  return result;
};

export const updateExample = middy(updateExampleHandler);
updateExample.use(apiMiddleware(schema.definitions.ExampleUpdateInputDto, 'body'));
updateExample.use(httpJsonBodyParser());

/**
 * Delete example
 */
const deleteExampleHandler: APIGatewayProxyHandlerV2<Example> = async (event) => {
  const exampleDeleteInputDto = (event.pathParameters as unknown) as ExampleDeleteInputDto;
  return deleteExampleController({ exampleDeleteInputDto });
};
export const deleteExample = middy(deleteExampleHandler);
deleteExample.use(apiMiddleware(schema.definitions.ExampleDeleteInputDto, 'pathParameters'));

/**
 * Create example
 */
const createExampleHandler: APIGatewayProxyHandlerV2<Example> = async (event) => {
  const exampleCreateInputDto: ExampleCreateInputDto = (event.body as unknown) as ExampleCreateInputDto;
  return createExampleController({ exampleCreateInputDto });
};
export const createExample = middy(createExampleHandler);
createExample.use(apiMiddleware(schema.definitions.ExampleCreateInputDto, 'body'));
createExample.use(httpJsonBodyParser());
