import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseManagerService {
  createdResponse(data: any) {
    return {
      status: 201,
      message: 'Record created successfully',
      data,
    };
  }
}
