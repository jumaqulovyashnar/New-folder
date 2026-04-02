import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TeacherService } from "@/features/teacher/teacher.service";
export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => TeacherService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teacherList"] })
  });
};