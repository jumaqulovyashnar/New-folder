import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ResearchService } from "@/features/research/research.service";

export const useDeleteResearch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => ResearchService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["researchList"], exact: false });
    }
  });
};