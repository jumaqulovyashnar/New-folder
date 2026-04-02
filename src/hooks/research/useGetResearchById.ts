import { useQuery } from "@tanstack/react-query";
import { ResearchService } from "@/features/research/research.service";

export const useGetResearchById = (id: number) => {
  return useQuery({
    queryKey: ["research", id],
    queryFn: () => ResearchService.getByResearchId(id)
  });
};