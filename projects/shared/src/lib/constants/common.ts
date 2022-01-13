export const NOT_OPERATOR_ROLES = [
  'staff',    // 교직원(충북대 소속원만)
  'student',  // 학생(충북대 소속원만)
  'member',   // 일반인(충북대 소속이 아닌 회원)
];

export const ACCESS = [
  'operator', // 운영자
  ...NOT_OPERATOR_ROLES,
  'nonmember',
];

export const ROLES = [
  'admin',
  'operator',
  ...NOT_OPERATOR_ROLES,
];

export const PERMISSIONS = [
  'judge',
  'qna',
];

export const FILE_TYPES = [
  'UserInfo',
  'CorruptionReport',
  'Gallery',
  'Notice',
  'PressRelease',
  'Resource',
];

export const CENTERS = [
  '사업지원팀',
  'SW전공교육센터',
  'SW기초교육센터',
  'SW융합교육센터',
  'SW산학협력센터',
  '오픈소스SW센터',
];

export const QNA_CATEGORIES = [
  '기초컴퓨터프로그래밍',
  '정보기술프로그래밍',
  '정보기술의 이해',
  '파이썬 프로그래밍',
  'IoT기술과 프로그래밍',
  '인공지능과 기계학습',
  '빅데이터 이해와 분석',
  '자료구조와 문제해결기법',
  'Java 프로그래밍 기초',
  '운영체제의 이해',
  '웹 응용 프로그래밍',
  '2022 예비대학'
];
