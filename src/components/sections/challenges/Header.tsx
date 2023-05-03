import Section from "@/components/sections/communities/_partials/Section";
import Header from "@/components/sections/communities/_partials/Header";
import ObjectiveList from "@/components/list/Objectives";
import Hint from "@/components/ui/Hint";
import { useSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import { ReactElement } from "react";

/**
 * Challenge header component
 * @date 4/18/2023 - 12:08:02 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function ChallengeHeader(): ReactElement {
  const { t } = useTranslation();
  const course = useSelector((state) => state.courses.current);
  const challenge = useSelector((state) => state.challenges.current);

  return (
    <div>
      <Header
        title={course?.name}
        subtitle={t("communities.challenge.title")}
        description={challenge?.description}
      />
      <Section>
        <ObjectiveList objectives={challenge?.objectives} />
      </Section>
      <Hint>
        <span className="pr-1 font-medium">
          {t("communities.challenge.hint")}:
        </span>
        <span
          dangerouslySetInnerHTML={{
            __html: challenge?.hint as string,
          }}
        />
      </Hint>
    </div>
  );
}
