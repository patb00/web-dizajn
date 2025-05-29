import { useQuery } from "@tanstack/react-query";

export type Model = {
  id: number;
  name: string;
  category: string;
  price: number;
  image_url: string;
  model_url: string;
};

async function fetchModels(category?: string): Promise<Model[]> {
  const url = category ? `/api/models?category=${category}` : "/api/models";

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch models");
  }

  return res.json();
}

export const useFetchModels = (category?: string) => {
  return useQuery({
    queryKey: ["models", category],
    queryFn: () => fetchModels(category),
  });
};
