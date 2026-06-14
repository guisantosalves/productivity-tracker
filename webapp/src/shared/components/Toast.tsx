import React, { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
}

// ─── Store ────────────────────────────────────────────────────────────────────

let snapshot: ToastItem[] = [];
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

const toastStore = {
  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
  getSnapshot() {
    return snapshot;
  },
  add(item: Omit<ToastItem, "id">) {
    snapshot = [...snapshot, { ...item, id: crypto.randomUUID() }];
    notify();
  },
  remove(id: string) {
    snapshot = snapshot.filter((t) => t.id !== id);
    notify();
  },
};

// ─── Public API ───────────────────────────────────────────────────────────────

const create =
  (type: ToastType) =>
  (message: string, duration = 4000) =>
    toastStore.add({ type, message, duration });

export const toast = {
  success: create("success"),
  error: create("error"),
  warning: create("warning"),
  info: create("info"),
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const typeConfig: Record<
  ToastType,
  { icon: React.FC<{ size: number }>; classes: string }
> = {
  success: {
    icon: ({ size }) => <CheckCircle2 size={size} className="text-green-500" />,
    classes: "border-green-200 bg-white",
  },
  error: {
    icon: ({ size }) => <XCircle size={size} className="text-red-500" />,
    classes: "border-red-200 bg-white",
  },
  warning: {
    icon: ({ size }) => (
      <AlertTriangle size={size} className="text-amber-500" />
    ),
    classes: "border-[#f0d98a] bg-[#fffbee]",
  },
  info: {
    icon: ({ size }) => <Info size={size} className="text-primary" />,
    classes: "border-border bg-white",
  },
};

// ─── Toast Item ───────────────────────────────────────────────────────────────

const ToastCard: React.FC<{ item: ToastItem }> = ({ item }) => {
  const [visible, setVisible] = useState(false);
  const { icon: Icon, classes } = typeConfig[item.type];

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    const hide = setTimeout(() => setVisible(false), item.duration - 300);
    const remove = setTimeout(() => toastStore.remove(item.id), item.duration);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(hide);
      clearTimeout(remove);
    };
  }, [item.id, item.duration]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => toastStore.remove(item.id), 300);
  };

  return (
    <div
      className={[
        "flex items-start gap-3 w-80 px-4 py-3 rounded-md border shadow-md",
        "transition-all duration-300",
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full",
        classes,
      ].join(" ")}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <span className="shrink-0 mt-0.5">
        <Icon size={16} />
      </span>

      <p className="flex-1 text-sm leading-snug">{item.message}</p>

      <button
        onClick={handleClose}
        className="shrink-0 mt-0.5 text-[var(--muted-foreground)] hover:text-foreground transition-colors cursor-pointer"
        aria-label="Fechar"
      >
        <X size={14} />
      </button>
    </div>
  );
};

// ─── Container ────────────────────────────────────────────────────────────────

export const ToastContainer: React.FC = () => {
  const toasts = useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getSnapshot,
  );

  const toastRoot = document.getElementById("toast-root");
  if (!toastRoot) return null;

  return createPortal(
    <div className="fixed top-4 right-4 z-[60] flex flex-col gap-2">
      {toasts.map((item) => (
        <ToastCard key={item.id} item={item} />
      ))}
    </div>,
    toastRoot,
  );
};
