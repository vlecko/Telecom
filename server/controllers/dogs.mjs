import { db, ObjectID } from '../db.mjs';

const dogs = await db.collection('dogs');

export async function getDogs(req, res) {
  const { page } = await req.params
  const results = await dogs.find().skip(Number(page) * 10).limit(10).toArray();
  return res.json(results);
};

export async function getDogsId(req, res, next) {
  const { id } = req.params;
  const results = await dogs.find({ breed: id }).toArray();
  return res.json(results);
};

export async function getDogsTitle(req, res) {
  const { title } = req.params;
  const results = await dogs.findOne({ title: title });
  return res.json(results);
};