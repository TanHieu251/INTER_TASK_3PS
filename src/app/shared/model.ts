export interface PositionModel {
  PositionID: string;
  PositionName: string;
  DepartmentName: string;
  CompetenceID: string;
  CompetenceName: string;
  CategoryName: string;
  DepartmentID: string;
  CategoryID: string;
  Category: number;
  Department: number;
  Code: number;
  Framework: number;
  Competence: number;
  Position: number;
  CompetenceLevel: number | null;
  CompetenceLevelMax: number | null;
  CreateBy: string;
  CreateTime: string;
  LastModifiedBy: string | null;
  LastModifiedTime: string | null;
}
