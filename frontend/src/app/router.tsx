import { authRoutes } from "@/domains/auth/router";
import { dashboardRoutes } from "@/domains/dashboard/router";
import { ganttRoutes } from "@/domains/gantt/router";
import { pertRoutes } from "@/domains/pert/router";
import { useRoutes } from "react-router-dom";

const Router = () => {
  return useRoutes([...authRoutes , ...dashboardRoutes , ...ganttRoutes , ...pertRoutes , ]);
};

export default Router;
