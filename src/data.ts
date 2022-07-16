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

data.reports.push({
  id: '1',
  source: 'salary',
  amount: 62300,
  createdAt: new Date(),
  updatedAt: new Date(),
  type: ReportType.INCOME,
});
data.reports.push({
  id: '2',
  source: 'Mubashir',
  amount: 5000,
  createdAt: new Date(),
  updatedAt: new Date(),
  type: ReportType.INCOME,
});
data.reports.push({
  id: '3',
  source: 'Vehicle Loan',
  amount: 26500,
  createdAt: new Date(),
  updatedAt: new Date(),
  type: ReportType.EXPENSE,
});
