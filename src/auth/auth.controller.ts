import {
  Controller,
  Post,
  Req,
  Body,
  Get,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Req() request) {
    const { email, password } = request.body;
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(user);
  }

  @Get('getUserByToken')
  @UseGuards(JwtAuthGuard)
  async getUserByToken(@Req() request) {
    const email = request.user.email;

    if (!email) {
      throw new UnauthorizedException('User not found');
    }

    const user = await this.authService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
