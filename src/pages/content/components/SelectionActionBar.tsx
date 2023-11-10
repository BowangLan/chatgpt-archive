import React from "react";
import { Check, MoreHorizontal, XSquare } from "lucide-react";
import { cn } from "@src/lib/utils";

export function SelectionActionBar({
  className,
  enabled,
  left,
  right,
}: {
  className?: string;
  enabled: boolean;
  left: () => React.ReactNode;
  right: () => React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 right-0 z-20 flex items-center h-12 rounded-md bg-2 page-px page-mx trans",
        className
      )}
      style={{
        opacity: enabled ? 1 : 0,
        zIndex: enabled ? "999" : "-10",
        transform: enabled ? "translateY(0)" : "translateY(50%)",
      }}
    >
      <div className="flex items-center gap-2">{left && left()}</div>

      <div className="flex-1 min-w-0"></div>

      <div className="flex items-center gap-2">{right && right()}</div>
    </div>
  );
}

export function SelectAllButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="icon-container icon-container-sm"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <Check />
    </div>
  );
}

export function ClearSelectionButton({
  setSelection,
}: {
  setSelection: React.Dispatch<React.SetStateAction<Set<string>>>;
}) {
  return (
    <div
      className="icon-container icon-container-sm"
      onClick={(e) => {
        e.preventDefault();
        setSelection(new Set());
      }}
    >
      <XSquare />
    </div>
  );
}
