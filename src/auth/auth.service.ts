import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { ResponseManagerService } from 'src/response-manager/response-manager.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private response: ResponseManagerService,
  ) {}

  async signUp(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });
    console.log(user, 'bang');
    delete user.hash;
    return this.response.createdResponse(user);
  }
}
