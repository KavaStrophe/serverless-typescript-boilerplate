// eslint-disable-next-line import/no-extraneous-dependencies
import { DynamoDB } from 'aws-sdk'; // this will provided be in lambda environnement
import { EXAMPLE_ENTITY_NAME } from '../../config/entities-names';
import { NOT_FOUND } from '../../config/error-code';
import { buildErrorMessageNotFound } from '../../config/error-message';
import { Example } from '../../models/example';
import { ExampleCreateInputDto } from '../../models/example/example_create_input_dto';
import { ExampleDeleteInputDto } from '../../models/example/example_delete_input_dto';
import { ExampleGetByIdInputDto } from '../../models/example/example_get_by_id_input_dto';
import { ExampleUpdateInputDto } from '../../models/example/example_update_input_dto';
import { ApiError } from '../../utils/api_error';
import { updateItemInputBuilder } from '../../utils/dynamodb/update_item_input_helper';

const TABLE_NAME = process.env.EXAMPLE_TABLE || 'example-backend-api-offline-example';
const TABLE_REGION = process.env.AWS_REGION || 'localhost';

let dynamoClient = new DynamoDB.DocumentClient({
  region: TABLE_REGION,
});
// when we are offline
if (Boolean(process.env.IS_OFFLINE) === true) {
  dynamoClient = new DynamoDB.DocumentClient({
    region: TABLE_REGION,
    endpoint: 'http://localhost:8000',
    accessKeyId: 'DEFAULT_ACCESS_KEY',
    secretAccessKey: 'DEFAULT_SECRET',
  });
}

/**
 *
 * GetById
 */
export const getByIdExampleService = async (params: { exampleGetByIdInputDto: ExampleGetByIdInputDto }): Promise<Example> => {
  // prepare data
  const { id } = params.exampleGetByIdInputDto;
  const getItemInput: DynamoDB.DocumentClient.GetItemInput = {
    TableName: TABLE_NAME,
    Key: { id },
  };
  // execute
  const result = await dynamoClient.get(getItemInput).promise();

  // check if error
  if (result.$response.error) throw result.$response.error;
  else if (!result.Item) throw new ApiError(NOT_FOUND, buildErrorMessageNotFound({ entityName: EXAMPLE_ENTITY_NAME, id }));

  // convert result
  const example = result.Item as Example;
  return example;
};

/**
 * Update Example
 */

export const updateExampleService = async (params: { exampleUpdateInputDto: ExampleUpdateInputDto }): Promise<Example> => {
  const { id } = params.exampleUpdateInputDto;
  const formerExample = await getByIdExampleService({ exampleGetByIdInputDto: { id } });

  const updatedExample = ({ ...formerExample, ...params.exampleUpdateInputDto, ...{ updatedAt: Date.now() } } as unknown) as Example;
  const attributeUpdates = updateItemInputBuilder({ object: updatedExample, idsPropNames: ['id'] });

  // prepare data
  const updateItemInput: DynamoDB.DocumentClient.UpdateItemInput = {
    TableName: TABLE_NAME,
    Key: { id },
    AttributeUpdates: attributeUpdates,
  };

  // execute
  const result = await dynamoClient.update(updateItemInput).promise();
  // check if error
  if (result.$response.error) throw result.$response.error;

  return updatedExample;
};

/**
 * Create
 */

export const createExampleService = async (params: { exampleCreateInputDto: ExampleCreateInputDto }): Promise<Example> => {
  // prepare data
  const exampleDefault = {
    status: 'ACTIVE',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  const example = { ...exampleDefault, ...params.exampleCreateInputDto } as Example;
  const putItemInput: DynamoDB.DocumentClient.PutItemInput = {
    TableName: TABLE_NAME,
    Item: example,
  };
  // execute
  const result = await dynamoClient.put(putItemInput).promise();
  // check if error
  if (result.$response.error) throw result.$response.error;

  return example;
};

/**
 * Delete
 */
export const deleteExampleService = async (params: { exampleDeleteInputDto: ExampleDeleteInputDto }): Promise<Example> => {
  const { id } = params.exampleDeleteInputDto;
  const formerExample = await getByIdExampleService({ exampleGetByIdInputDto: { id } });
  const deletedExample = ({ ...formerExample, ...{ status: 'REMOVED' } } as unknown) as ExampleUpdateInputDto;
  return updateExampleService({ exampleUpdateInputDto: deletedExample });
};
