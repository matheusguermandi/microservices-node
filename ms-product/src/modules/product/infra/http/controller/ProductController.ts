import { Request, Response } from 'express';
import Product from '../../mongoose/schemas/Product';

export default class DeliveriesController {
  public async list(request: Request, response: Response) {
    await Product.find((error, data) => {
      if (data.length) {
        return response.json(data).status(200);
      }
      return response.json([]).status(200);
    });
  }

  public async find(request: Request, response: Response) {
    const { id } = request.params;
    await Product.findById(id).then(data => {
      return response.json(data).status(200);
    }, error => {
      return response.status(400).json(error);
    })
  }

  public async create(request: Request, response: Response) {
    await Product.create(request.body).then(data => {
      return response.json(data).status(200);
    },
      error => {
        return response.status(400).json(error);
      },
    );
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    await Product.updateOne({ _id: id }, { $set: request.body }).then(data => {
      return response.json(data).status(200);
    },error => {
        return response.status(400).json(error);
      },
    );
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;
    await Product.deleteOne({ _id: id }).exec((error, data) => {
      if (error) {
        return response.status(400).json(error);
      }
      return response.status(200).json(data);
    });
  }

  public async deleteall(request: Request, response: Response) {
    await Product.deleteMany({}).exec((error, data) => {
      if (error) {
        return response.status(400).json(error);
      }
      return response.status(200).json(data);
    });
  }
}
