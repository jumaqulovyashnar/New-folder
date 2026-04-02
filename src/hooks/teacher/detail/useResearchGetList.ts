import { useQuery } from "@tanstack/react-query";
import { TeacherService } from "@/features/teacher/teacher.service";
import { SearchParams } from "@/features/teacher/teacher.type";

export const useGetTeacherList = (params: SearchParams) => {
  return useQuery({
    queryKey: ["teacherList", params],
    queryFn: () => TeacherService.getAll(params)
  });
};