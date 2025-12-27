import { prisma } from "../../core/config/db.js";

export const calculatePERT = async (projectId) => {
  console.log(`Calculating PERT/CPM for project: ${projectId}`);

  const tasks = await prisma.task.findMany({
    where: {
      projectId,
      deletedAt: null,
    },
    include: {
      predecessors: {
        include: { predecessor: true },
      },
    },
  });

  if (tasks.length === 0) {
    throw new Error("No tasks found for this project");
  }

  console.log(`Found ${tasks.length} tasks`);

  const taskMap = {};

  tasks.forEach((task) => {
    const hasPert =
      task.optimisticTime != null &&
      task.probableTime != null &&
      task.pessimisticTime != null;

    let te;

    if (hasPert) {
      // PERT expected time: (O + 4M + P) / 6
      te =
        (task.optimisticTime + 4 * task.probableTime + task.pessimisticTime) /
        6;
    } else if (task.probableTime != null) {
      // Fallback to fixed duration
      te = task.probableTime;
    } else {
      throw new Error(`Task ${task.id} has no duration data`);
    }

    taskMap[task.id] = {
      id: task.id,
      name: task.name,
      te: parseFloat(te.toFixed(2)),
      predecessors: task.predecessors.map((dep) => dep.predecessorId),
    };
  });

  // topological sort with cycle detection
  const order = topologicalSort(taskMap);
  if (order.length !== Object.keys(taskMap).length) {
    throw new Error(
      "Project has circular dependencies - cannot compute critical path"
    );
  }

  // Forward pass: ES/EF calculation
  const es = {};
  const ef = {};

  order.forEach((taskId) => {
    const preds = taskMap[taskId].predecessors;
    const maxPredEF =
      preds.length === 0 ? 0 : Math.max(...preds.map((p) => ef[p]));

    es[taskId] = parseFloat(maxPredEF.toFixed(2));
    ef[taskId] = parseFloat((es[taskId] + taskMap[taskId].te).toFixed(2));
  });

  const projectDuration = parseFloat(Math.max(...Object.values(ef)).toFixed(2));
  console.log(`Total project duration: ${projectDuration}`);

  // Backward pass: LS/LF calculation
  const ls = {};
  const lf = {};

  // Initialize end tasks (no successors)
  const endTasks = order.filter(
    (id) => !Object.values(taskMap).some((t) => t.predecessors.includes(id))
  );

  endTasks.forEach((taskId) => {
    lf[taskId] = projectDuration;
    ls[taskId] = parseFloat((lf[taskId] - taskMap[taskId].te).toFixed(2));
  });

  // Process in reverse topological order
  order
    .slice()
    .reverse()
    .forEach((taskId) => {
      if (endTasks.includes(taskId)) return;

      // Find all successors
      const successors = Object.values(taskMap)
        .filter((t) => t.predecessors.includes(taskId))
        .map((t) => t.id);

      if (successors.length === 0) return;

      const minSuccLS = Math.min(...successors.map((succ) => ls[succ]));
      lf[taskId] = parseFloat(minSuccLS.toFixed(2));
      ls[taskId] = parseFloat((lf[taskId] - taskMap[taskId].te).toFixed(2));
    });

  // Build successors map for free slack
  const successorsMap = {};
  Object.keys(taskMap).forEach((id) => {
    successorsMap[id] = [];
  });

  Object.values(taskMap).forEach((task) => {
    task.predecessors.forEach((predId) => {
      successorsMap[predId].push(task.id);
    });
  });

  // Calculate slack and identify critical path
  const results = order.map((taskId) => {
    const totalSlack = parseFloat((ls[taskId] - es[taskId]).toFixed(2));

    const successors = successorsMap[taskId] || [];
    let freeSlack;

    if (successors.length === 0) {
      freeSlack = totalSlack;
    } else {
      const slackValues = successors.map((succId) => es[succId] - ef[taskId]);
      freeSlack = parseFloat(Math.min(...slackValues).toFixed(2));
    }

    return {
      id: taskId,
      name: taskMap[taskId].name,
      expectedDuration: taskMap[taskId].te,
      es: es[taskId],
      ef: ef[taskId],
      ls: ls[taskId],
      lf: lf[taskId],
      totalSlack,
      freeSlack,
      isCritical: totalSlack === 0,
    };
  });

  const criticalPath = results.filter((t) => t.isCritical);

  console.log(`Critical path: ${criticalPath.map((t) => t.name).join(" → ")}`);

  return {
    projectDuration,
    criticalPath: criticalPath.map((t) => ({ id: t.id, name: t.name })),
    tasks: results,
    summary: {
      totalTasks: tasks.length,
      criticalTasks: criticalPath.length,
    },
  };
};

// topological sort with cycle detection using Kahn's algorithm
const topologicalSort = (taskMap) => {
  const indegree = {};

  // Calculate initial indegrees
  Object.values(taskMap).forEach((task) => {
    indegree[task.id] = task.predecessors.length;
  });

  const queue = Object.keys(indegree).filter((id) => indegree[id] === 0);
  const result = [];

  while (queue.length > 0) {
    const taskId = queue.shift();
    result.push(taskId);

    // Reduce indegree of successors
    Object.values(taskMap).forEach((task) => {
      if (task.predecessors.includes(taskId)) {
        indegree[task.id]--;
        if (indegree[task.id] === 0) {
          queue.push(task.id);
        }
      }
    });
  }

  // Cycle detection
  if (result.length !== Object.keys(taskMap).length) {
    throw new Error(
      `Cycle detected! Cannot process ${
        Object.keys(taskMap).length - result.length
      } tasks`
    );
  }

  return result;
};
