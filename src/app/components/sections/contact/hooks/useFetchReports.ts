import { useQuery } from "@tanstack/react-query";

async function fetchReports() {
  const res = await fetch("/api/reports");
  if (!res.ok) {
    throw new Error("Failed to fetch reports");
  }
  return res.json();
}

export const useFetchReports = () => {
  return useQuery({
    queryKey: ["reports"],
    queryFn: fetchReports,
  });
};
