import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ReportResponseDto } from './dtos/report.dto';

export class CustomInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<ReportResponseDto>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        const response = {
          ...data,
          created_at: data.transformCreatedAt(),
        };
        delete response.updatedAt;
        delete response.createdAt;
        return response;
      }),
    );
  }
}
