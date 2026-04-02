import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TeacherService } from "@/features/teacher/teacher.service";
import { DeleteTeacherResponse } from "@/features/teacher/teacher.type";

export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => TeacherService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teacherList"] })
  });
};