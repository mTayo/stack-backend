// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('signup')
  signup() {
    return { msg: 'I have signed up' };
  }
}
