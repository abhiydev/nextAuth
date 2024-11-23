import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("mongoDB connected succesfully");
    });
  } catch (error) {
    console.log("Something went wrong while connecting to DB");
    console.log(error);
  }
}
