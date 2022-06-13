const errors = {
  // 400 Errors
  EMAIL_USED: '',
  FILE_NOT_UPLOADED: '',
  INVALID_NEWSLETTER_FILE: '',
  INVALID_OTP: '',
  INVALID_PASSWORD: '',
  INVALID_ROLE: '',
  NEWSLETTER_FILE_REQUIRED: '',
  PASSWORD_REQUIRED: '',
  PHONE_NUMBER_USED: '',
  REG_NUMBER_REQUIRED: '',
  REG_NUMBER_USED: '',
  USER_DELETED: '',
  USER_DEPARTMENT_REQUIRED: '',
  USER_EMAIL_REQUIRED: '',
  USER_INFO_NOT_MATCHED: '',
  USER_INFO_REQUIRED: '',
  USER_NAME_REQUIRED: '',
  USER_NOT_DELETED: '',
  USER_PHONE_REQUIRED: '',
  USER_UNIVERSITY_REQUIRED: '',
  WRITER_INFO_REQUIRED: '',
  YEAR_MONTH_REQUIRED: '',

  // 401 Errors
  ACCESS_TOKEN_EXPIRED: '',
  ACCESS_TOKEN_REQUIRED: '',
  INVALID_ACCESS_TOKEN: '',
  INVALID_REFRESH_TOKEN: '',
  LOGIN_REQUIRED: '',
  REFRESH_TOKEN_EXPIRED: '',
  USER_ACCOUNT_DELETED: '',
  TOKEN_REQUIRED: '',

  // 403 Errors
  FORBIDDEN: '',

  // 404 Errors
  CORRUPTION_REPORT_NOT_FOUND: '',
  FILE_NOT_FOUND: '',
  GALLERY_NOT_FOUND: '',
  NOT_FOUND: '',
  NOTICE_NOT_FOUND: '',
  PRESS_RELEASE_NOT_FOUND: '',
  QNA_NOT_FOUND: '',
  REPLY_NOT_FOUND: '',
  RESOURCE_NOT_FOUND: '',
  USER_EMAIL_NOT_FOUND: '',
  USER_INFO_NOT_FOUND: '',
  USER_NOT_FOUND: '',

  // 500 Errors
  SERVER_ERROR: '',
};

Object.keys(errors).forEach(key => errors[key] = key);

export const ERROR_CODES = errors;
