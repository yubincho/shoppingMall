import { CommonEntity } from '../../product/entities/common.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Entity()
export class Member extends CommonEntity {
  @Column()
  public name: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async beforeFunction(): Promise<void> {
    try {
      const saltValue = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, saltValue);
      this.password = hashedPassword;
    } catch (err) {
      console.log(err.message);
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(userPassword: string): Promise<boolean> {
    try {
      const isMatchedPassword = await bcrypt.compare(
        userPassword,
        this.password,
      );
      return isMatchedPassword;
    } catch (err) {
      console.log(err.message);
      throw new InternalServerErrorException();
    }
  }
}
