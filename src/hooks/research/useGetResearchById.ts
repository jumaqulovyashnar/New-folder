import { useQuery } from "@tanstack/react-query";
import { ResearchService } from "@/features/research/research.service";

export const useGetResearchById = (id: number) => {
  return useQuery({
    queryKey: ["research", id],
    queryFn: () => ResearchService.getByResearchId(id)
  });
};

export const useGetResearchByUserId = (userId: number) => {
  return useQuery({
    queryKey: ["researchByUser", userId],
    queryFn: () => ResearchService.getById(userId),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};