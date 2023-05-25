import { IProfessor } from './professor';

export interface IStudent {
  _id?: string;
  no?: string;
  name?: string;
  department?: string;
  professor?: string | IProfessor;
}
