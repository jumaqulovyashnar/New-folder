import { apiClient } from "@/api/client";
import { TEACHER } from "@/constants/apiEndpoint";
import type {
  CreateTeacherParams,
  CreateTeacherResponse,
  EditTeacherParams,
  EditTeacherResponse,
  DeleteTeacherResponse,
  GetTeacherListResponse,
  GetTeacherByIdResponse,
  UpdateTeacherParams,
  UpdateTeacherResponse,
  SearchParams,
} from "./teacher.type";

export const TeacherService = {
  getAll(params?: SearchParams) {
    return apiClient.get<GetTeacherListResponse>(TEACHER.SEARCH, { params });
  },

  getById(id: number) {
    return apiClient.get<GetTeacherByIdResponse>(`${TEACHER.DELETE}/${id}`);
  },

  create(params: CreateTeacherParams) {
    return apiClient.post<CreateTeacherResponse>(TEACHER.CREATE, params);
  },

  edit(params: EditTeacherParams) {
    return apiClient.put<EditTeacherResponse>(`${TEACHER.EDIT}`, params);
  },

  update(id: number, params: UpdateTeacherParams) {
    return apiClient.put<UpdateTeacherResponse>(
      `${TEACHER.EDIT}/${id}`,
      params
    );
  },

  delete(id: number) {
    return apiClient.delete<DeleteTeacherResponse>(`${TEACHER.DELETE}/${id}`);
  },
};