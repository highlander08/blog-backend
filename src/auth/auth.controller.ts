import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UserLoginDto } from './user-login.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async userLogin(@Body() userLoginDto: UserLoginDto, @Res() res: Response) {
    const { token, user } = await this.authService.login(userLoginDto);
    res.cookie('IsAuthenticated', true, { maxAge: 2 * 60 * 60 * 1000 });
    res.cookie('Authentication', token, {
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.send({ success: true, user });
  }

  @Post('register')
  async userRegistration(@Body() userCreateDto: CreateUserDto) {
    return this.authService.register(userCreateDto);
  }
}
