import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ResponseManagerService {
  createdResponse(data: any) {
    return {
      statusCode: 201,
      message: 'Record created successfully',
      data,
    };
  }
  retrieveRecordResponse(data: any) {
    return {
      status: HttpStatus.OK,
      message: 'Record retrieved successfully',
      data,
    };
  }
  forbiddenResponse(message: string) {
    throw new HttpException(message, HttpStatus.FORBIDDEN);
  }
}
