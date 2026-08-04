// Minimal campaignSync — assumes the "dumb" worker that just does raw KV get/put by key.
// Everything the worker used to guard is now purely the client's responsibility.

const WORKER_URL = 'https://campaign-sync.moritz-orth.workers.dev';


function generateId() {
    return crypto.randomUUID().replace(/-/g, "").slice(0, 16);
}

async function kvGet(key) {
    const res = await fetch(`${WORKER_URL}/?key=${encodeURIComponent(key)}`);
    const { value } = await res.json();
    return value ? JSON.parse(value) : null;
}

async function kvPut(key, value) {
    await fetch(`${WORKER_URL}/?key=${encodeURIComponent(key)}`, {
        method: "PUT",
        body: JSON.stringify(value),
    });
}

async function kvDelete(key) {
    await fetch(`${WORKER_URL}/?key=${encodeURIComponent(key)}`, {
        method: "DELETE",
    });
}

// The client itself invents the campaignId now — nothing stops two people
// from picking the same one by chance, and nothing stops a stranger from
// writing to a campaignId they guessed.
export async function createCampaign(ownerId: string, campaign: any) {
    const meta = { campaign: campaign, owner: ownerId, createdAt: Date.now(), updatedAt: Date.now() };
    await kvPut(`campaign:${campaign.id}:meta`, meta);
    return { ...meta };
}


export async function deleteCampaign(id) {
    await kvDelete(`campaign:${id}:meta`);
    return { id };
}

export async function fetchCampaignMeta(campaignId) {
    return kvGet(`campaign:${campaignId}:meta`);
}

// No secret check — anyone who knows (or guesses) campaignId + charId can overwrite this.
export async function pushCharacter(campaignId, charId, character) {
    const record = { character, updatedAt: Date.now() };
    await kvPut(`campaign:${campaignId}:char:${charId}`, record);
    return record;
}

// This worker has no "list by prefix" endpoint wired up, so fetching ALL
// characters in a campaign isn't actually possible with the minimal worker
// as written — the GM would need to know each charId in advance, e.g. by
// storing a list of charIds inside the campaign meta itself and updating
// it whenever a new player joins.
export async function fetchCharacter(campaignId, charId) {
    return kvGet(`campaign:${campaignId}:char:${charId}`);
}

// Fetch every character under a campaign using the /?prefix= endpoint.
export async function fetchAllCharacters(campaignId) {
    const res = await fetch(
        `${WORKER_URL}/?prefix=${encodeURIComponent(`campaign:${campaignId}:char:`)}`
    );
    const { values } = await res.json();
    return values
        .filter((v) => v.value !== null)
        .map((v) => ({
            charId: v.key.split(":char:")[1],
            ...JSON.parse(v.value),
        }));
}

export function mergeCharacters(localChars, remoteChars) {
    const merged = { ...localChars };
    for (const remote of remoteChars) {
        const local = merged[remote.charId];
        if (!local || remote.updatedAt > local.updatedAt) {
            merged[remote.charId] = remote;
        }
    }
    return merged;
}