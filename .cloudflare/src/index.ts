// Minimal worker: no validation, no server-side ID generation.
// Client controls the key and the value entirely. Trust is fully client-side.
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "HEAD, POST, PUT, GET, OPTIONS, DELETE",
    "Access-Control-Max-Age": "86400",
};
export default {
    async fetch(request, env): Promise<Response> {
        const url = new URL(request.url);

        if (request.method === "OPTIONS") {
            return new Response(null, { headers: {
                    ...corsHeaders,
                    Allow: 'HEAD, POST, PUT, GET, OPTIONS, DELETE',
                } });
        }

        // GET /?prefix=campaign:abc:char:  -> list every key/value under that prefix
        if (request.method === "GET" && url.searchParams.has("prefix")) {
            const prefix = url.searchParams.get("prefix")!;
            const list = await env.KV.list({ prefix });
            const values = await Promise.all(
                list.keys.map(async (k) => ({
                    key: k.name,
                    value: await env.KV.get(k.name),
                }))
            );
            return new Response(JSON.stringify({ values }), { headers: {...corsHeaders} });
        }

        const key = url.searchParams.get("key");
        if (!key) {
            return new Response(JSON.stringify({ error: "missing ?key= or ?prefix=" }), { status: 400, headers: {...corsHeaders} });
        }
        if (request.method === "PUT") {
            const value = await request.text();
            await env.KV.put(key, value);
            return new Response(JSON.stringify({ ok: true }), { headers: {...corsHeaders} });
        }
        if (request.method === "GET") {
            const value = await env.KV.get(key);
            return new Response(JSON.stringify({ value }), { headers: {...corsHeaders} });
        }
        if (request.method === "DELETE") {
            await env.KV.delete(key);
            return new Response(JSON.stringify({ ok: true }), { headers: {...corsHeaders} });
        }
        return new Response(JSON.stringify({ error: "unsupported method" }), { status: 405, headers: {...corsHeaders} });
    },
} satisfies ExportedHandler<{ KV: KVNamespace }>;