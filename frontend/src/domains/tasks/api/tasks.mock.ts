export type TaskStatus = "NotStarted" | "InProgress" | "Completed";

export type Task = {
  id: string;
  projectId: string;
  name: string;
  durationDays: number;
  predecessors: string[]; // task ids
  status: TaskStatus;
};

const keyFor = (projectId: string) => `plannex_tasks:${projectId}`;
const read = (projectId: string): Task[] => JSON.parse(localStorage.getItem(keyFor(projectId)) || "[]");
const write = (projectId: string, tasks: Task[]) => localStorage.setItem(keyFor(projectId), JSON.stringify(tasks));

export const tasksMockApi = {
  list: async (projectId: string) => read(projectId),

  create: async (projectId: string, payload: Omit<Task, "id" | "projectId">) => {
    const tasks = read(projectId);
    const t: Task = { id: `t-${Date.now()}`, projectId, ...payload };
    write(projectId, [t, ...tasks]);
    return t;
  },
};
