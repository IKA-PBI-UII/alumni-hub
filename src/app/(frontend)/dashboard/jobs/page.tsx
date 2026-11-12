import { Suspense } from "react";
import { JobsManager } from "@/components/dashboard/jobs-manager";

export default function DashboardJobsPage() {
  return (
    <Suspense>
      <JobsManager />
    </Suspense>
  );
}
