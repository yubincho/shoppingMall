import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateMemberDto } from '../member/dto/create-member.dto';
import { LoginMemberDto } from '../member/dto/login-member.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async createUser(@Body() createMemberDto: CreateMemberDto) {
    return await this.authService.registerUser(createMemberDto);
  }

  @Post('login')
  async loginUser(@Body() loginMemberDto: LoginMemberDto) {
    return await this.authService.loggedInUser(loginMemberDto);
  }
}
