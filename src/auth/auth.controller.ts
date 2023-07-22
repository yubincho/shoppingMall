import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateMemberDto } from '../member/dto/create-member.dto';
import { LoginMemberDto } from '../member/dto/login-member.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async createUser(@Body() createMemberDto: CreateMemberDto) {
    return await this.authService.registerUser(createMemberDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async loginUser(@Req() req: any) {
    const user = req.user;
    user.password = undefined;
    return user;
  }
  // async loginUser(@Body() loginMemberDto: LoginMemberDto) {
  //   // return await this.authService.loggedInUser(loginMemberDto);
  // }
}
