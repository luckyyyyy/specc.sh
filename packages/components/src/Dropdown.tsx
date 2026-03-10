import { type CSSProperties, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface DropdownProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
  /**
   * Preferred alignment direction, defaults to "left".
   * Automatically flips to the other side when viewport space is insufficient.
   */
  align?: "left" | "right";
  className?: string;
  /** Extra classes applied to the floating panel element. */
  panelClassName?: string;
}

const GAP = 6; // px gap between trigger bottom/top and panel
const MIN_PANEL_HEIGHT = 150; // flip upward only when at least this much space above

export function Dropdown({
  open,
  onOpenChange,
  trigger,
  children,
  align = "left",
  className = "",
  panelClassName = "",
}: DropdownProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  // Start hidden so there's no position flash on first render
  const [panelStyle, setPanelStyle] = useState<CSSProperties>({
    visibility: "hidden",
    position: "fixed",
  });

  // Close on outside click — must check both trigger and portal panel
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!triggerRef.current?.contains(t) && !panelRef.current?.contains(t)) {
        onOpenChange(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onOpenChange]);

  // Re-compute fixed position from real viewport metrics every time the panel opens.
  // Using fixed positioning + portal means overflow:hidden on any ancestor is bypassed.
  useEffect(() => {
    if (!open || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const goAbove = spaceBelow < MIN_PANEL_HEIGHT && spaceAbove > spaceBelow;

    const next: CSSProperties = {
      position: "fixed",
      zIndex: 9999,
      minWidth: Math.max(rect.width, 200),
    };

    // Vertical anchor
    if (goAbove) {
      next.bottom = window.innerHeight - rect.top + GAP;
    } else {
      next.top = rect.bottom + GAP;
    }

    // Horizontal anchor — always measure actual space, `align` is just a preference
    const spaceIfLeft = window.innerWidth - rect.left;
    const spaceIfRight = rect.right;
    const useRight =
      align === "right"
        ? spaceIfRight >= 200 || spaceIfRight >= spaceIfLeft
        : spaceIfLeft < 200 && spaceIfRight > spaceIfLeft;

    if (useRight) {
      next.right = window.innerWidth - rect.right;
    } else {
      next.left = rect.left;
    }

    setPanelStyle(next);
  }, [open, align]);

  // Reset to hidden when closed so stale coords don't flash on next open
  useEffect(() => {
    if (!open) setPanelStyle({ visibility: "hidden", position: "fixed" });
  }, [open]);

  return (
    <div
      ref={triggerRef}
      className={className}
      onClick={() => onOpenChange(!open)}
    >
      {trigger}
      {open &&
        createPortal(
          <div
            ref={panelRef}
            style={panelStyle}
            className={`min-w-[200px] rounded-md border bg-[var(--ui-bg-element)] border-[var(--ui-border)] shadow-lg py-1 ${panelClassName}`}
          >
            {children}
          </div>,
          document.body,
        )}
    </div>
  );
}

/** Reusable item inside a Dropdown */
export function DropdownItem({
  onClick,
  children,
  danger,
  disabled,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
        danger
          ? "text-[var(--ui-danger-text)] hover:bg-[var(--ui-danger-bg)]"
          : "text-[var(--ui-text)] hover:bg-[var(--ui-bg-hover)]"
      }`}
    >
      {children}
    </button>
  );
}

/** Thin divider inside a Dropdown */
export function DropdownDivider() {
  return <div className="my-1 border-t border-[var(--ui-border)]" />;
}
