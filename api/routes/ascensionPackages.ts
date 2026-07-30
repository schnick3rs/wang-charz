import Router from 'express-promise-router';
import type { Request, Response } from 'express';
import { ascensionPackageRepository } from '../data/ascension-packages';
import {filterBySource} from "./utils";

const router = Router();
export default router;

const ONE_HOUR = 'public, max-age=3600';

router.get('/', (request: Request, response: Response) => {
    const items = filterBySource(ascensionPackageRepository, request.query.source);
    response.set('Cache-Control', ONE_HOUR);
    response.status(200).json(items);
});

router.get('/:slug', (request: Request, response: Response) => {
    const { slug } = request.params;
    const item = ascensionPackageRepository.find((ascensionPackage) => ascensionPackage.key === slug);
    if (!item) {
        response.status(404).json({ error: 'Faction not found' });
        return;
    }
    response.set('Cache-Control', ONE_HOUR);
    response.status(200).json(item);
});
