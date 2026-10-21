// ```javascript
// components/Sidebar.js

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: "▦" },
  { href: "/workspace", label: "New Testing Project", icon: "+" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 border-b border-slate-800 bg-[#0B1627] p-4 md:min-h-[calc(100vh-73px)] md:w-64 md:border-b-0 md:border-r">
      <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
        Workspace
      </p>

      <nav className="space-y-2">
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                active
                  ? "bg-sky-400/10 text-sky-300"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-sm font-semibold text-white">
          AI TestPilot
        </p>
        <p className="mt-2 text-xs leading-5 text-slate-400">
          Generate test scenarios, record outcomes, and investigate
          potential failures.
        </p>
      </div>
    </aside>
  );
}
// ```
