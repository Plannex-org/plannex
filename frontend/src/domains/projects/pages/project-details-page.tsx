import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import AppShell from "@/components/layout/app-shell";
import { projectsMockApi } from "../services/projects.mock";
import { tasksMockApi, type Task, type TaskStatus } from "@/domains/tasks/services/tasks.mock";
import PertCanvas from "@/domains/pert/components/pert-canvas";

type Tab = "Tasks" | "Pert" | "Gantt";

export default function ProjectDetailsPage() {
  const { projectId } = useParams();
  const pid = projectId || "";

  const [tab, setTab] = useState<Tab>("Tasks");
  const [projectName, setProjectName] = useState("Project name");
  const [startDate, setStartDate] = useState<string>("");

  const [tasks, setTasks] = useState<Task[]>([]);

  // modal state
  const [showAdd, setShowAdd] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [durationDays, setDurationDays] = useState(1);
  const [status, setStatus] = useState<TaskStatus>("NotStarted");
  const [predecessors, setPredecessors] = useState<string[]>([]);

  const load = async () => {
    const p = await projectsMockApi.getById(pid);
    if (p) {
      setProjectName(p.name);
      setStartDate(p.startDate || "");
    }
    setTasks(await tasksMockApi.list(pid));
  };

  useEffect(() => {
    if (pid) load();
  }, [pid]);

  const pertTasks = useMemo(() => {
    return tasks.map((t) => ({
      key: t.id,
      text: t.name,
      duration: t.durationDays,
      dependsOn: t.predecessors.length ? t.predecessors : undefined,
    }));
  }, [tasks]);

  const saveProjectMeta = async () => {
    await projectsMockApi.update(pid, { name: projectName, startDate });
  };

  const togglePred = (id: string) => {
    setPredecessors((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const addTask = async () => {
    if (!taskName.trim()) return;
    await tasksMockApi.create(pid, {
      name: taskName.trim(),
      durationDays,
      predecessors,
      status,
    });
    setShowAdd(false);
    setTaskName("");
    setDurationDays(1);
    setStatus("NotStarted");
    setPredecessors([]);
    load();
  };

  return (
    <AppShell>
      <div className="flex items-start justify-between">
        <div>
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            onBlur={saveProjectMeta}
            className="text-2xl font-semibold text-[#000157] bg-transparent outline-none"
          />
          <div className="mt-1">
            <input
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              onBlur={saveProjectMeta}
              type="date"
              className="text-sm text-black/60 bg-transparent outline-none"
            />
          </div>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="rounded-full bg-[#6366F1] text-white px-4 py-2 text-sm"
        >
          + New task
        </button>
      </div>

      {/* Tabs */}
      <div className="mt-8 bg-white/60 rounded-full p-1 w-full max-w-xl flex">
        {(["Tasks", "Pert", "Gantt"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 text-sm py-2 rounded-full ${
              tab === t ? "bg-[#6366F1] text-white" : "text-[#000157]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6">
        {tab === "Tasks" && (
          <div className="bg-white/70 rounded-2xl p-4">
            <div className="grid grid-cols-4 text-xs text-black/60 border-b border-black/10 pb-2">
              <div>Task name</div>
              <div>Duration</div>
              <div>Predecessors</div>
              <div>Status</div>
            </div>

            <div className="divide-y divide-black/5">
              {tasks.map((t) => (
                <div key={t.id} className="grid grid-cols-4 text-sm py-3 items-center">
                  <div className="text-[#000157]">{t.name}</div>
                  <div>{t.durationDays} days</div>
                  <div className="text-black/60">
                    {t.predecessors.length ? t.predecessors.length : "-"}
                  </div>
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        t.status === "Completed"
                          ? "bg-green-500 text-white"
                          : t.status === "InProgress"
                          ? "bg-indigo-500 text-white"
                          : "bg-pink-500 text-white"
                      }`}
                    >
                      {t.status === "NotStarted"
                        ? "Not started"
                        : t.status === "InProgress"
                        ? "In progress"
                        : "Completed"}
                    </span>
                  </div>
                </div>
              ))}

              {!tasks.length && (
                <div className="text-sm text-black/60 py-6">
                  No tasks yet. Click <span className="font-medium">New task</span>.
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "Pert" && <PertCanvas tasks={pertTasks} />}

        {tab === "Gantt" && (
          <div className="bg-white/70 rounded-2xl p-6 text-sm text-black/60">
            Gantt chart will be implemented later.
          </div>
        )}
      </div>

      {/* Add Task modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold text-[#000157]">New task</div>
              <button onClick={() => setShowAdd(false)} className="text-black/60">
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <input
                className="w-full rounded-lg bg-[#EDEDF8] p-3 text-sm outline-none"
                placeholder="Task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  min={1}
                  className="w-full rounded-lg bg-[#EDEDF8] p-3 text-sm outline-none"
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                />
                <select
                  className="w-full rounded-lg bg-[#EDEDF8] p-3 text-sm outline-none"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as TaskStatus)}
                >
                  <option value="NotStarted">Not started</option>
                  <option value="InProgress">In progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <div className="text-xs text-black/60 mb-2">Predecessors</div>
                <div className="flex flex-wrap gap-2">
                  {tasks.map((t) => (
                    <label
                      key={t.id}
                      className="text-xs border border-black/10 rounded-full px-3 py-1 flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        checked={predecessors.includes(t.id)}
                        onChange={() => togglePred(t.id)}
                      />
                      <span className="truncate max-w-[180px]">{t.name}</span>
                    </label>
                  ))}
                  {!tasks.length && <div className="text-xs text-black/50">No tasks yet</div>}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowAdd(false)}
                  className="rounded-full px-4 py-2 text-sm border border-black/10"
                >
                  Cancel
                </button>
                <button
                  onClick={addTask}
                  className="rounded-full px-5 py-2 text-sm bg-[#6366F1] text-white"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
