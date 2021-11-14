import axios from 'axios';
import { db, ObjectID } from './db.mjs';

export default async function createCollections() {
  const d = await Promise.all(
    Array.from({ length: 100 }).map(async () => {
      const { data } = await axios.get('https://dog.ceo/api/breeds/image/random');
      return data;
    }),
  );

  const dogs = [];
  const breeds = [];
  const breedToId = {};

  d.forEach((dog) => {
    const url = new URL(dog.message);
    const [, , breed, filename] = url.pathname.split('/');
    const [title] = filename.split('.');
    const breedId = new ObjectID().toHexString();

    if (!breedToId.hasOwnProperty(breed)) {
      breedToId[breed] = breedId;
    }

    breeds.push({
      _id: breedId,
      title: breed,
    });

    dogs.push({
      _id: new ObjectID().toHexString(),
      breed: breedToId[breed],
      image: dog.message,
      title,
    });

  });
  await db.collection('breeds').insertMany(breeds);
  await db.collection('dogs').insertMany(dogs);
}