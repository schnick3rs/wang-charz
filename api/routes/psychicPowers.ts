import Router from 'express-promise-router';
import type { Request, Response } from 'express';
import { psychicPowersRepository, universalAbilitiesRepository } from '../data/psychic-powers';
import { filterBySource } from './utils';

const router = Router();
export default router;

const ONE_HOUR = 'public, max-age=3600';

router.get('/', (request: Request, response: Response) => {
  let items = filterBySource(psychicPowersRepository, request.query.source);

  const disciplineQuery = request.query.discipline;
  if (typeof disciplineQuery === 'string' && disciplineQuery) {
    const disciplines = disciplineQuery.split(',');
    items = items.filter((item) => disciplines.includes(item.discipline));
  }

  const nameQuery = request.query.name;
  if (typeof nameQuery === 'string' && nameQuery) {
    const names = nameQuery.split(',');
    items = items.filter((item) => names.includes(item.name));
  }

  response.set('Cache-Control', ONE_HOUR);
  response.status(200).json(items);
});

router.get('/universal-abilities', (request: Request, response: Response) => {
  const items = filterBySource(universalAbilitiesRepository, request.query.source);
  response.set('Cache-Control', ONE_HOUR);
  response.status(200).json(items);
});

router.get('/:slug', (request: Request, response: Response) => {
  const { slug } = request.params;
  const item = psychicPowersRepository.find((power) => power.key === slug);
  if (!item) {
    response.status(404).json({ error: 'Psychic power not found' });
    return;
  }
  response.set('Cache-Control', ONE_HOUR);
  response.status(200).json(item);
});
