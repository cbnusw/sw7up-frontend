const makeOptional = (regex: RegExp): RegExp => {
  const source = regex.source.replace(/^\^/, '').replace(/\$$/, '');
  return new RegExp('^(|' + source + ')$', regex.flags);
};

const mergePattern = (...regexList: Array<RegExp>): RegExp => {
  const flags = regexList.map(regex => regex.flags).sort().join('');
  return new RegExp('^(' +
    regexList.map(regex => regex.source.replace(/^\^/, '').replace(/\$$/, '')).join('|') +
    ')$', flags);
};

export const EMAIL_PATTERN = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
export const MOBILE_NUM_PATTERN: RegExp = /^01([016789])-?([1-9]\d{2,3})-?(\d{4})$/;
export const REGISTRATION_NUM_PATTERN: RegExp = /^\d{10}$/;
export const TEL_NUM_PATTERN: RegExp = /^(((02|0[3-7]\d)-?[1-9]\d{2,3}-?\d{4})|([1-9]\d{3}-?\d{4}))$/;
export const CONTACT_NUM_PATTERN: RegExp = mergePattern(MOBILE_NUM_PATTERN, TEL_NUM_PATTERN);
export const USER_ID_PATTERN = /^[0-9a-zA-Z]{3,}$/;
export const HTTP_URL_PATTERN = /^https?:\/\/.+$/;
export const OPTIONAL_CONTACT_NUM_PATTERN = makeOptional(CONTACT_NUM_PATTERN);
export const OPTIONAL_EMAIL_PATTERN = makeOptional(EMAIL_PATTERN);
export const OPTIONAL_MOBILE_NUM_PATTERN = makeOptional(MOBILE_NUM_PATTERN);
export const OPTIONAL_REGISTRATION_NUM_PATTERN = makeOptional(REGISTRATION_NUM_PATTERN);
export const OPTIONAL_TEL_NUM_PATTERN = makeOptional(TEL_NUM_PATTERN);
export const OPTIONAL_HTTP_URL_PATTERN = makeOptional(HTTP_URL_PATTERN);
