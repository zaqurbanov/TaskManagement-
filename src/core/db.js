import { MongoClient, ServerApiVersion } from 'mongodb';
import env from './env.js';
import logger from '../Logger/logger.js';
const client = new MongoClient(env.MONGO_PATH, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        tlsAllowInvalidCertificates: true,
    }
});

export default async function run() {
    try {
        console.log("Mongo Connecting...");
        await client.connect();
        console.log("Mongo Connected Successfully!");
        // logger.infoLog("Mongo Db Connected")
    } catch (error) {
        console.error("Mongo Connection failed:", error);
        process.exit(1); 
    }
}
 