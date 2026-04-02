const API_ENDPOINTS = {
	LOGIN: "/auth/login",
	USER: {
		USER_ME: "/user",
	},
	FILE: {
		IMAGE: "/api/v1/files",
		PDF: "/api/v1/files/pdf",
	},
	COLLAGE: {
		GETALL: "/college",
		CREATE: "college",
		DELETE: "/college",
		UPDATE: "/college",
	},
	DEPARTMENT: {
		CREATE: "/department",
		DELETE: "/department",
		UPDATE: "/department",
		PAGE: "/department/page",
		LIST: "/department/list",
	},
	POSITION: {
		LAVOZIM: "/lavozim",
		STATISTIC: "/lavozim/get-lavozim-statistiks",
	},
	TEACHER: {
		SEARCH: "/teacher/search",
		DELETE: "/teacher",
		CREATE: "/teacher/saveUser",
		EDIT: "/teacher/edit",
	},
	USER_STATISTICS: "/user/statistics",
 RESEARCH : {
  GETBYID: "/research/byUser",       
  GETBYID_SINGLE: "/research",       
  LIST: "/research",               
  CREATE: "/research",             
  UPDATE: "/research",               
  DELETE: "/research",                
},
};

export const { LOGIN, USER, FILE, COLLAGE, DEPARTMENT, POSITION, TEACHER, USER_STATISTICS, RESEARCH } = API_ENDPOINTS;