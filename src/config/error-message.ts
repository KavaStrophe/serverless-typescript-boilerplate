export const buildErrorMessageDuplicate = (params: { entityName: string; id: string }): string => {
  return `${params.entityName} ${params.id} already existing`;
};
export const buildErrorMessageNotFound = (params: { entityName: string; id: string }): string => {
  return `cannot find the ${params.entityName} with id ${params.id}`;
};
