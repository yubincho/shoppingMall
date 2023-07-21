import { Body, Controller, Get, HttpException, HttpStatus, Injectable, Post } from "@nestjs/common";
import { MemberService } from "./member.service";
import { CreateMemberDto } from "./dto/create-member.dto";
import { Member } from "./entities/member.entity";

@Controller('member')
export class MemberController {

  constructor(
    private readonly memberService: MemberService
  ) {}

  @Get('all')
  async memberGetAll() {
    const members = await this.memberService.getAllMembers()
    return {count: members.length, members}
  }

  @Post('register')
  async registerMember(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.registerMember(createMemberDto)
  }

  @Post('login')
  async loginMember(@Body() loginData: { email: string; password: string }): Promise<Member> {
    const { email, password } = loginData;

    try {
      return await this.memberService.loginMember(email, password);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }



}