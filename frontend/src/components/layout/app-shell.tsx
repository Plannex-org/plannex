import { type PropsWithChildren, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/auth-context";
import { projectsMockApi, type Project } from "@/domains/projects/services/projects.mock";

export default function AppShell({ children }: PropsWithChildren) {
  const { logout } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsOpen, setProjectsOpen] = useState(true);

  const isInProjects = useMemo(
    () => loc.pathname === "/projects" || loc.pathname.startsWith("/projects/"),
    [loc.pathname]
  );

  const loadProjects = async () => {
    const list = await projectsMockApi.list();
    setProjects(list);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (isInProjects) setProjectsOpen(true);
  }, [isInProjects]);

  useEffect(() => {
    const onStorage = () => loadProjects();
    window.addEventListener("storage", onStorage);

    const onProjectsChanged = () => loadProjects();
    window.addEventListener("projects:changed", onProjectsChanged as EventListener);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("projects:changed", onProjectsChanged as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#EDEDF8] flex">
      <aside className="w-[240px] bg-[#EDEDF8] border-r border-black/5 px-6 py-6 flex flex-col">
        <div className="text-2xl font-bold text-[#000157]">Plannex</div>

        <div className="mt-10">
          <button
            type="button"
            onClick={() => nav("/projects")}
            className={[
              "w-full flex items-center justify-between text-sm rounded-xl px-3 py-2",
              isInProjects
                ? "bg-white/70 text-[#000157]"
                : "text-black/60 hover:bg-white/40",
            ].join(" ")}
          >
            <span className="font-medium">Projects</span>

            <span
              className={[
                "material-symbols-outlined text-base transition-transform",
                projectsOpen ? "rotate-180" : "",
              ].join(" ")}
              onClick={(e) => {
                e.stopPropagation();
                setProjectsOpen((v) => !v);
              }}
            >
              expand_more
            </span>
          </button>

          {projectsOpen && (
            <div className="mt-2 ml-3 border-l border-white/40 pl-3 space-y-1 text-sm">
              {projects.length === 0 ? (
                <div className="text-xs text-black/50 px-3 py-2">No projects yet</div>
              ) : (
                projects.slice(0, 6).map((p) => (
                  <NavLink
                    key={p.id}
                    to={`/projects/${p.id}`}
                    className={({ isActive }) =>
                      [
                        "block px-3 py-2 rounded-xl truncate",
                        isActive
                          ? "bg-white/70 text-[#000157] font-medium"
                          : "text-black/60 hover:bg-white/40",
                      ].join(" ")
                    }
                    title={p.name}
                  >
                    {p.name}
                  </NavLink>
                ))
              )}
            </div>
          )}
        </div>

        <button
          className="mt-auto w-fit rounded-full bg-[#6366F1] text-white px-5 py-2 text-sm"
          onClick={() => {
            logout();
            nav("/login");
          }}
        >
          Sign out
        </button>
      </aside>

      <main className="flex-1">
        <div className="h-14 px-8 flex items-center justify-end">
          <div className="flex items-center gap-2 text-sm text-[#000157]">
            <span className="material-symbols-outlined text-[18px]">person</span>
            <span>yamina</span>
          </div>
        </div>

        <div className="px-10 py-8">{children}</div>
      </main>
    </div>
  );
}
