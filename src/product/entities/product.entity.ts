import { CommonEntity } from './common.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Brand } from '../../brand/entities/brand.entity';

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
}
