import { Injectable } from '@nestjs/common';

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
      statusCode: 200,
      message: 'Record retrieved successfully',
      data,
    };
  }
  forbiddenResponse(message: string) {
    return {
      statusCode: 403,
      message,
    };
  }
}
