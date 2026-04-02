import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TeacherService } from "@/features/teacher/teacher.service";
import { CreateTeacherParams, CreateTeacherResponse } from "@/features/teacher/teacher.type";

export const useCreateTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTeacherParams) => TeacherService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teacherList"] })
  });
};