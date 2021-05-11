import Cart from '@modules/cart/infra/typeorm/entities/Cart';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('product_cart')
class ProductCart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  product_id: string;

  @ManyToOne(() => Cart, cart => cart.products)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ProductCart;
