import { ExampleStatusEnum } from './example_status_enum';

export interface Example extends ExampleStatusEnum {
  id: string;
  name: string;
  updatedAt: number;
  createdAt: number;
}
