import { useEffect } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  id: string;
  type: ToastType;
  content: string;
  route?: string;
}

const TYPE_CONFIG: Record<
  ToastType,
  { borderColor: string; iconText: string; iconColor: string }
> = {
  success: {
    borderColor: "#22c55e",
    iconText: "✓",
    iconColor: "#22c55e",
  },
  error: {
    borderColor: "#ef4444",
    iconText: "✕",
    iconColor: "#ef4444",
  },
  info: {
    borderColor: "#3b82f6",
    iconText: "ℹ",
    iconColor: "#3b82f6",
  },
  warning: {
    borderColor: "#f59e0b",
    iconText: "⚠",
    iconColor: "#f59e0b",
  },
};

// Auto-dismiss duration (ms)
const DISMISS_MS = 6000;

interface ToastItemProps {
  item: ToastMessage;
  onClose: (id: string) => void;
}

function ToastItem({ item, onClose }: ToastItemProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(item.id), DISMISS_MS);
    return () => clearTimeout(timer);
  }, [item.id, onClose]);

  const cfg = TYPE_CONFIG[item.type];

  return (
    <div
      className="flex items-start w-80 rounded-md shadow-lg border border-[var(--ui-border)] border-l-[3px] overflow-hidden bg-[var(--ui-bg)]"
      style={{ borderLeftColor: cfg.borderColor }}
    >
      {/* Icon */}
      <div
        className="flex-shrink-0 flex items-center justify-center w-9 pt-3 pb-3 pl-3 text-sm font-bold"
        style={{ color: cfg.iconColor }}
        aria-hidden="true"
      >
        {cfg.iconText}
      </div>

      {/* Body */}
      <div className="flex-1 px-2 py-3 min-w-0 overflow-hidden">
        <p className="text-sm font-medium leading-snug break-words text-[var(--ui-text)]">
          {item.content}
        </p>
        {item.route && (
          <p
            className="mt-1 text-xs font-mono truncate text-[var(--ui-text-muted)]"
            title={item.route}
          >
            {item.route}
          </p>
        )}
      </div>

      {/* Close button */}
      <button
        type="button"
        onClick={() => onClose(item.id)}
        className="flex-shrink-0 p-3 cursor-pointer transition-colors hover:opacity-70 text-[var(--ui-text-muted)]"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}

export interface ToasterProps {
  items: ToastMessage[];
  onClose: (id: string) => void;
}

export function Toaster({ items, onClose }: ToasterProps) {
  if (items.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      {items.map((item) => (
        <div key={item.id} className="pointer-events-auto">
          <ToastItem item={item} onClose={onClose} />
        </div>
      ))}
    </div>
  );
}
