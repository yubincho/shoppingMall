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
  // async createUser(@Body() createMemberDto: CreateMemberDto) {
  async createUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return await this.authService.registerUser({ name, email, password }); // dto 형태가 아닌 인자로 받을때
  }

  @Post('send/email')
  async sendEmail(@Body('email') email: string) {
    return await this.authService.sendEmail(email);
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
