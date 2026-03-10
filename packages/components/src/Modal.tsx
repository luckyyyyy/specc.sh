import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  maxWidth = "max-w-md",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div
        className={`w-full ${maxWidth} rounded-lg border shadow-xl bg-[var(--ui-bg)] border-[var(--ui-border)]`}
      >
        {title && (
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[var(--ui-border)]">
            <h2 className="text-base font-semibold text-[var(--ui-text)]">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer text-[var(--ui-text-muted)] hover:text-[var(--ui-text)] transition-colors text-lg leading-none"
            >
              ✕
            </button>
          </div>
        )}
        <div className="p-6 text-[var(--ui-text)]">{children}</div>
        {footer && (
          <div className="px-6 pb-5 flex justify-end gap-2">{footer}</div>
        )}
      </div>
    </div>,
    document.body,
  );
}
