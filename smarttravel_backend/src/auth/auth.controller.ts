import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AdminRegisterDto } from './dto/admin-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin/login')
  login(@Body() dto: AdminLoginDto) {
    return this.authService.loginAdmin(dto);
  }

  @Get('me')
  me() {
    return { message: 'me endpoint placeholder' };
  }

  @Post('admin/register')
  register(@Body() dto: AdminRegisterDto) {
    return this.authService.registerAdmin(dto);
  }
}
