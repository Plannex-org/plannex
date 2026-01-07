import { useMemo } from "react";

type AppTask = {
  id: string;
  name: string;
  durationDays: number; // working days
  predecessors: string[]; // ids
};

type Props = {
  projectStart?: string | Date | null;
  tasks: AppTask[];
};

// Weekend = Friday(5) + Saturday(6)
const isWeekend = (d: Date) => {
  const day = d.getDay(); // 0 Sun .. 6 Sat
  return day === 5 || day === 6;
};

const addDays = (date: Date, n: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
};

const nextWorkingDay = (date: Date) => {
  let d = new Date(date);
  while (isWeekend(d)) d = addDays(d, 1);
  return d;
};

const addWorkingDays = (start: Date, durationDays: number) => {
  let d = nextWorkingDay(start);
  let remaining = Math.max(1, Math.floor(durationDays || 1));
  while (remaining > 0) {
    d = addDays(d, 1);
    if (!isWeekend(d)) remaining -= 1;
  }
  return d; // end boundary
};

const fmt = (d: Date) =>
  `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${d.getFullYear()}`;

function toDateSafe(d?: string | Date | null): Date {
  if (!d) return new Date();
  if (d instanceof Date) return d;
  const parsed = new Date(d);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
}

function schedule(baseStartRaw: Date, tasks: AppTask[]) {
  const baseStart = nextWorkingDay(baseStartRaw);
  const byId = new Map(tasks.map((t) => [t.id, t]));

  // Graph
  const indeg = new Map<string, number>();
  const adj = new Map<string, string[]>();
  for (const t of tasks) {
    indeg.set(t.id, 0);
    adj.set(t.id, []);
  }

  for (const t of tasks) {
    const preds = (t.predecessors || []).filter((p) => byId.has(p));
    for (const p of preds) {
      indeg.set(t.id, (indeg.get(t.id) || 0) + 1);
      adj.get(p)!.push(t.id);
    }
  }

  // topo
  const q: string[] = [];
  for (const [id, d] of indeg.entries()) if (d === 0) q.push(id);

  const order: string[] = [];
  while (q.length) {
    const id = q.shift()!;
    order.push(id);
    for (const nxt of adj.get(id) || []) {
      indeg.set(nxt, (indeg.get(nxt) || 0) - 1);
      if (indeg.get(nxt) === 0) q.push(nxt);
    }
  }

  const hasCycle = order.length !== tasks.length;

  const startById = new Map<string, Date>();
  const endById = new Map<string, Date>();

  if (hasCycle) {
    // fallback sequential
    let cursor = new Date(baseStart);
    for (const t of tasks) {
      const s = nextWorkingDay(cursor);
      const e = addWorkingDays(s, t.durationDays);
      startById.set(t.id, s);
      endById.set(t.id, e);
      cursor = new Date(e);
    }
  } else {
    for (const id of order) {
      const t = byId.get(id)!;
      const preds = (t.predecessors || []).filter((p) => endById.has(p));

      let s = new Date(baseStart);
      if (preds.length) {
        let maxEnd = new Date(baseStart);
        for (const p of preds) {
          const pe = endById.get(p)!;
          if (pe > maxEnd) maxEnd = pe;
        }
        s = new Date(maxEnd);
      }
      s = nextWorkingDay(s);
      const e = addWorkingDays(s, t.durationDays);

      startById.set(id, s);
      endById.set(id, e);
    }
  }

  // sorted rows
  const rows = [...tasks]
    .map((t) => ({
      ...t,
      start: startById.get(t.id)!,
      end: endById.get(t.id)!,
    }))
    .sort((a, b) => a.start.getTime() - b.start.getTime() || a.name.localeCompare(b.name));

  return { rows, hasCycle };
}

function dayDiff(a: Date, b: Date) {
  // difference in days ignoring timezone mess by using UTC dates
  const ua = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const ub = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((ub - ua) / (1000 * 60 * 60 * 24));
}

