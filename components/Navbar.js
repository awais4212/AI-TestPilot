// ```javascript
// components/Navbar.js

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-[#07111F]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-400/15 text-sky-300 font-bold">
            AT
          </span>
          <span className="text-lg font-bold text-white">
            AI TestPilot
          </span>
        </Link>

        <nav className="flex items-center gap-5 text-sm">
          <Link
            href="/dashboard"
            className="text-slate-300 hover:text-sky-300"
          >
            Dashboard
          </Link>
          <Link
            href="/workspace"
            className="rounded-lg bg-sky-400 px-4 py-2 font-semibold text-slate-950 hover:bg-sky-300"
          >
            New Test
          </Link>
        </nav>
      </div>
    </header>
  );
}
// ```
