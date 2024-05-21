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
  updatedResponse(data: any) {
    return {
      statusCode: 200,
      message: 'Record updated successfully',
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
  notFoundResponse(message: string) {
    throw new HttpException(message, HttpStatus.NOT_FOUND);
  }
  conflictResponse(message: string) {
    throw new HttpException(message, HttpStatus.CONFLICT);
  }
}
