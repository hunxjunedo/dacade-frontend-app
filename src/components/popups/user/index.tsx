import { CSSProperties, ReactElement, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// TODO: Should be uncommented when the ui.slice is updated.
// import { toggleBodyScrolling } from "@/store/feature/ui.slice";
import Dropdown from "./Dropdown";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/Currency";
import { IRootState } from "@/store";
import { User } from "@/types/bounty";

/**
 * User popup component
 * @date 4/5/2023 - 12:17:46 AM
 *
 * @export
 * @param {{
  buttonStyles: CSSProperties;
}} {
  buttonStyles,
}
 * @returns {ReactElement}
 */
export default function UserPopup({
  buttonStyles,
}: {
  buttonStyles: CSSProperties;
}): ReactElement {
  const [show, setShow] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
  const mainWallet = useSelector(
    (state: IRootState) => state.wallets.main
  );
  const wallets = useSelector(
    (state: IRootState) => state.wallets.list
  );
  const reputations = useSelector(
    (state: IRootState) => state.reputations.list
  );
  const user = useSelector((state: IRootState) => state.user.data);
  const dispatch = useDispatch();

  const toggle = () => {
    setShow(!show);
    // TODO: Should be uncommented when the ui.slice is updated.
    // dispatch(toggleBodyScrolling(show));
  };

  const toggleInvite = () => {
    setShowReferral(!showReferral);
    setShow(!show);
    // TODO: Should be uncommented when the ui.slice is updated.
    // dispatch(toggleBodyScrolling(showReferral));
  };

  const externalClick = () => {
    if (show) {
      setShow(false);
      // TODO: Should be uncommented when the ui.slice is updated.
      //   dispatch(toggleBodyScrolling(show));
    }
  };

  return (
    <div className="">
      <div>
        <span onClick={externalClick}>
          <li
            className={`inline-block align-middle relative ${
              show === true ? "z-50" : "z-10"
            }`}
            onClick={toggle}
          >
            <Button
              custom-style={buttonStyles}
              padding={false}
              variant="secondary"
              className={`p-0.5 bg-gray-100 bg-opacity-75 hover:bg-gray-50 ${
                mainWallet ? "pr-5" : ""
              }`}
            >
              <Avatar user={user as User} use-link={false} />
              {mainWallet && (
                <span
                  style={{
                    color: buttonStyles.color
                      ? buttonStyles.color
                      : undefined,
                  }}
                  className="align-middle ml-2.5 font-medium text-gray-500"
                >
                  <Currency
                    value={mainWallet.balance}
                    token={mainWallet.token}
                  />
                </span>
              )}
            </Button>
          </li>
          {show && (
            <Dropdown
              toggle-invite={toggleInvite}
              close={externalClick}
            />
          )}
        </span>
        {show && (
          <div className="opacity-25 fixed inset-0 z-30 bg-black" />
        )}
      </div>
    </div>
  );
}
