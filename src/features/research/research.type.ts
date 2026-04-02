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

// post uchun

export interface CreateMemberRequest {
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


export interface CreateMemeberResponse{
  success:boolean,
  messsage:string,
  data:string,
}
