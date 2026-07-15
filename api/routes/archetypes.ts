import Router from 'express-promise-router';
import { archetypeRepository } from '../data/archetypes';
import type { Request, Response } from 'express';

const router = Router();
export default router;

const ONE_HOUR = 'public, max-age=3600';

function filterBySource<T extends { source: { key: string } }>(
    items: T[],
    sourceQuery: unknown
): T[] {
  if (typeof sourceQuery !== 'string' || !sourceQuery) return items;
  const sources = sourceQuery.split(',');
  return items.filter((item) => sources.includes(item.source.key));
}

router.get('/', (request: Request, response: Response) => {
  const items = filterBySource(archetypeRepository, request.query.source);
  response.set('Cache-Control', ONE_HOUR);
  response.status(200).json(items);
});

router.get('/groups/', (request: Request, response: Response) => {
  const items = filterBySource(archetypeRepository, request.query.source);
  const groups = [...new Set(items.map((item) => item.group))].sort();
  response.set('Cache-Control', ONE_HOUR);
  response.status(200).json(groups);
});

router.get('/:slug', (request: Request, response: Response) => {
  const { slug } = request.params;
  const item = archetypeRepository.find((archetype) => archetype.key === slug);
  if (!item) {
    response.status(404).json({ error: 'Archetype not found' });
    return;
  }
  response.set('Cache-Control', ONE_HOUR);
  response.status(200).json(item);
});