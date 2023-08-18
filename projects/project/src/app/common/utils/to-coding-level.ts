import { CodingGrade, CodingLevel, ProjectCodes } from '../../types';

export const moreThan = (n: number, projects: ProjectCodes[]): number => {
  return projects.reduce((acc, cur) => cur.codes >= n ? acc + 1 : acc, 0);
};

export const between = (under: number, upper: number, projects: ProjectCodes[]): number => {
  return projects.reduce((acc, cur) => under <= cur.codes && cur.codes < upper ? acc + 1 : acc, 0);
};

export const toCodingLevel = (projects: ProjectCodes[]): CodingLevel => {
  const totalCodes = projects.reduce((acc, cur) => acc + cur.codes, 0);
  const moreThan500 = moreThan(500, projects);
  const between500And1000 = between(500, 1000, projects);
  const moreThan1000 = moreThan(1000, projects);

  let grade: CodingGrade;
  let level: number;
  let currentCodes: number;
  let nextCodes: number;

  if (totalCodes >= 8500 && moreThan1000 >= 2 && (between500And1000 > 0 ? moreThan1000 >= 2 : moreThan1000 >= 3)) {
    grade = CodingGrade.DIAMOND;
    level = Math.min(Math.floor((totalCodes - 8500) / 700) + 1, 10);
    currentCodes = totalCodes - 8500 - (level - 1) * 700;
    nextCodes = 700;
  } else if (totalCodes >= 3500 && moreThan500 >= 1) {
    grade = CodingGrade.PLATINUM;
    level = Math.min(Math.floor((totalCodes - 3500) / 500) + 1, 10);
    currentCodes = totalCodes - 3500 - (level - 1) * 500;
    nextCodes = 500;
  } else if (totalCodes >= 1500) {
    grade = CodingGrade.GOLD;
    level = Math.min(Math.floor((totalCodes - 1500) / 200) + 1, 10);
    currentCodes = totalCodes - 1500 - (level - 1) * 200;
    nextCodes = 200;
  } else if (totalCodes >= 500) {
    grade = CodingGrade.SILVER;
    level = Math.min(Math.floor((totalCodes - 500) / 100) + 1, 10);
    currentCodes = totalCodes - 500 - (level - 1) * 100;
    nextCodes = 100;
  } else {
    grade = CodingGrade.BRONZE;
    level = Math.min(Math.floor(totalCodes / 50) + 1, 10);
    currentCodes = totalCodes - (level - 1) * 50;
    nextCodes = 50;
  }

  return { grade, level, currentCodes, nextCodes, projects };
};
