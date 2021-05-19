import { IAddress } from './address';
import { IGeometry } from './geometry';

export interface IOrganization {
  _id?: string;
  name?: string;
  serviceName?: string;
  regNumber?: string;
  email?: string;
  tel?: string;
  address?: IAddress;
  location?: IGeometry;
}
