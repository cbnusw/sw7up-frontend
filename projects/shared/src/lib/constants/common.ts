export const OPERATOR_ROLES = [
  'admin',
  'operator',
];
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
  ...OPERATOR_ROLES,
  ...NOT_OPERATOR_ROLES,
];

export const PERMISSIONS = [
  'judge',
  'qna',
];

export const FILE_TYPES = [
  'CorruptionReport',
  'Gallery',
  'Notice',
  'OverseasEducation',
  'PressRelease',
  'Resource',
  'StudentActivity',
  'UserInfo',
];

export const UNIVERSITIES = [
  '충북대학교',
  '한국교통대학교',
  '건국대학교',
  '서원대학교',
  '청주대학교',
  '공군사관학교',
  '우석대학교',
  '중원대학교',
  '세명대학교'
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
  '입학전 SW 기초교육'
];

export const MAJORS = [
  '컴퓨터공학과',
  '소프트웨어학과',
  '소프트웨어학부',
  '정보통신공학부',
  '지능로봇공학과'
];
