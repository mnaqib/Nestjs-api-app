import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
  HttpCode,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';

import { ReportService } from './report.service';
import { ReportType } from '../data';
import {
  createReportDto,
  ReportResponseDto,
  UpdateReportDto,
} from '../dtos/report.dto';

@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  private reportType = (type: string) => {
    return type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
  };

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto[] {
    return this.reportService.getAllReports(this.reportType(type));
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    return this.reportService.getReportById(this.reportType(type), id);
  }

  @HttpCode(201)
  @Post()
  createReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Body() { amount, source }: createReportDto,
  ): ReportResponseDto {
    return this.reportService.createReport(this.reportType(type), {
      amount,
      source,
    });
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() { amount, source }: UpdateReportDto,
  ): ReportResponseDto {
    return this.reportService.updateReport(this.reportType(type), id, {
      amount,
      source,
    });
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    this.reportService.deleteReport(id);
  }
}
