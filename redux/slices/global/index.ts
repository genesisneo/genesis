import { createAction, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { IProfile, IProject, IProjects, IGlobal } from "./types";

const versionHashEnv = process.env.VERCEL_GITHUB_COMMIT_SHA || "75EZM9";
const initialState: IGlobal = {
  name: "Genesis Mallorca Obtera",
  description: "Product Designer and Developer",
  domain: "https://genesis.obtera.com",
  versionHash: versionHashEnv.length > 5 ? versionHashEnv.substring(0, 5) : versionHashEnv,
  loading: false,
  profile: {},
  project: {},
  projects: [],
};

export const revertAll = createAction("revertAll");

export const global = createSlice({
  name: "global",
  initialState,
  extraReducers(builder: any) {
    builder.addCase(revertAll, () => initialState);
  },
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProfile: (state, action: PayloadAction<IProfile | {}>) => {
      state.profile = action.payload;
    },
    setProject: (state, action: PayloadAction<IProject | {}>) => {
      state.project = action.payload;
    },
    setProjects: (state, action: PayloadAction<IProjects | []>) => {
      state.projects = action.payload;
    },
  },
});

export const { setLoading, setProfile, setProject, setProjects } = global.actions;
export default global.reducer;
