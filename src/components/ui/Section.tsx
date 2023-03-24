import { ReactElement } from "react";
import classNames from "classnames";

/**
 * Section component props
 * @date 3/23/2023 - 8:35:39 PM
 *
 * @interface Props
 * @typedef {Props}
 */
interface Props {
  type?: string;
  padding?: string;
  children: ReactElement;
}

/**
 * Section component
 * @date 3/23/2023 - 8:35:24 PM
 *
 * @export
 * @param {Props} {
  type = "default",
  padding = "py-4",
  children,
}
 * @returns {ReactElement}
 */
export default function Section({
  type = "default",
  padding = "py-4",
  children,
}: Props): ReactElement {
  const sectionClassName = classNames("relative", {
    "bg-white text-gray-900": type === "default",
    "bg-primary text-white": type === "primary",
    "bg-secondary text-gray-900": type === "secondary",
    "bg-gray-50 text-gray-900": !type,
  });

  return (
    <div className={sectionClassName}>
      <div className={padding}>{children}</div>
    </div>
  );
}
