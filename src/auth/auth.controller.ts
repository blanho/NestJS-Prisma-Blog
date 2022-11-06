import {
  Controller,
  Request,
  Body,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  profile(@Request() req) {
    return req.user;
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req) {
    return this.authService.login(req.user);
  }
}
