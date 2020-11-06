/* eslint-disable import/no-extraneous-dependencies */
import { DynamoDB } from 'aws-sdk';
import { Example } from '../../../models/example';

export const updateItemInputBuilder = (params: { object: Example; idsPropNames: string[] | null }): DynamoDB.DocumentClient.AttributeUpdates => {
  const updateItemInputObject = {};
  const idsPropNames = params.idsPropNames || new Array<string>();

  Object.entries(params.object).forEach(([propName, propValue]) => {
    if (!idsPropNames.includes(propName)) {
      updateItemInputObject[propName] = {
        Action: 'PUT',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        Value: propValue,
      };
    }
  });

  return updateItemInputObject;
};
