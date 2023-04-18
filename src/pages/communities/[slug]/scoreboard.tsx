import { ReactElement, useEffect } from "react";
import { useSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import Header from "@/components/sections/communities/_partials/Header";
import ScoreboardCard from "@/components/cards/Scoreboard";
import {
  getMetadataDescription,
  getMetadataTitle,
} from "@/utilities/Metadata";
// TODO: fetchCommunities and fetchScoreboard to be combined in redux store optimisation.
import { fetchAllCommunities as fetchCommunities } from "@/store/feature/community.slice";
import { fetchAllScoreboards } from "@/store/feature/communities/scoreboard.slice";
import { wrapper } from "@/store";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import HomeLayout from "@/layouts/Home";
import { Community } from "@/types/community";
import { Scoreboard } from "@/types/scoreboard";
import { fetchCurrentCommunity } from "@/store/feature/community.slice";
import { useRouter } from "next/router";

/**
 * represents the props for the ScoreboardList component.
 * @date 4/16/2023 - 10:29:30 PM
 *
 * @interface IScoreboardListProps
 * @typedef {IScoreboardListProps}
 */
interface IScoreboardListProps {
  badgeStyles?: Record<string, unknown>;
  locale: string;
}

/**
 *  ScoreboardList component for communities scoreboard page.
 * @date 4/16/2023 - 10:28:54 PM
 *
 * @export
 * @param {IScoreboardListProps} {
  badgeStyles = {},
  locale,
}
 * @returns {ReactElement}
 */
export default function ScoreboardList({
  badgeStyles = {},
  locale,
}: IScoreboardListProps): ReactElement {
  const { t } = useTranslation();
  const community = useSelector((state) => state.communities.current);
  const scoreboard = useSelector((state) => state.scoreboard.list);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    Promise.all([
      dispatch(
        fetchCurrentCommunity({
          locale: locale as string,
          slug: router.query.slug as string,
        })
      ),
      dispatch(
        fetchAllScoreboards({
          slug: router.query?.slug as string,
          locale: locale as string,
        })
      ),
    ]).catch((e) => {
      console.error(e);
    });
  }, [dispatch, router.query?.slug, locale]);
  return (
    <>
      <Head>
        <title>
          {getMetadataTitle(
            t("communities.navigation.scoreboard"),
            community?.name as string
          )}
        </title>
        {getMetadataDescription(community?.description as string).map(
          ({ name, content }) => (
            <meta key={name} name={name} content={content} />
          )
        )}
      </Head>
      <div className="py-4 flex flex-col text-gray-700">
        <Header
          title={community?.name as string}
          subtitle={t("communities.navigation.scoreboard")}
        />
        <div className="my-24 w-full divide-y divide-gray-200 space-y-4 bg-gray-50 lg:max-w-2xl rounded-3.5xl overflow-hidden">
          {scoreboard.map((item, index) => (
            <ScoreboardCard
              key={index}
              index={index + 1}
              value={item}
            />
          ))}
        </div>
      </div>
    </>
  );
}

ScoreboardList.getLayout = function (page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => {
    return async ({ locale }) => {
      return {
        props: {
          ...(await serverSideTranslations(locale as string)),
          locale: locale as string,
        },
      };
    };
  }
);
