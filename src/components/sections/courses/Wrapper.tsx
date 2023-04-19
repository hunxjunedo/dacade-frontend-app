import Section from "@/components/ui/Section";
import Navigation from "./Navigation";
import MobileNav from "./MobileNav";
import CommunityNavigation from "./CommunityNavigation";
import { ReactElement, ReactNode } from "react";

/**
 *  Wrapper component interface
 * @date 4/18/2023 - 12:22:26 PM
 *
 * @interface WrapperProps
 * @typedef {WrapperProps}
 */
interface WrapperProps {
  children: ReactNode;
}

/**
 * Wrapper component
 * @date 4/18/2023 - 12:22:49 PM
 *
 * @export
 * @param {WrapperProps} { children }
 * @returns {ReactElement}
 */
export default function Wrapper({
  children,
}: WrapperProps): ReactElement {
  return (
    <Section>
      <div className="h-auto lg:flex">
        <div className="sticky top-0 self-start hidden w-1/4 py-3 lg:block pr-9 lg:py-14">
          <Navigation />
        </div>
        <div className="w-full pt-8 pb-0 lg:hidden lg:py-14">
          <MobileNav showTopBorder />
        </div>
        <div className="w-full lg:w-3/4">
          <CommunityNavigation />
          {children}
        </div>
      </div>
    </Section>
  );
}
