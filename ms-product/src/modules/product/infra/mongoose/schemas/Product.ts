import mongoose from 'mongoose';

const ProductShema = new mongoose.Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  price: { type: Number, default: '' }
});

const Product = mongoose.model('Product', ProductShema);

export default Product;
