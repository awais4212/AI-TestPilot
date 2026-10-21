// ```javascript
// app/workspace/page.js

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import ProjectForm from "../../components/ProjectForm";

export default function WorkspacePage() {
  return (
    <div className="min-h-screen bg-[#07111F]">
      <Navbar />

      <div className="mx-auto flex max-w-7xl flex-col md:flex-row">
        <Sidebar />

        <main className="min-w-0 flex-1 p-5 sm:p-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-medium text-sky-300">
              AI-assisted QA
            </p>
            <h1 className="mt-2 text-3xl font-bold text-white">
              Create a Testing Project
            </h1>
            <p className="mt-3 leading-6 text-slate-400">
              Describe your software requirements to generate
              actionable test cases.
            </p>

            <div className="mt-8">
              <ProjectForm />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
// ```