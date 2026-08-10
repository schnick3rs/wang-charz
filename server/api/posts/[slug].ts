import {createClient} from 'contentful'

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug');

    const config = useRuntimeConfig()
    const client = createClient({
        space: config.ctfSpaceId,
        accessToken: config.ctfCdAccessToken,
    })
    const response = await client.getEntries({
        'content_type': 'blogPost',
        'sys.revision[gt]': 0,
        'fields.slug[in]': slug,
    })

    return response.items.map((item) => item.fields)[0]
})