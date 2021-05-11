import { Request, Response } from 'express';
import fetch from 'node-fetch';

export default class ProductController {
  public async list(request: Request, response: Response): Promise<Response> {
    const product = await fetch('http://localhost:3335/product/');

    const data = await product.json();

    return response.json(data);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const product = await fetch(`http://localhost:3335/product/${id}`);

    const data = await product.json();

    return response.json(data);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, price } = request.body;
    const body = { name, description, price }

    const newProduct = await fetch('http://localhost:3335/product', {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await newProduct.json();

    return response.json(data);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description, price } = request.body;

    const body = { name, description, price }

    const newProduct = await fetch(`http://localhost:3335/product/${id}`, {
      method: 'put',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await newProduct.json();

    return response.json(data);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = await fetch(`http://localhost:3335/product/${id}`, { method: 'delete' });

    const data = await deleteProduct.json();

    return response.json(data);
  }
}
