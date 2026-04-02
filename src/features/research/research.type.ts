// GET by ID
export type ResearchItem = {
  id: number;
  name: string;
  description: string;
  year: number;
  fileUrl: string;
  userId: number;
  member: boolean;
  univerName: string;
  finished: boolean;
  memberEnum: "MILLIY" | "XALQARO";
}

export interface GetByIdResponse {
  success: boolean;
  message: string;
  data: {
    page: number;
    size: number;
    totalPage: number;
    totalElements: number;
    body: ResearchItem[];
  };
}

// POST
export interface CreateResearchRequest {
  name: string;
  description: string;
  year: number;          
  fileUrl: string;        
  userId: number;         
  member: boolean;      
  univerName: string;    
  finished: boolean;     
  memberEnum: "MILLIY" | "XALQARO"; 
}

export interface CreateResearchResponse{
  success: boolean;
  message: string;
  data: string;
}

// GET list
export interface ResearchRequestParams {
  page: number;
  size: number; 
}

export interface ResearchResponseParams{
  success: boolean;
  message: string;
  data: {
    page: number;
    size: number;
    totalPage: number;
    totalElements: number;
    body: ResearchItem[];
  };
}

// DELETE
export interface ResearchDeleteRequest{
  id: number;
}

export interface ResearchDeleteResponse{
  success: boolean;
  message: string;
  data: string;
}

// PUT
export interface UpdateResearchRequest {
  id: number;
  name: string;
  description: string;
  year: number;
  fileUrl: string;
  userId: number;
  member: boolean;
  univerName: string;
  finished: boolean;
  memberEnum: "MILLIY" | "XALQARO";
}

export interface UpdateResearchResponse {
  success: boolean;
  message: string;
  data: string;
}

// GET by ID (single)
export interface ResearchIdRequest{
  id: number;
}

export interface ResearchIdResponse{
  success: boolean;
  message: string;
  data: ResearchItem;
}