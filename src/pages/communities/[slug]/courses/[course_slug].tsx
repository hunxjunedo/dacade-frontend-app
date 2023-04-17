import { wrapper } from "@/store";
import HomeLayout from "@/layouts/Home";
import { ReactElement, useEffect } from "react";
import OverviewSection from "@/components/sections/courses/overview";
import {
  fetchCurrentCommunity,
  setCurrentCommunity,
} from "@/store/feature/community.slice";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useDispatch } from "react-redux";
import {
  setCurrent,
  fetchCourse,
  fetchAllCourses,
  setNavigation,
} from "@/store/feature/course.slice";
import { Community } from "@/types/community";
import { Course } from "@/types/course";
import { setColors } from "@/store/feature/ui.slice";
import Wrapper from "@/components/sections/courses/Wrapper";
import CommunityNavigation from "@/utilities/CommunityNavigation";
import { useRouter } from "next/router";
import Head from "next/head";
import { getMetadataTitle } from "@/utilities/Metadata";

export default function CommunityCourseViewPage(props: {
  pageProps: {
    community: Community;
    course: Course;
    courses: Course[];
  };
}) {
  const { community, course } = props.pageProps;

  const dispatch = useDispatch();

  const router = useRouter();

  const communityNavigation = new CommunityNavigation(router);

  const list = communityNavigation.init({ community, course });

  useEffect(() => {
    dispatch(setCurrentCommunity(community));
    dispatch(setCurrent(course));
    dispatch(setColors(community.colors));
    dispatch(setNavigation({ list }));
  }, [community, course]);

  const title = getMetadataTitle(course.name);
  const meta = getMetadataTitle(course.description);

  return (
    <Wrapper>
      <Head>
        <title>{title}</title>
        <meta name="description" content={meta} />
      </Head>
      <div className="lg:py-0 lg:pb-8 py-8 flex flex-col divide-y divide-solid divide-gray-200 space-y-8 text-gray-700">
        <OverviewSection />
      </div>
    </Wrapper>
  );
}

CommunityCourseViewPage.getLayout = function (page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (data) => {
    const { query } = data;
    const slug = query?.slug as string;
    const course_slug = query?.course_slug as string;

    const fetchArgs = {
      locale: data.locale as string,
    };

    const getCurrentCommunty = store.dispatch(
      fetchCurrentCommunity({ ...fetchArgs, slug })
    );
    const getCurrentCourse = store.dispatch(
      fetchCourse({ ...fetchArgs, slug: course_slug })
    );

    const getAllCourses = store.dispatch(
      fetchAllCourses({ ...fetchArgs, slug })
    );

    const results = await Promise.all([
      getCurrentCommunty,
      getCurrentCourse,
      getAllCourses,
    ]);

    const community = results[0].payload;
    const course = results[1].payload;
    const courses = results[2].payload;

    return {
      props: {
        ...(await serverSideTranslations(data.locale as string)),
        community,
        course,
        courses,
      },
    };
  }
);
