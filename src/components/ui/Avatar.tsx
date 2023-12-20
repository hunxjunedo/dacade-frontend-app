import Image from "next/image";
import Link from "next/link";
import { CSSProperties, ReactElement, useMemo, useState } from "react";
import VerifiedIcon from "@/icons/verified.svg";
import classNames from "classnames";
import { Submission } from "@/types/bounty";
import { Community } from "@/types/community";
import { Metadata } from "@/types/course";
import { useSelector } from "@/hooks/useTypedSelector";
/**
 * Interface for User
 * @date 3/22/2023 - 5:42:26 PM
 *
 * @typedef {User}
 */

interface User {
  displayName?: string;
  username?: string;
  avatar?: string;
}

/**
 * Interface for User
 * @date 3/22/2023 - 5:42:26 PM
 *
 * @typedef {User}
 */

interface Certificate {
  id: string;
  ref: string;
  created_at: string;
  updated_at: string;
  metadata: Metadata;
  answer: string;
  user_id: string;
  course: string;
  type: string;
  community: Community;
  entity: string;
  timestamp: number;
  description: string;
  submission: Submission;
  minting: any;
}


/**
 * Interface for Avatar component props
 * @date 3/22/2023 - 5:42:18 PM
 *
 * @typedef {AvatarProps}
 */
type Size = "extra" | "large" | "medium" | "medium-fixed" | "small-fixed" | "mini" | "small" | "fixed";

type Shape = "rounded" | "rounded-3xl" | "full" | "squared" | "circular";
interface AvatarProps {
  icon?: string;
  image?: string;
  color?: string;
  user?: User | null;
  size?: Size;
  shape?: Shape;
  useLink?: boolean;
  hideVerificationBadge?: boolean;
  isKycVerified?: boolean;
  style?: CSSProperties;
  className?: string;
  achievement?: Certificate | null;
}

/**
 * Avatar component
 * @date 3/22/2023 - 5:41:18 PM
 *
 * @param {AvatarProps} {
  icon,
  image,
  color,
  user = {},
  size = "small",
  shape = "circular",
  useLink = true,
}
 * @returns {ReactElement}
 */

export default function Avatar({
  icon,
  image,
  color,
  // achievement = null,
  user = null,
  size = "small",
  shape = "circular",
  useLink = true,
  className,
  hideVerificationBadge = false,
  isKycVerified = false,
}: AvatarProps): ReactElement {
  const [userAvatarLoaded, setUserAvatarLoaded] = useState(true);
  const initials = user?.displayName ? user?.displayName[0] : null;
  const achievement = useSelector((state) => state.profileCertificate.current);
  // const achievementInitials = achievement.metadata?.recipientName ? achievement?.metadata?.recipientName[0] : null;


  const link = user?.username && useLink ? `/profile/${user.username}` : "#";

  const sizeClassName = classNames({
    "w-32 h-32 text-4xl": size === "extra",
    "w-15 h-15 text-2xl": size === "large",
    "w-10 h-10 sm:h-12 sm:w-12 md:w-15 md:h-15 text-xl sm:text-2xl": size === "medium",
    "w-10 h-10 text-2xl": size === "medium-fixed",
    "w-7 h-7 text-xl": size === "small-fixed",
    "w-7.5 h-7.5 text-sm font-bold": size === "fixed",
    "w-5 h-5 text-xl": size === "mini",
    "w-9 h-9 text-lg": size === "small",
  });

  const shapeClassName = classNames({
    "rounded-xl": shape === "rounded",
    "rounded-3xl": shape === "rounded-3xl",
    "rounded-full": shape === "full" || shape === "circular",
    "rounded-none": shape === "squared",
  });

  const componentClassName = classNames("inline-flex relative align-middle", className, sizeClassName, shapeClassName, {
    "cursor-pointer": user,
  });

  const verifiedIconClasses = useMemo(() => {
    switch (size) {
      case "medium":
      case "medium-fixed":
      case "small-fixed":
        return "w-1/3 h-1/3 right-0 -bottom-1/100";
      case "mini":
        return "w-3/6 h-3/6 -right-1/10 -bottom-1/10";
      default:
        return "w-1/5 h-1/5 right-1/10 bottom-1/100";
    }
  }, [size]);

  const showVerificationBadge = !hideVerificationBadge && user && isKycVerified;
  const Component = useLink ? Link : "div";

  return (
    <Component href={link} className={componentClassName}>
      <div
        style={{ backgroundColor: color }}
        className={`bg-primary h-full w-full flex overflow-hidden text-white items-center justify-center uppercase leading-none align-middle relative z-0 ${shapeClassName}`}
      >
        {user && user.avatar && userAvatarLoaded ? (
          <Image
            src={user.avatar}
            alt="user-avatar"
            fill={true}
            className="object-cover w-full h-full"
            onError={() => {
              setUserAvatarLoaded(false);
            }}
          />
        ) : (
          <span>{initials}</span>
        )}

        {/* { achievement && achievement.metadata.comment ? (
          <Image
            src={achievement.metadata.image}
            alt="user-avatar"
            fill={true}
            className="object-cover w-full h-full"
            onError={() => {
              setUserAvatarLoaded(false);
            }}
          />
        ) : (
          <span>{achievement?.metadata?.recipientName[0]}</span>
        )} */}

        {/* { achievement && achievement.metadata ? (
    
          <span>{achievement?.metadata?.recipientName[0]}</span>
        ): null } */}

        {icon && <Image fill={true} src={icon} alt="icon image" className="p-2" />}
        {image && <Image src={image} fill={true} alt="icon image" className="p-0 object-cover w-full h-full" />}
      </div>
      {showVerificationBadge && (
        <span className={`absolute z-20 rounded-full ${verifiedIconClasses}`}>
          <VerifiedIcon className="w-full h-full" />
        </span>
      )}
    </Component>
  );
}
