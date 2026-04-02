export type Teacher = {
	id: number;
	fullName: string;
	phoneNumber: string;
	imgUrl: string | null;
	lavozim: string;
	department: string;
	departmentId: number | string;
	lavozmId: number | string;
	email: string;
	gender: boolean;
	age: number;
	profession: string | null;
	biography?: string;
	orcId?: string;
	scopusId?: string;
	scienceId?: string;
	researcherId?: string;
	fileUrl?: string;
};

export type TeacherFormValues = {
	fullName: string;
	phoneNumber: string;
	departmentId: string;
	email: string;
	gender: boolean;
	positionId: string;
	imgUrl: File | null;
	password: string;
	confirmPassword: string;
	age?: number;
	profession?: string;
	biography?: string;
	orcId?: string;
	scopusId?: string;
	scienceId?: string;
	researcherId?: string;
};

export type TeacherCreateValues = {
	fullName: string;
	phoneNumber: string;
	imgUrl: string | null;
	lavozmId: number;
	gender: boolean;
	password: string;
	departmentId: number;
	email: string;
	age?: number;
	profession?: string;
	biography?: string;
	orcId?: string;
	scopusId?: string;
	scienceId?: string;
	researcherId?: string;
	fileUrl?: string;
};


