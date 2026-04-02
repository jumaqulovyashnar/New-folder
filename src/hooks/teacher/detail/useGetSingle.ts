import { useQuery } from "@tanstack/react-query";
import { TeacherService } from "@/features/teacher/teacher.service";

export const useGetTeacherById = (id: number) => {
  return useQuery({
    queryKey: ["teacher", id],
    queryFn: () => TeacherService.getById(id)
  });
};