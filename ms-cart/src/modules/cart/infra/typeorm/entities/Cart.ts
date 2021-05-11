import ProductCart from '@modules/productCart/infra/typeorm/entities/ProductCart';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('cart')
class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  total_price: number;

  @Column()
  total_quantity: number;

  @Column()
  user_id: string;

  @OneToMany(() => ProductCart, product_cart => product_cart.cart, { eager: true })
  products: ProductCart[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Cart;
