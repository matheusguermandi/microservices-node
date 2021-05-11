import { Request, Response } from 'express';
import fetch from 'node-fetch';

export default class CartController {

  public async findCart(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const cart = await fetch(`http://localhost:3334/cart/${id}`);

    const data = await cart.json();

    return response.json(data);
  }

  public async createCart(request: Request, response: Response): Promise<Response> {
    const { total_price, total_quantity, user_id } = request.body;
    const body = { total_price, total_quantity, user_id }

    const newCart = await fetch('http://localhost:3334/cart', {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await newCart.json();

    return response.json(data);
  }

  public async addProduct(request: Request, response: Response): Promise<Response> {
    const { price, quantity, product_id, cart } = request.body;

    const body = { price, quantity, product_id, cart }

    const newProduct = await fetch('http://localhost:3334/product', {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await newProduct.json();

    return response.json(data);
  }

  public async deleteProduct(request: Request, response: Response): Promise<Response> {
    const { id, cart } = request.params;

    const deleteProduct = await fetch(`http://localhost:3334/product/${cart}/${id}`, { method: 'delete' });

    const data = await deleteProduct.json();

    return response.json(data);
  }
}
