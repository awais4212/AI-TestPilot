import Link from "next/link";
import Navbar from "../components/Navbar";

const features = [
  {
    number: "01",
    title: "AI Test Generation",
    description:
      "Generate practical test scenarios from requirements and feature descriptions.",
  },
  {
    number: "02",
    title: "Edge Case Discovery",
    description:
      "Explore boundary values, invalid inputs, and potential failure conditions.",
  },
  {
    number: "03",
    title: "Failure Analysis",
    description:
      "Investigate reported failures and receive possible causes and recommended checks.",
  },
  {
    number: "04",
    title: "Validation Reports",
    description:
      "Track recorded test outcomes and export structured testing reports.",
  },
];

const workflow = [
  ["01", "Describe", "Provide the feature requirements."],
  ["02", "Generate", "Let AI propose relevant test cases."],
  ["03", "Validate", "Run the tests and record actual outcomes."],
  ["04", "Report", "Review results and export your report."],
];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#07111F]">
      <Navbar />

      <main>
        <section className="relative px-5 py-24 sm:py-32">
          <div className="pointer-events-none absolute left-1/2 top-10 -z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-5xl text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-sm text-sky-300">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              AI-powered software quality assurance
            </div>

            <h1 className="mt-8 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              Test Smarter.
              <span className="block text-sky-400">
                Ship with Confidence.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              Turn software requirements into actionable test cases.
              Record real test results, investigate potential failures,
              and generate clear validation reports with AI assistance.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/workspace"
                className="rounded-xl bg-sky-400 px-7 py-4 font-bold text-slate-950 transition hover:bg-sky-300"
              >
                Start Testing →
              </Link>

              <Link
                href="/dashboard"
                className="rounded-xl border border-slate-700 px-7 py-4 font-semibold text-white transition hover:bg-slate-800"
              >
                Open Dashboard
              </Link>
            </div>

            <p className="mt-5 text-xs text-slate-500">
              AI-generated test cases are suggestions until executed
              and verified.
            </p>
          </div>
        </section>

        <section className="border-y border-slate-800 bg-[#0B1627]/70 px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
                Core capabilities
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Everything you need to test with clarity
              </h2>
              <p className="mt-4 leading-7 text-slate-400">
                Organize your testing workflow from initial requirements
                to recorded outcomes and useful reports.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <article
                  key={feature.number}
                  className="rounded-2xl border border-slate-800 bg-[#0F1B2D] p-6 transition hover:-translate-y-1 hover:border-sky-400/40"
                >
                  <span className="text-sm font-bold text-sky-300">
                    {feature.number}
                  </span>

                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                From requirements to results
              </h2>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {workflow.map(([number, title, description]) => (
                <article
                  key={number}
                  className="rounded-2xl border border-slate-800 p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-400/10 font-bold text-sky-300">
                    {number}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-24">
          <div className="mx-auto max-w-5xl rounded-3xl border border-sky-400/20 bg-gradient-to-br from-[#0F2A43] to-[#0F1B2D] px-6 py-12 text-center sm:px-12">
            <h2 className="text-3xl font-bold text-white">
              Ready to improve your testing workflow?
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-300">
              Start with a feature description and build your first
              AI-assisted testing project.
            </p>
            <Link
              href="/workspace"
              className="mt-7 inline-flex rounded-xl bg-sky-400 px-7 py-4 font-bold text-slate-950 hover:bg-sky-300"
            >
              Create a Testing Project
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 px-5 py-6 text-center text-sm text-slate-500">
        AI TestPilot — AI-assisted testing, with human-verified results.
      </footer>
    </div>
  );
}

