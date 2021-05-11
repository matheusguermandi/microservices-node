import Cart from "@modules/cart/infra/typeorm/entities/Cart";

export default interface IProductCartDTO {
  id?: string;
  price: number;
  quantity: number;
  product_id: string;
  cart: Cart;
}
