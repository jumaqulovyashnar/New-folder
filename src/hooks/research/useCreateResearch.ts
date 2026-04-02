import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ResearchService } from "@/features/research/research.service";
import { CreateResearchRequest } from "@/features/research/research.type";

export const useCreateResearch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateResearchRequest) => ResearchService.create(data),
    onSuccess: async () => {
      // Invalidate and refetch researchList and researchByUser queries
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "researchList" || query.queryKey[0] === "researchByUser"
      });
      // Small delay to ensure backend has processed
      setTimeout(() => {
        queryClient.refetchQueries({
          predicate: (query) => query.queryKey[0] === "researchList" || query.queryKey[0] === "researchByUser"
        });
      }, 500);
    }
  });
};