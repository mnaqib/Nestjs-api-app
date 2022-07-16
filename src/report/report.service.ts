import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ReportType, data } from '../data';
import { ReportResponseDto } from '../dtos/report.dto';

interface ReportData {
  amount: number;
  source: string;
}

interface UpdateReportData {
  amount?: number;
  source?: string;
}

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.reports
      .filter((report) => report.type === type)
      .map((report) => new ReportResponseDto(report));
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    const report = data.reports.find(
      (report) => report.type === type && report.id === id,
    );

    if (!report) return;

    return new ReportResponseDto(report);
  }

  createReport(type: ReportType, body: ReportData): ReportResponseDto {
    const newReport = {
      ...body,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      type,
    };

    data.reports.push(newReport);
    return new ReportResponseDto(newReport);
  }

  updateReport(
    type: ReportType,
    id: string,
    body: UpdateReportData,
  ): ReportResponseDto {
    const report = data.reports.findIndex(
      (report) => report.type === type && report.id === id,
    );

    if (report === -1) return;

    data.reports[report] = {
      ...data.reports[report],
      ...body,
      updatedAt: new Date(),
    };
    return new ReportResponseDto(data.reports[report]);
  }

  deleteReport(id: string) {
    const report = data.reports.findIndex((report) => report.id === id);

    if (report === -1) return;

    data.reports.splice(report, 1);
  }
}
