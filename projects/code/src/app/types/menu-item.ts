import { TUserRole } from 'shared';

export interface IMenuItem {
  title: string;
  icon?: string;
  link?: string;
  roles?: TUserRole[];
  subMenuItems?: IMenuItem[];
}
