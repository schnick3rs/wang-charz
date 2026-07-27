export interface Campaign {
  id: string;
  name: string;
  hint: string;
}

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
  create(state: CampaignsState, payload: { id: string }) {
    const { id } = payload;
    state.list.push(id);
    const newCampaign: Campaign = { ...getDefaultState(), id };
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

const getDefaultState = (): Campaign => ({
  id: crypto.randomUUID(),
  name: '',
  hint: 'A custom campaign',
});
