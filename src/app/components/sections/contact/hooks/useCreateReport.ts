import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

async function createReport(reportData: {
  name: string;
  email: string;
  message: string;
  category_id: number;
}) {
  const res = await fetch("/api/reports", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reportData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to create report");
  }

  return res.json();
}

export const useCreateReport = () => {
  return useMutation({
    mutationFn: createReport,
    onSuccess: () => {
      toast.success("Report successfully created!");
    },
    onError: (error: any) => {
      const message =
        error?.message || "An unknown error occurred while creating report.";
      toast.error(message);
    },
  });
};
