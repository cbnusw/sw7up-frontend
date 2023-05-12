export interface ISw7UpPages {
  HOME?: {
    ROOT?: string;
  };
  ORGANIZATION?: {
    ROOT?: string;
    GREETINGS?: string;
    OBJECTIVE?: string;
    VISION?: string;
    FACILITY?: string;
    MEMBER?: string;
    LOCATION?: string;
  };
  GUARDIAN?: {
    ROOT?: string;
    ONE2ONE?: string;
  };
  EDUCATION?: {
    ROOT?: string;
    BASIC?: string;
    MAJOR?: string;
    STEP_UP?: string;
    CONVERGENCE?: string;
    ONLINE?: string;
    OSS?: string;
    EASY?: string;
    MILEAGE?: string;
  };
  COOPERATE?: {
    ROOT?: string;
    PROJECT?: string;
    INTERNSHIP?: string;
    FAMILY_COMPANY?: string;
    IMMERSION_EDUCATION?: string;
    INTERNSHIP_E_BOOK?: string;
    GUARDIAN?: string;
    STARTUP?: string;
  };
  VALUE?: {
    ROOT?: string;
    SPREAD?: string;
    VOLUNTEER?: string;
  };
  COMMUNITY?: {
    ROOT?: string;
    NOTICE?: string;
    E_HELP?: string;
    PRESS?: string;
    NEWSLETTER?: string;
    GALLERY?: string;
    ARCHIVE?: string;
    OVERSEAS?: string;
    STUDENT_ACTIVITY?: string;
  };
  MY_PAGE?: {
    ROOT?: string;
    INFO?: string;
    PASSWORD?: string;
  };
  POLICY?: {
    ROOT?: string;
    PRIVACY?: string;
    SITEMAP?: string;
    CLEAN?: string;
  };
  ACCOUNT?: {
    ROOT?: string;
    LOGIN?: string;
    JOIN?: string;
    FIND?: string;
    PASSWORD?: string;
  };
}

export const PAGE_GROUPS = {
  HOME: 'home',
  ORGANIZATION: 'organization',
  GUARDIAN: 'guardian',
  EDUCATION: 'education',
  COOPERATE: 'cooperate',
  VALUE: 'value',
  COMMUNITY: 'community',
  MY_PAGE: 'my-page',
  POLICY: 'policy',
  ACCOUNT: 'account',
};

export const PAGE_NAMES: ISw7UpPages = {
  ORGANIZATION: {
    GREETINGS: 'greetings',
    OBJECTIVE: 'objective',
    VISION: 'vision',
    FACILITY: 'facility',
    MEMBER: 'member',
    LOCATION: 'location',
  },
  GUARDIAN: {
    ONE2ONE: '1to1',
  },
  EDUCATION: {
    BASIC: 'basic',
    MAJOR: 'major',
    STEP_UP: 'step-up',
    CONVERGENCE: 'convergence',
    ONLINE: 'online',
    OSS: 'oss',
    EASY: 'easy',
    MILEAGE: 'mileage',
  },
  COOPERATE: {
    PROJECT: 'project',
    INTERNSHIP: 'internship',
    FAMILY_COMPANY: 'family-company',
    IMMERSION_EDUCATION: 'immersion-education',
    INTERNSHIP_E_BOOK: 'internship/e-book',
    GUARDIAN: 'guardian',
    STARTUP: 'startup',
  },
  VALUE: {
    SPREAD: 'spread',
    VOLUNTEER: 'volunteer',
  },
  COMMUNITY: {
    NOTICE: 'notice',
    E_HELP: 'e-help',
    PRESS: 'press',
    NEWSLETTER: 'newsletter',
    GALLERY: 'gallery',
    ARCHIVE: 'archive',
    OVERSEAS: 'overseas',
    STUDENT_ACTIVITY: 'student-activity'
  },
  MY_PAGE: {
    INFO: 'info',
    PASSWORD: 'password',
  },
  POLICY: {
    PRIVACY: 'privacy',
    SITEMAP: 'sitemap',
    CLEAN: 'clean',
  },
  ACCOUNT: {
    LOGIN: 'login',
    JOIN: 'join',
    FIND: 'find',
    PASSWORD: 'password',
  },
};

export const URLS: ISw7UpPages = Object.keys(PAGE_NAMES).reduce((urls, key) => {
  urls[key] = Object.keys(PAGE_NAMES[key]).reduce((subs, subKey) => {
    subs[subKey] = `/${PAGE_GROUPS[key]}/${PAGE_NAMES[key][subKey]}`;
    return subs;
  }, { ROOT: `/${PAGE_GROUPS[key]}` });
  return urls;
}, { HOME: { ROOT: '/home' } });
