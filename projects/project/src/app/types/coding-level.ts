export interface ProjectCodes {
  _id: string;
  codes: number;
}

export enum CodingGrade {
  BRONZE = 'Bronze',
  SILVER = 'Silver',
  GOLD = 'Gold',
  PLATINUM = 'Platinum',
  DIAMOND = 'Diamond',
}

export interface CodingLevel {
  grade: CodingGrade;
  level: number;
  currentCodes: number;
  nextCodes: number;
  projects: ProjectCodes[];
}
