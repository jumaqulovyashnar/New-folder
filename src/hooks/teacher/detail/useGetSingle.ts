import { useQuery } from "@tanstack/react-query";
import { TeacherService } from "@/features/teacher/teacher.service";
import { GetTeacherByIdResponse } from "@/features/teacher/teacher.type";

export const useGetTeacherById = (id: number) => {
  return useQuery({
    queryKey: ["teacher", id],
    queryFn: () => TeacherService.getById(id)
  });
};