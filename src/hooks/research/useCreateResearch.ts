import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ResearchService } from "@/features/research/research.service";
import { CreateResearchRequest } from "@/features/research/research.type";

export const useCreateResearch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateResearchRequest) => ResearchService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["researchList"] })
  });
};