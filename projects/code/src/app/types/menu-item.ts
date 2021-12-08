export interface IMenuItem {
  title: string;
  icon?: string;
  link?: string;
  subMenuItems?: IMenuItem[];
}
