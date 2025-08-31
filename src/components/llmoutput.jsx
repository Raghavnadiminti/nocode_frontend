// LLMOverlay.tsx
import React, { useEffect, useRef } from "react";

export default function LLMOverlay({
  open,
  onClose,
  title = "Run Output",
  content,
}) {
  const dialogRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z- flex items-end sm:items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Window */}
      <div
        ref={dialogRef}
        className="
          relative w-full sm:max-w-2xl mx-2 sm:mx-4 rounded-2xl bg-white shadow-2xl
          ring-1 ring-black/5
          animate-[fadeIn_150ms_ease-out]
        "
      >
        <div className="flex items-center justify-between px-5 py-3 border-b">
          <h3 className="text-base font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="rounded p-1 hover:bg-gray-100"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="max-h-[60vh] overflow-auto p-5">
          {/* Render plain text or JSX */}
          {typeof content === "string" ? (
            <pre className="whitespace-pre-wrap text-sm text-gray-800">
              {content}
            </pre>
          ) : (
            content
          )}
        </div>

        <div className="flex justify-end gap-2 px-5 py-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
