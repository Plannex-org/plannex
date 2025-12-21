import { Pert, PertProvider } from "react-pert";

type PertTaskInput = {
  key: string;
  text: string;
  duration: number;
  dependsOn?: string[];
};

export default function PertCanvas({ tasks }: { tasks: PertTaskInput[] }) {
  if (!tasks.length) {
    return (
      <div className="text-sm text-black/60">
        Add tasks to generate the PERT diagram.
      </div>
    );
  }

  return (
    <div className="bg-white/70 rounded-2xl p-4">
      <div className="h-[420px] overflow-hidden rounded-xl border border-black/5">
        <PertProvider>
          <Pert tasks={tasks} />
        </PertProvider>
      </div>
    </div>
  );
}
