type PublicationType = "ARTICLE" | "BOOK" | "PROCEEDING" | "OTHERS";
type AuthorType = "COAUTHOR" | "FIRST_AUTHOR" | "BOTH_AUTHOR";
type DegreeType = "INTERNATIONAL" | "NATIONAL";

export type PublicationItem = {
  userId: number;
  name: string;
  description: string;
  year: number;
  fileUrl: string;
  type: PublicationType;
  author: AuthorType;
  degree: DegreeType;
  volume: string;
  institution: string;
  popular: boolean;
};