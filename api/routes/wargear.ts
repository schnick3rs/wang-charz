import Router from 'express-promise-router';
import type { Request, Response } from 'express';
import { wargearRepository } from '../data/wargear.repository';
import { filterBySource } from './utils';

const router = Router();
export default router;

const ONE_HOUR = 'public, max-age=3600';

router.get('/', (request: Request, response: Response) => {
  let items = filterBySource(wargearRepository, request.query.source);

  const typeQuery = request.query.type;
  if (typeof typeQuery === 'string' && typeQuery) {
    const types = typeQuery.split(',');
    items = items.filter((item) => types.includes(item.type));
  }

  const rarityQuery = request.query.rarity;
  if (typeof rarityQuery === 'string' && rarityQuery) {
    const rarities = rarityQuery.split(',');
    items = items.filter((item) => rarities.includes(item.rarity));
  }

  const valueLeqQuery = request.query['value-leq'];
  if (typeof valueLeqQuery === 'string' && valueLeqQuery) {
    const valueLeq = Number(valueLeqQuery);
    items = items.filter((item) => item.value <= valueLeq);
  }

  const nameQuery = request.query.name;
  if (typeof nameQuery === 'string' && nameQuery) {
    const names = nameQuery.split(',');
    items = items.filter((item) => names.includes(item.name));
  }

  response.set('Cache-Control', ONE_HOUR);
  response.status(200).json(items);
});

router.get('/:slug', (request: Request, response: Response) => {
  const { slug } = request.params;
  const item = wargearRepository.find((gear) => gear.key === slug);
  if (!item) {
    response.status(404).json({ error: 'Wargear not found' });
    return;
  }
  response.set('Cache-Control', ONE_HOUR);
  response.status(200).json(item);
});
