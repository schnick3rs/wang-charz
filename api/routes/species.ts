import Router from 'express-promise-router';
import type { Request, Response } from 'express';
import { speciesRepository } from '../data/species';
import {speciesChaptersRepository} from "../db/static/speciesChaptersRepository";

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
    const items = filterBySource(speciesRepository, request.query.source);
    response.set('Cache-Control', ONE_HOUR);
    response.status(200).json(items);
});

/*
router.get('/chapters/', (request, response) => {
    let items = [];
    items = chaptersRepository;

    const filter = {};
    const filterSourceString = request.query.source;
    if (filterSourceString) {
        filter.source = filterSourceString.split(',');
        if (filter.source) {
            items = items.filter((item) => filter.source.includes(item.source.key));
        }
    }

    items = items.map( (chapter) => {
        const label = chapter.source.key === 'core' ? chapter.name : `${chapter.name} [${chapter.source.book}]` ;
        return {
            ...chapter,
            label,
        }
    });

    items = items.sort((a, b) => a.name.localeCompare(b.name));

    response.set('Cache-Control', 'public, max-age=3600'); // one hour
    response.status(200).json(items);
});
 */
router.get('/chapters/', (request: Request, response: Response) => {
    let items =  filterBySource(speciesChaptersRepository, request.query.source);

    items = items.map( (chapter) => {
        const label = chapter.source.key === 'core' ? chapter.name : `${chapter.name} [${chapter.source.book}]` ;
        return {
            ...chapter,
            label,
        }
    });

    items = items.sort((a, b) => a.name.localeCompare(b.name));


    response.set('Cache-Control', ONE_HOUR);
    response.status(200).json(items);
});

router.get('/:slug', (request: Request, response: Response) => {
    const { slug } = request.params;
    const item = speciesRepository.find((faction) => faction.key === slug);
    if (!item) {
        response.status(404).json({ error: 'Faction not found' });
        return;
    }
    response.set('Cache-Control', ONE_HOUR);
    response.status(200).json(item);
});
