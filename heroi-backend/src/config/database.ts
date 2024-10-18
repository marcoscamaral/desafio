import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL!;

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
