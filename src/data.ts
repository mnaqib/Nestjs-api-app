export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface Report {
  id: string;
  source: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  type: ReportType;
}

interface Data {
  reports: Report[];
}

export const data: Data = {
  reports: [],
};
