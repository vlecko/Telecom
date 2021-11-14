import { db, ObjectID } from '../db.mjs';

export default async function getBreeds(req, res) {
  const breeds = await db.collection('breeds');
  const results = await breeds.find().toArray();
  return res.json(results);
};
