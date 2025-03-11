import mongoose from "mongoose";

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.log("Error connecting to the database", error);
  }
}

export { connectDatabase };
