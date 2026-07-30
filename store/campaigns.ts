import {z} from "zod";

 
const CampaignSchema = z.object({
  id: z.string(),
  name: z.string(),
  tier: z.number(),
  hint: z.string().optional(),

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
