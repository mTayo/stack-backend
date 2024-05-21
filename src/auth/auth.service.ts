import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { ResponseManagerService } from 'src/response-manager/response-manager.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private response: ResponseManagerService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      delete user.hash;
      return this.response.createdResponse(user);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return this.response.forbiddenResponse('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signIn(dto: AuthDto) {
    try {
      const findUser = await this.prisma.user.findFirst({
        where: {
          email: dto.email,
        },
      });

      if (!findUser) {
        return this.response.forbiddenResponse('Invalid credentials');
      }
      const hashMatch = await argon.verify(findUser.hash, dto.password);
      if (!hashMatch) {
        return this.response.forbiddenResponse('Invalid credentials');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      //   const { hash, ...rest } = findUser;
      delete findUser.hash;
      const payload = {
        ...findUser,
        access_token: await this.jwtService.signAsync(findUser),
      };
      return this.response.retrieveRecordResponse(payload);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return this.response.forbiddenResponse('Credentials taken');
        }
      }
      throw error;
    }
  }
}
