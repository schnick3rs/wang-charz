import {createClient} from 'contentful'

export default defineEventHandler(async () => {
    const config = useRuntimeConfig()
    const client = createClient({
        space: config.ctfSpaceId,
        accessToken: config.ctfCdAccessToken,
    })
    const response = await client.getEntries({
        content_type: 'homebrewItem',
        'sys.revision[gt]': 0,
    })

    return response.items.map((item) => item.fields)
})