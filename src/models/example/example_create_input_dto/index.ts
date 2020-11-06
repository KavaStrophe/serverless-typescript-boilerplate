import { ExampleStatusEnum } from '../example_status_enum';

export interface ExampleCreateInputDto extends ExampleStatusEnum {
  id: string;
  name: string;
  // Props createdAt & updatedAt are defined by the system on service layer
}
