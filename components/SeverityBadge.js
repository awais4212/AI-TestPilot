// ```javascript
// components/SeverityBadge.js

const styles = {
  Low: "bg-slate-500/15 text-slate-300 border-slate-500/30",
  Medium: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  High: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  Critical: "bg-red-500/15 text-red-300 border-red-500/30",
};

export default function SeverityBadge({ severity = "Medium" }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${
        styles[severity] || styles.Medium
      }`}
    >
      {severity}
    </span>
  );
}
// ```
