import mongoose from 'mongoose';

try {
  mongoose.connect('mongodb://localhost:27017/ms-product', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.Promise = global.Promise;
} catch (error) {
  console.log(error);
}

export default mongoose;
