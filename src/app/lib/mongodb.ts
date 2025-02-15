import mongoose from 'mongoose';

declare global {
  var mongoose: mongoose.Connection;
}


let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  const mongoUri = process.env.MONGO_URI;

  
  if (!mongoUri) {
    throw new Error('MongoDB connection URI is not defined in environment variables.');
  }

  if (!cached.promise) {
    cached.promise = new Promise((resolve, reject) => {
      mongoose.connect(mongoUri, {
       
      })
      .then((mongooseInstance) => resolve(mongooseInstance))
      .catch((err) => reject(err));
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Database connection failed');
  }
}

export default dbConnect;
