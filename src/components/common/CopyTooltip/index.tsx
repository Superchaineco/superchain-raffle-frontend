import type { ReactNode } from "react";
import React, {
  type ReactElement,
  type SyntheticEvent,
  useCallback,
  useState,
} from "react";
import { Tooltip } from "@mui/material";

const spanStyle = { cursor: "pointer" };

const CopyTooltip = ({
  text,
  children,
  initialToolTipText = "Copy to clipboard",
  onCopy,
}: {
  text: string;
  children?: ReactNode;
  initialToolTipText?: string;
  onCopy?: () => void;
}): ReactElement => {
  const [tooltipText, setTooltipText] = useState(initialToolTipText);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isCopyEnabled, setIsCopyEnabled] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCopy = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      e.stopPropagation();

      let timeout: NodeJS.Timeout | undefined;

      try {
        navigator.clipboard
          .writeText(text)
          .then(() => setTooltipText("Copied"));
        setShowConfirmation(false);
        setShowTooltip(true);
        timeout = setTimeout(() => {
          if (isCopyEnabled) {
            setShowTooltip(false);
            setTooltipText(initialToolTipText);
          }
        }, 750);
        onCopy?.();
      } catch (err) {
        setIsCopyEnabled(false);
        setTooltipText("Copying is disabled in your browser");
      }

      return () => clearTimeout(timeout);
    },
    [showConfirmation, text, onCopy, isCopyEnabled, initialToolTipText]
  );

  return (
    <>
      <Tooltip
        title={tooltipText}
        open={showTooltip}
        onOpen={() => setShowTooltip(true)}
        onClose={() => setShowTooltip(false)}
        placement="top"
        TransitionProps={{
          // Otherwise the initialToolTipText is briefly visible during the exit animation
          exit: false,
        }}
      >
        <span onClick={handleCopy} style={spanStyle}>
          {children}
        </span>
      </Tooltip>
    </>
  );
};

export default CopyTooltip;
