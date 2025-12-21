export type Project = {
  id: string;
  name: string;
  startDate?: string; // yyyy-mm-dd
  createdAt: number;
};

const KEY = "plannex_projects";
const read = (): Project[] => JSON.parse(localStorage.getItem(KEY) || "[]");
const write = (projects: Project[]) => localStorage.setItem(KEY, JSON.stringify(projects));

const notify = () => window.dispatchEvent(new Event("projects:changed"));

export const projectsMockApi = {
  list: async () => read(),

  create: async () => {
    const projects = read();
    const p: Project = { id: `p-${Date.now()}`, name: "Project name", createdAt: Date.now() };
    write([p, ...projects]);
    notify();
    return p;
  },

  getById: async (id: string) => read().find((p) => p.id === id) || null,

  update: async (id: string, patch: Partial<Project>) => {
    const projects = read();
    const i = projects.findIndex((p) => p.id === id);
    if (i === -1) throw new Error("Project not found");
    projects[i] = { ...projects[i], ...patch };
    write(projects);
    notify();
    return projects[i];
  },

  remove: async (id: string) => {
    const projects = read();
    const next = projects.filter((p) => p.id !== id);
    write(next);
    notify();
    return true;
  },
};
