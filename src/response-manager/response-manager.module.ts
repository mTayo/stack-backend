import { Global, Module } from '@nestjs/common';
import { ResponseManagerService } from './response-manager.service';

@Global()
@Module({
  providers: [ResponseManagerService],
  exports: [ResponseManagerService],
})
export class ResponseManagerModule {}
