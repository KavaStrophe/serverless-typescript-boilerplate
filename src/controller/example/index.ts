// eslint-disable-next-line import/no-extraneous-dependencies
import { Example } from '../../models/example';
import { ExampleCreateInputDto } from '../../models/example/example_create_input_dto';
import { ExampleDeleteInputDto } from '../../models/example/example_delete_input_dto';
import { ExampleGetByIdInputDto } from '../../models/example/example_get_by_id_input_dto';
import { ExampleUpdateInputDto } from '../../models/example/example_update_input_dto';
import { createExampleService, deleteExampleService, getByIdExampleService, updateExampleService } from '../../services/example';

/**
 * Create
 */
export const createExampleController = (params: { exampleCreateInputDto: ExampleCreateInputDto }): Promise<Example> => {
  return createExampleService({ exampleCreateInputDto: params.exampleCreateInputDto });
};

/**
 * GetById
 */
export const getByIdExampleController = (params: { exampleGetByIdInputDto: ExampleGetByIdInputDto }): Promise<Example> => {
  return getByIdExampleService({ exampleGetByIdInputDto: params.exampleGetByIdInputDto });
};

/**
 * update
 */

export const updateExampleController = (params: { exampleUpdateInputDto: ExampleUpdateInputDto }): Promise<Example> => {
  return updateExampleService({ exampleUpdateInputDto: params.exampleUpdateInputDto });
};

/**
 * delete
 */

export const deleteExampleController = (params: { exampleDeleteInputDto: ExampleDeleteInputDto }): Promise<Example> => {
  return deleteExampleService({ exampleDeleteInputDto: params.exampleDeleteInputDto });
};
