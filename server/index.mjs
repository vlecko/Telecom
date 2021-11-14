import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { db } from './db.mjs';

import router from './routers/index.mjs';
import createCollections from './createCollections.mjs'

dotenv.config();

const PORT = process.env.PORT || 7000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);

async function start() {
  const breeds = await db.collection('breeds').countDocuments();
  const dogs = await db.collection('dogs').countDocuments();

  if (!breeds && !dogs) {
    createCollections();
  }
}

app.listen(PORT, () => {
  console.log('Server started');
  start();
});
