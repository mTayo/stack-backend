// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }

  @Post('signin')
  signIn() {
    return { msg: 'I have signed in' };
  }
}
