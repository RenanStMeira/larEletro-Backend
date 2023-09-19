import mongoose from "mongoose";

async function conecctDatabase() {
    mongoose.connect(process.env.DB_CONNECTION_STRING);

    return mongoose.connection;
    
};

export default conecctDatabase;