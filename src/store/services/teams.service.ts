import baseQuery from "@/config/baseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { setIsTeamDataLoading, setTeamData } from "../feature/teams.slice";
import { setInviteStatus, setInvitesData } from "../feature/communities/challenges/invites.slice";
import { Invite } from "@/types/challenge";

/**
 * Interface for the parameters that the createTeam function will receive
 * @date 7/31/2023 - 8:00:28 PM
 *
 * @interface CreateTeamPayload
 * @typedef {CreateTeamPayload}
 */
interface CreateTeamPayload {
  challenge_id?: string;
  members: Array<string | undefined>;
  invites?: Invite[];
}

/**
 * Interface for the parameters that the removeMember function will receive
 * @date 8/16/2023 - 7:12:12 PM
 *
 * @interface RemoveMemberPayload
 * @typedef {RemoveMemberPayload}
 */
interface RemoveMemberPayload {
  member_id: string;
  team_id: string;
}
/**
 * Teams service.
 * @date 7/31/2023 - 8:01:21 PM
 *
 * @type {*}
 */
const teamsService = createApi({
  reducerPath: "teamsService",
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getTeamByChallenge: builder.query({
      query: (challengeId: string) => ({
        url: `/teams/challenge/${challengeId}`,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        setIsTeamDataLoading(true);
        const { data } = await queryFulfilled;
        dispatch(setTeamData(data));
        setIsTeamDataLoading(false);
        return data;
      },
    }),

    getUserInvitesByChallenge: builder.query({
      query: (challengeId: string) => ({
        url: `/teams/challenge/${challengeId}/invite`,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setInvitesData(data));
          return data;
        } catch (err) {
          console.error("Current user has no invites!");
        }
      },
    }),

    getTeamById: builder.query({
      query: (teamId: string) => ({
        url: `/teams/${teamId}`,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setTeamData(data));
        return data;
      },
    }),

    createTeam: builder.mutation<any, CreateTeamPayload>({
      query: (payload: CreateTeamPayload) => ({
        url: "/teams/create",
        method: "POST",
        body: payload,
      }),
      onQueryStarted: async (payload, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data.invites.length > 0) dispatch(setInviteStatus("sent"));
          else dispatch(setInviteStatus("not sent"));
        } catch (err: any) {
          dispatch(setInviteStatus(err.status));
          console.error("Error", err);
        } finally {
          teamsService.endpoints.getTeamByChallenge.initiate(payload.challenge_id as string);
        }

        return;
      },
    }),

    removeTeamMember: builder.mutation<any, RemoveMemberPayload>({
      query: (payload: RemoveMemberPayload) => ({
        url: "/teams/remove-member",
        method: "POST",
        body: payload,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err: any) {
          console.error("Error", err);
        }
        return;
      },
    }),

    cancelTeamInvite: builder.mutation<any, { invite_id: string }>({
      query: (payload: { invite_id: string }) => ({
        url: "/teams/cancel-invite",
        method: "POST",
        body: payload,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err: any) {
          console.error("Error", err);
        }
        return;
      },
    }),
  }),
});
export const { useGetTeamByChallengeQuery, useGetTeamByIdQuery } = teamsService;

export const getTeamByChallenge = (challengeId: string) => teamsService.endpoints.getTeamByChallenge.initiate(challengeId);

export const getUserInvitesByChallenge = (challengeId: string) => teamsService.endpoints.getUserInvitesByChallenge.initiate(challengeId);

export const getTeamById = (challengeId: string) => teamsService.endpoints.getTeamById.initiate(challengeId);
export default teamsService;

export const createTeam = (payload: CreateTeamPayload) => teamsService.endpoints.createTeam.initiate(payload);

export const removeTeamMember = (payload: RemoveMemberPayload) => teamsService.endpoints.removeTeamMember.initiate(payload);

export const cancelTeamInvite = (payload: { invite_id: string }) => teamsService.endpoints.cancelTeamInvite.initiate(payload);
