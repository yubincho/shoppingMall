import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateMemberDto } from '../member/dto/create-member.dto';
import { LoginMemberDto } from '../member/dto/login-member.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUserInterface } from './interfaces/requestWithUser.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async createUser(@Body() createMemberDto: CreateMemberDto) {
    return await this.authService.registerUser(createMemberDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async loginUser(@Req() req: RequestWithUserInterface) {
    const user = req.user;
    const token = await this.authService.generateAccessToken(user.id);
    user.password = undefined;
    return { user, token };
  }
  // async loginUser(@Body() loginMemberDto: LoginMemberDto) {
  //   // return await this.authService.loggedInUser(loginMemberDto);
  // }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserInfo(@Req() req: RequestWithUserInterface) {
    return req.user;
  }
}
