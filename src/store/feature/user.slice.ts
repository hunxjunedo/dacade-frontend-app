import { auth as firebaseAuth } from "@/config/firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/bounty";

/**
 * The default state for the user slice.
 * @typedef {Object} DefaultState
 * @property {User|null} data - The current user data or null if no user is logged in.
 * @property {string|null} userBalance - The user's balance or null if the user is not logged in.
 * @property {string|null} balance - The user's balance or null if the user is not logged in.
 * @property {string|null} walletAddresses - The user's wallet addresses or null if the user is not logged in.
 * @property {string|null} token - The user's token or null if the user is not logged in.
 */
interface DefaultState {
  data: User | null;
  userBalance: string | null;
  balance: string | null;
  walletAddresses: string | null;
  token: string | null;
}

/**
 * The default state for the user slice.
 * @type {DefaultState}
 */
const defaultState: DefaultState = {
  data: null,
  userBalance: null,
  balance: null,
  walletAddresses: null,
  token: null,
};

/**
 * Function that gets the current user's token.
 * @returns {Promise<string|null>} The current user's token or null if the user is not logged in.
 */
export const getUserToken = async () => {
  const user = firebaseAuth.currentUser;
  const token = await user?.getIdToken();
  return token;
};

/**
 * An async action creator that gets the current user's token and sets it in the state.
 * @type {AsyncThunk<string|null, undefined, {}>}
 */
export const getToken = createAsyncThunk(
  "user/getToken",
  async (_, { dispatch }) => {
    const token = await getUserToken();

    try {
      if (!token) throw new Error("Couldn't fetch the token");
      dispatch(setUserToken(token));
      return token;
    } catch (e) {
      dispatch(clearUserState());
      return null;
    }
  }
);

export const clearNotifications = () => {
  return {
    type: "user/notifications/clear",
  };
};

export const clearReputations = () => {
  return {
    type: "user/reputations/clear",
  };
};

export const clearWallets = () => {
  return {
    type: "user/wallets/clear",
  };
};

export const clearAuth = () => {
  return {
    type: "auth/clear",
  };
};

const userSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {
    clearUserState: (state) => {
      state.data = null;
      state.token = null;
    },

    setUserdata: (state, action) => {
      state.data = action.payload;
    },

    setUserToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { clearUserState, setUserdata, setUserToken } =
  userSlice.actions;
export default userSlice;
