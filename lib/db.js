import mongoose from 'mongoose';

let isConnected = false;

async function connectToDB() {

    if (isConnected) {
        console.log("MongoDb already connected")
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URL)
        isConnected = db.connections[0].readyState === 1
        console.log("connected to DB")
    } catch (error) {
        console.error("Failed to connect to mongoDB", error)
        throw error
    }
}

export default connectToDB;