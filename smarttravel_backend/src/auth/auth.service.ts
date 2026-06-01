import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AdminRegisterDto } from './dto/admin-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async loginAdmin(dto: AdminLoginDto) {
    const user = await this.prisma.administrator.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await argon2.verify(user.passwordHash, dto.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async registerAdmin(dto: AdminRegisterDto) {
    if (dto.setupKey !== process.env.ADMIN_SETUP_KEY) {
      throw new UnauthorizedException('Invalid setup key');
    }

    const existingUser = await this.prisma.administrator.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const passwordHash = await argon2.hash(dto.password);

    const user = await this.prisma.administrator.create({
      data: {
        email: dto.email,
        passwordHash,
        role: 'ADMIN',
      },
    });

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
