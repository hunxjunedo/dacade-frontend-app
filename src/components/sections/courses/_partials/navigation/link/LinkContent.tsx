import classNames from "classnames";
import ChevronRightIcon from "@/icons/chevron-right.svg";
import { useTranslation } from "next-i18next";
import { ReactElement } from "react";

/**
 * Interface for content link
 * @date 4/19/2023 - 7:02:30 PM
 *
 * @interface LinkContentProps
 * @typedef {LinkContentProps}
 */
interface LinkContentProps {
  isActive: boolean;
  expanded: boolean;
  item: any;
}

/**
 * Content link component
 * @date 4/19/2023 - 7:02:58 PM
 *
 * @export
 * @param {LinkContentProps} {
  isActive,
  expanded,
  item,
}
 * @returns {ReactElement}
 */
export default function LinkContent({
  isActive,
  expanded,
  item,
}: LinkContentProps): ReactElement {
  const { t } = useTranslation();
  return (
    <span>
      {isActive && (
        <span className="absolute top-0 inline-block -left-6 nav-icon">
          <ChevronRightIcon
            className={classNames(
              {
                "transform rotate-90":
                  item.subitems &&
                  item.subitems.length &&
                  isActive &&
                  expanded,
              },
              "transition-transform duration-200"
            )}
          />
        </span>
      )}

      <span className="nav-label">{t(item.label)}</span>
    </span>
  );
}
