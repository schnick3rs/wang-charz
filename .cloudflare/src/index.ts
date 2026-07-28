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
        const key = url.searchParams.get("key");

        if (request.method === "OPTIONS") {
            return new Response(null, { headers: {
                    ...corsHeaders,
                    Allow: 'HEAD, POST, PUT, GET, OPTIONS, DELETE',
                } });
        }

        if (!key) {
            return new Response(JSON.stringify({ error: "missing ?key=" }), { status: 400 });
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

        // list keys matching a prefix, e.g. GET /?prefix=campaign:abc:char:
        return new Response(JSON.stringify({ error: "unsupported method" }), { status: 405, headers: {...corsHeaders} });
    },
} satisfies ExportedHandler<{ KV: KVNamespace }>;