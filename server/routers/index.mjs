import Router from 'express';

import { getDogs, getDogsId, getDogsTitle } from '../controllers/dogs.mjs';
import getBreeds from '../controllers/breeds.mjs';

const router = new Router();

router.get('/', getBreeds);
router.get('/dogs/:id', getDogsId);
router.get('/dog/:page', getDogs);
router.get('/dogs/dog/:title', getDogsTitle);

export default router;