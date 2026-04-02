import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ResearchService } from "@/features/research/research.service";
import { CreateResearchRequest } from "@/features/research/research.type";

export const useCreateResearch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateResearchRequest) => ResearchService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "researchList"
      });
      // Also manually refetch to ensure immediate update
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === "researchList"
      });
    }
  });
};