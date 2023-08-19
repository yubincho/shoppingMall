import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from '../../product/entities/common.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Brand extends CommonEntity {
  @Column()
  public name: string;

  @Column()
  public desc: string;

  @Column()
  public brandImg: string;

  @OneToMany(() => Product, (product: Product) => product.brand)
  public products: Product[];
}
