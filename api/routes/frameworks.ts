import Router from 'express-promise-router';
import type { Request, Response } from 'express';
import {filterBySource} from "./utils";
import {frameworkRepository} from "../data/frameworks.repository";

const router = Router();
export default router;

const ONE_HOUR = 'public, max-age=3600';

router.get('/', (request: Request, response: Response) => {
  const items = filterBySource(frameworkRepository, request.query.source);
  response.set('Cache-Control', ONE_HOUR);
  response.status(200).json(items);
});

router.get('/:slug', (request: Request, response: Response) => {
  const { slug } = request.params;
  const item = frameworkRepository.find((framework) => framework.key === slug);
  if (!item) {
    response.status(404).json({ error: 'Framework not found' });
    return;
  }
  response.set('Cache-Control', ONE_HOUR);
  response.status(200).json(item);
});
