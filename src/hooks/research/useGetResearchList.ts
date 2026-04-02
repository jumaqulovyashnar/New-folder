import { useQuery } from "@tanstack/react-query";
import { ResearchService } from "@/features/research/research.service";
import { ResearchRequestParams } from "@/features/research/research.type";

export const useGetResearchList = (params: ResearchRequestParams) => {
  return useQuery({
    queryKey: ["researchList", params],
    queryFn: () => ResearchService.getList(params),
    staleTime: 0, // Always refetch
    refetchOnWindowFocus: true,
  });
};