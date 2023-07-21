import { CommonEntity } from "../../product/entities/common.entity";
import { Column, Entity } from "typeorm";


@Entity()
export class Member extends CommonEntity {

  @Column()
  public name: string;

  @Column()
  public password: string;

  @Column()
  public email: string;

  @Column()
  public image: string;
}