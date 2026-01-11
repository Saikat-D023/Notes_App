import mongoose from 'mongoose';

let isConnected = false;

async function connectToDB() {
    if (isConnected && mongoose.connection.readyState === 1) {
        console.log("MongoDb already connected")
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URL)
        isConnected = mongoose.connection.readyState === 1
        console.log("connected to DB")
    } catch (error) {
        console.error("Failed to connect to mongoDB", error)
        isConnected = false;
        throw error
    }
}

export default connectToDB;