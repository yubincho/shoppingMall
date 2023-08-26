import { CommonEntity } from './common.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Brand } from '../../brand/entities/brand.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Entity()
export class Product extends CommonEntity {
  @Column()
  public title: string;

  @Column()
  public desc: string;

  @Column()
  public price: number;

  @ManyToOne(() => Brand, (brand: Brand) => brand.name)
  @JoinColumn()
  public brand: Brand;

  @OneToMany(() => Comment, (comment: Comment) => comment.product)
  public comments: Comment[];
}
