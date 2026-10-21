// ```javascript
// components/StatusBadge.js

const styles = {
  "Not Run": "bg-slate-500/15 text-slate-300 border-slate-500/30",
  Passed: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Failed: "bg-red-500/15 text-red-300 border-red-500/30",
  Blocked: "bg-amber-500/15 text-amber-300 border-amber-500/30",
};

export default function StatusBadge({ status = "Not Run" }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${
        styles[status] || styles["Not Run"]
      }`}
    >
      {status}
    </span>
  );
}
// ```