export default function ProjectGantt({ projectStart, tasks }: Props) {
  const baseStart = useMemo(() => toDateSafe(projectStart), [projectStart]);

  const { rows, hasCycle } = useMemo(() => schedule(baseStart, tasks), [baseStart, tasks]);

  if (!tasks.length) {
    return (
      <div className="bg-white/70 rounded-2xl p-6 text-sm text-black/60">
        No tasks yet. Add tasks first to generate the Gantt chart.
      </div>
    );
  }

  const minStart = rows.reduce((m, r) => (r.start < m ? r.start : m), rows[0].start);
  const maxEnd = rows.reduce((m, r) => (r.end > m ? r.end : m), rows[0].end);

  const totalDays = Math.max(1, dayDiff(minStart, maxEnd));
  const pxPerDay = 34; // tweak for zoom
  const timelineWidth = totalDays * pxPerDay;

  // header days
  const days = Array.from({ length: totalDays + 1 }, (_, i) => addDays(minStart, i));

  return (
    <div className="bg-white/70 rounded-2xl p-4 overflow-hidden">
      {hasCycle && (
        <div className="mb-3 rounded-xl bg-[#EDEDF8] p-3 text-xs text-[#000157]">
          Cycle detected in dependencies. Showing a fallback order.
        </div>
      )}

      <div className="overflow-x-auto">
        <div style={{ minWidth: 820 }}>
          {/* Header */}
          <div className="flex gap-4 text-xs text-black/60 mb-3">
            <div className="w-[240px] font-medium text-black/70">Task</div>
            <div className="w-[110px] text-center">Start</div>
            <div className="w-[110px] text-center">Duration</div>

            <div className="flex-1">
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${totalDays + 1}, ${pxPerDay}px)`,
                  width: timelineWidth,
                }}
              >
                {days.map((d, idx) => (
                  <div
                    key={idx}
                    className={`text-center py-1 border-l border-black/10 ${
                      isWeekend(d) ? "bg-black/5" : ""
                    }`}
                    title={d.toDateString()}
                  >
                    {d.toLocaleDateString(undefined, { weekday: "short", day: "2-digit" })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rows */}
          <div className="space-y-3">
            {rows.map((t) => {
              const left = dayDiff(minStart, t.start) * pxPerDay;
              const width = Math.max(pxPerDay, dayDiff(t.start, t.end) * pxPerDay);

              return (
                <div key={t.id} className="flex gap-4 items-center">
                  <div className="w-[240px] text-[#000157] font-medium truncate">{t.name}</div>
                  <div className="w-[110px] text-center text-sm text-black/70">{fmt(t.start)}</div>
                  <div className="w-[110px] text-center text-sm text-black/70">
                    {t.durationDays} d
                  </div>

                  <div className="flex-1">
                    <div
                      className="relative h-10 rounded-xl bg-black/5 overflow-hidden"
                      style={{ width: timelineWidth }}
                    >
                      {/* vertical day grid */}
                      <div
                        className="absolute inset-0 grid"
                        style={{
                          gridTemplateColumns: `repeat(${totalDays + 1}, ${pxPerDay}px)`,
                        }}
                      >
                        {days.map((d, idx) => (
                          <div
                            key={idx}
                            className={`border-l border-black/10 ${isWeekend(d) ? "bg-black/5" : ""}`}
                          />
                        ))}
                      </div>

                      {/* bar */}
                      <div
                        className="absolute top-2 h-6 rounded-lg text-white text-xs flex items-center justify-center"
                        style={{
                          left,
                          width,
                          background: "#6366F1",
                        }}
                        title={`${t.name}: ${fmt(t.start)} → ${fmt(t.end)} (Fri/Sat off)`}
                      >
                        {t.name}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 text-xs text-black/50">
            Weekends skipped: <span className="font-medium">Friday & Saturday</span>
          </div>
        </div>
      </div>
    </div>
  );
}
