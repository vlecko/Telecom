import * as Mongo from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new Mongo.MongoClient(process.env.DB_PORT);

await client.connect();

export const db = client.db('telecom');

export const ObjectID = Mongo.ObjectID;
