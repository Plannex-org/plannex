import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "@/components/layout/app-shell";
import { projectsMockApi, type Project } from "../api/projects.mock";

export default function ProjectsPage() {
  const nav = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);

  const load = async () => setProjects(await projectsMockApi.list());

  useEffect(() => {
    load();
  }, []);

  const createProject = async () => {
    const p = await projectsMockApi.create();
    nav(`/projects/${p.id}`);
  };

  const deleteProject = async (id: string) => {
    const ok = window.confirm("Delete this project?");
    if (!ok) return;

    await projectsMockApi.remove(id);
    await load();
  };

  return (
    <AppShell>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#000157]">My Projects</h1>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-white/70 px-3 py-2 rounded-full text-sm text-black/50">
            <span className="material-symbols-outlined text-[18px]">search</span>
            <input
              className="bg-transparent outline-none placeholder:text-black/40 w-40"
              placeholder="Search projects..."
            />
          </div>

          <button
            onClick={createProject}
            className="rounded-full bg-[#6366F1] text-white px-4 py-2 text-sm"
          >
            + New project
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="bg-white/60 rounded-2xl p-5">
            <div className="text-[#000157] font-medium">{p.name}</div>
            <div className="text-xs text-black/50 mt-1">
              {p.startDate || "dd/mm/yy"}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                className="bg-pink-500 text-white text-sm rounded-full px-5 py-2"
                onClick={() => nav(`/projects/${p.id}`)}
              >
                Open
              </button>
              
              <button
                className="bg-pink-500 text-white text-sm rounded-full px-5 py-2"
                onClick={() => deleteProject(p.id)}
              >
                Delete
              </button>

              
            </div>
          </div>
        ))}

        {!projects.length && (
          <div className="text-sm text-black/60">
            No projects yet. Click{" "}
            <span className="font-medium">New project</span> to create one.
          </div>
        )}
      </div>
    </AppShell>
  );
}
