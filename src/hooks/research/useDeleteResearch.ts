import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ResearchService } from "@/features/research/research.service";

export const useDeleteResearch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => ResearchService.delete(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "researchList" || query.queryKey[0] === "researchByUser"
      });
      setTimeout(() => {
        queryClient.refetchQueries({
          predicate: (query) => query.queryKey[0] === "researchList" || query.queryKey[0] === "researchByUser"
        });
      }, 500);
    }
  });
};