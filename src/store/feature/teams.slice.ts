import { Team } from "@/types/challenge";
import { createSlice } from "@reduxjs/toolkit";

interface DefaultState {
  current: Team;
  loading: boolean;
}

const defaultState: DefaultState = {
  current: {
    challenge_ref: "",
    created_at: "",
    id: "",
    locked: false,
    name: "",
    organizer_id: "",
    ref: "",
    timestamp: "",
    updated_at: "",
    members: [],
    invites: [],
  },
  loading: false,
};
const teamsSlice = createSlice({
  name: "teams",
  initialState: defaultState,
  reducers: {
    setTeamData: (state, action) => {
      const { locked, members } = action.payload;
      const teamData = { ...action.payload, locked: members.length >= 3 || locked };
      state.current = teamData;
    },
    setIsTeamDataLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearTeamData: (state) => {
      state.current = defaultState.current;
    },
  },
});

export const { setTeamData, setIsTeamDataLoading, clearTeamData } = teamsSlice.actions;

export default teamsSlice;
