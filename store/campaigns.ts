import {z} from "zod";
import {createCampaign} from '~/services/campaignSync'
import {ActionContext} from "vuex";

const CampaignReward = z.object({
  targetGroup: z.string(),
  targetValue: z.string(),
  modifier: z.number().default(0)
})

export const ChronicEntrySchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  createdAt: z.coerce.date().default(() => new Date()),

  timestamp: z.coerce.date().default(() => new Date()),
  text: z.string(),

  xpReward: z.coerce.number().default(0),
  rankIncrement: z.boolean().default(false),
  tierIncrement: z.boolean().default(false),

  rewards: z.array(CampaignReward).default([]),
})
export type ChronicEntry = z.infer<typeof ChronicEntrySchema>

export const CampaignSchema = z.object({
  id: z.string(),
  name: z.string(),
  tier: z.number(),
  hint: z.string().optional(),

  chronic: z.array(ChronicEntrySchema).default([]),

  createdAt: z.coerce.date().default(() => new Date()),
  updatedAt: z.coerce.date().default(() => new Date()),
})
export type Campaign = z.infer<typeof CampaignSchema>;

export interface CampaignsState {
  list: string[];
  campaigns: Record<string, Campaign>;
}

export const state = (): CampaignsState => ({
  list: [],
  campaigns: {},
});

export const getters = {
  campaignIds: (state: CampaignsState) => state.list,
  campaignSets: (state: CampaignsState) => state.list.map((campaignId) => state.campaigns[campaignId]),
  getCampaign: (state: CampaignsState) => (id: string) => state.campaigns[id] ? state.campaigns[id] : undefined,
};

export const mutations = {

  create(state: CampaignsState, payload: { id: string, name: string, tier: number }) {
    const { id, name, tier } = payload;
    state.list.push(id);
    const newCampaign: Campaign = CampaignSchema.parse({ id, name, tier });
    state.campaigns = {
      ...state.campaigns,
      [id]: newCampaign,
    };
  },

  addChronicEntry(state: CampaignsState, payload: { id: string, entry: ChronicEntry}) {
    state.campaigns[payload.id].chronic.push(payload.entry);
  },

  update(state: CampaignsState, payload: { id: string; campaign: Campaign }) {
    const { id, campaign } = payload;
    state.campaigns[id] = campaign;
  },

  delete(state: CampaignsState, payload: { id: string }) {
    const { id } = payload;
    state.list.splice(state.list.indexOf(id), 1);
    delete state.campaigns[id];
  },
};

export const actions = {

  async save({ state, commit, rootGetters }: ActionContext<CampaignsState, RootState>, payload: { id: string }) {
    const { id } = payload;
    const campaign = state.campaigns[id];
    if (!campaign) throw new Error(`Campaign ${id} not found`);

    const userId = rootGetters['user/getUuid'];
    const updatedCampaign: Campaign = { ...campaign, updatedAt: new Date() };

    await createCampaign(userId, updatedCampaign);
    commit('update', { id, campaign: updatedCampaign });
  }

}