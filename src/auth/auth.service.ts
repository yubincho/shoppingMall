import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MemberService } from '../member/member.service';
import { CreateMemberDto } from '../member/dto/create-member.dto';
import { LoginMemberDto } from '../member/dto/login-member.dto';

@Injectable()
export class AuthService {
  constructor(private readonly memberService: MemberService) {}

  async registerUser(createMemberDto: CreateMemberDto) {
    const newUser = await this.memberService.registerMember(createMemberDto);
    newUser.password = undefined;
    return newUser;
  }

  async loggedInUser(loginMemberDto: LoginMemberDto) {
    const user = await this.memberService.getUserByEmail(loginMemberDto.email);
    // if (user.password !== loginMemberDto.password) {
    //   throw new HttpException('Password do not match', HttpStatus.CONFLICT);
    // }
    const isMatchedPassword = await user.checkPassword(loginMemberDto.password);
    if (!isMatchedPassword) {
      throw new HttpException('Password do not match', HttpStatus.CONFLICT);
    }

    return user;
  }
}
