import ExpiryDate from "@/components/challenge/ExpiryDate";
import ObjectiveList from "@/components/list/Objectives";
import Section from "@/components/sections/communities/_partials/Section";
import Hint from "@/components/ui/Hint";
import { useSelector } from "@/hooks/useTypedSelector";
import DateManager from "@/utilities/DateManager";
import { useTranslation } from "next-i18next";
import { ReactElement } from "react";

/**
 * Challenge objectives component
 * @date 7/28/2023 - 5:04:54 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function Objectives(): ReactElement {
  const containsLinkRegex = new RegExp(/<a>.*?</a>/gi);
  const { t } = useTranslation();
  const challenge = useSelector((state) => state.challenges.current);
  const expirationDate = challenge?.expiresAt && DateManager.format(challenge.expiresAt, "MMMM d, yyyy", "en");
  return (
    <Section title={`${t("communities.overview.challenge.objective.title")}`}>
      <ObjectiveList objectives={challenge?.objectives} />
      {expirationDate && <ExpiryDate expiresAt={expirationDate} />}
      {/* Show hint only when we  have a link */}
      {containsLinkRegex.test(challenge?.hint as string) && (
        <Hint>
          <span
            dangerouslySetInnerHTML={{
              __html: challenge?.hint as string,
            }}
          />
        </Hint>
      )}
    </Section>
  );
}
