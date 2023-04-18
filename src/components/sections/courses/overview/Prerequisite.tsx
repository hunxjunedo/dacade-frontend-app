import Hint from "@/components/ui/Hint";
import React from "react";
import Section from "../../communities/_partials/Section";
import ObjectiveList from "@/components/list/Objectives";
import { useTranslation } from "next-i18next";
import { useSelector } from "@/hooks/useTypedSelector";

/**
 * Prerequisite component
 * @date 4/18/2023 - 12:24:59 PM
 *
 * @export
 * @returns {*}
 */
export default function Prerequisite() {
  const { t } = useTranslation();
  const course = useSelector((state) => state.courses.current);

  return course && course.prerequisite ? (
    <Section
      title={t("communities.overview.info.prerequisite.title")}
      subtitle={t("communities.overview.info.prerequisite.subtitle")}
    >
      <div className="mb-5">
        <ObjectiveList objectives={course.prerequisite.items} />
      </div>
      {course.prerequisite.hint && (
        <Hint>
          <span
            dangerouslySetInnerHTML={{
              __html: course.prerequisite.hint,
            }}
          />
        </Hint>
      )}
    </Section>
  ) : null;
}
