/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('myprofile')
  getLoginProfileDetails(@GetUser() user: User) {
    return { msg: user };
  }
}
