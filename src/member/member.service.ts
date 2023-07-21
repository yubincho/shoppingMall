import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MemberController } from "./member.controller";
import { Member } from "./entities/member.entity";
import { Repository } from "typeorm";
import { CreateMemberDto } from "./dto/create-member.dto";

@Injectable()
export class MemberService {

  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>
  ) {}

  async getAllMembers() {
    const members = await this.memberRepository.find()
    return members
  }

  async registerMember(createMemberDto: CreateMemberDto): Promise<Member> {
    const { email } = createMemberDto;
    const existingMember = await this.memberRepository.findOne({ where: { email } })

    if (existingMember) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const newMember: Member = this.memberRepository.create(createMemberDto);
    return this.memberRepository.save(newMember);
  }

  async loginMember(email: string, password: string) {
    const member = await this.memberRepository.findOne({ where: { email, password } });

    if (!member) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return member;
  }





}