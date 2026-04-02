import { apiClient } from "@/api/client";
import { RESEARCH } from "@/constants/apiEndpoint";
import {
  GetByIdResponse,
  CreateResearchRequest,
  CreateResearchResponse,
  ResearchRequestParams,
  ResearchResponseParams,
  ResearchDeleteResponse,
  UpdateResearchRequest,
  UpdateResearchResponse,
  ResearchIdResponse,
} from "./research.type";

export const ResearchService = {
  getById(id: number) {
    return apiClient.get<GetByIdResponse>(`${RESEARCH.GETBYID}/${id}`);
  },

  getByResearchId(id: number) {
    return apiClient.get<ResearchIdResponse>(`${RESEARCH.GETBYID_SINGLE}/${id}`);
  },

  getList(params: ResearchRequestParams) {
    return apiClient.get<ResearchResponseParams>(RESEARCH.LIST, { params });
  },

  create(data: CreateResearchRequest) {
    return apiClient.post<CreateResearchResponse>(RESEARCH.CREATE, data);
  },

  update(data: UpdateResearchRequest) {
    return apiClient.put<UpdateResearchResponse>(`${RESEARCH.UPDATE}/${data.id}`, data);
  },

  delete(id: number) {
    return apiClient.delete<ResearchDeleteResponse>(`${RESEARCH.DELETE}/${id}`);
  },
};