import type { ReactNode, ReactElement } from "react";
import CopyButton from "../CopyButton";

const CopyAddressButton = ({
  prefix,
  address,
  copyPrefix,
  children,
  trusted = true,
}: {
  prefix?: string;
  address: string;
  copyPrefix?: boolean;
  children?: ReactNode;
  trusted?: boolean;
}): ReactElement => {
  const addressText = copyPrefix && prefix ? `${prefix}:${address}` : address;

  return <CopyButton text={addressText}>{children}</CopyButton>;
};

export default CopyAddressButton;
