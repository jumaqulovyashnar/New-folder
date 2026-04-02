import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ResearchService } from "@/features/research/research.service";
import { UpdateResearchRequest } from "@/features/research/research.type";

export const useUpdateResearch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateResearchRequest) => ResearchService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "researchList"
      });
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === "researchList"
      });
    }
  });
};