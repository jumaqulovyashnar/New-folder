import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TeacherService } from "@/features/teacher/teacher.service";
import { UpdateTeacherParams } from "@/features/teacher/teacher.type";

export const useUpdateTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: number; params: UpdateTeacherParams }) => TeacherService.update(data.id, data.params),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teacherList"] })
  });
};