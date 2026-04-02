import { create } from "zustand";

type Research = {
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
};

type ResearchSheetStore = {
	isOpen: boolean;
	editData: Research | null;
	open: (data?: Research | null) => void;
	close: () => void;
};

const useResearchSheetStore = create<ResearchSheetStore>((set) => ({
	isOpen: false,
	editData: null,
	open: (data = null) => set({ isOpen: true, editData: data ?? null }),
	close: () => set({ isOpen: false, editData: null }),
}));

export const useResearchSheetIsOpen = () => useResearchSheetStore((s) => s.isOpen);
export const useResearchSheetEditData = () => useResearchSheetStore((s) => s.editData);
export const useResearchSheetActions = () => useResearchSheetStore((s) => ({ open: s.open, close: s.close }));

export default useResearchSheetStore;