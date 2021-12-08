import { IMenuItem } from '../../../types/menu-item';

export const menus: IMenuItem[] = [
  {
    title: '전체 프로젝트',
    link: '/projects'
  },
  {
    title: '프로젝트 관리',
    subMenuItems: [
      {
        title: '로컬 프로젝트',
        link: '/pm/local'
      },
      {
        title: '공개 프로젝트',
        link: '/pm/public'
      }
    ]
  },
  {
    title: '계정관리',
    subMenuItems: [
      {
        title: 'GitHub 계정 관리',
        link: '/account/github'
      }
    ]
  }
];
