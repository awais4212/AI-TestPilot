// ```javascript
// components/LoadingState.js

export default function LoadingState({
  message = "Analyzing your requirements...",
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-700 bg-slate-900/70 p-10 text-center"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-sky-400" />

      <div>
        <p className="font-semibold text-white">{message}</p>
        <p className="mt-1 text-sm text-slate-400">
          This may take a few seconds.
        </p>
      </div>
    </div>
  );
}
// ```