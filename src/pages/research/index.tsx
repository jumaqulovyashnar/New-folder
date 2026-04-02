import { FilePenLine, Search, UserPlus, UserX, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { ConfirmPopover } from "@/components/confirm-popover/confirm-popover";
import type { ColumnDef } from "@/components/data-table/data-table";
import { DataTable } from "@/components/data-table/data-table";
import { useGetResearchList } from "@/hooks/research/useGetResearchList";
import { useDeleteResearch } from "@/hooks/research/useDeleteResearch";
import { useResearchSheetActions } from "@/store/researchSheet";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import type { ResearchItem } from "@/features/research/research.type";
import { ResearchSheet } from "./research-sheet";

function createColumns(
	onEdit: (row: ResearchItem) => void,
	onDelete: (row: ResearchItem) => void
): ColumnDef<ResearchItem>[] {
	return [
		{
			accessorKey: "id",
			header: "#",
			cell: ({ row }) => <span className="text-muted-foreground text-[12px]">{row.getValue("id")}</span>,
		},
		{
			accessorKey: "name",
			header: "Nomi",
			cell: ({ row }) => (
				<span className="font-medium text-[12px] truncate">{row.getValue("name")}</span>
			),
		},
		{
			accessorKey: "description",
			header: "Tavsif",
			cell: ({ row }) => (
				<span className="text-muted-foreground text-[12px] truncate">{row.getValue("description")}</span>
			),
		},
		{
			accessorKey: "year",
			header: "Yil",
			cell: ({ row }) => (
				<span className="text-muted-foreground text-[12px]">{row.getValue("year")}</span>
			),
		},
		{
			accessorKey: "memberEnum",
			header: "Turi",
			cell: ({ row }) => {
				const value = row.getValue("memberEnum") as string;
				return (
					<span className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full truncate ${
						value === "MILLIY" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"
					}`}>
						{value === "MILLIY" ? "Milliy" : "Xalqaro"}
					</span>
				);
			},
		},
		{
			accessorKey: "finished",
			header: "Holati",
			cell: ({ row }) => {
				const finished = row.getValue("finished") as boolean;
				return (
					<span className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full ${
						finished ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
					}`}>
						{finished ? "Tugagan" : "Davom etmoqda"}
					</span>
				);
			},
		},
		{
			id: "actions",
			header: () => <div className="text-center text-[12px]">Amallar</div>,
			cell: ({ row }) => (
				<div className="flex items-center justify-center gap-1.5" onClick={(e) => e.stopPropagation()}>
					<button
						type="button"
						onClick={() => onEdit(row.original)}
						className="inline-flex items-center gap-1 bg-green-50 text-green-700 hover:bg-green-100 text-[11px] font-semibold px-2 py-0.5 rounded-md transition-colors cursor-pointer"
					>
						<FilePenLine className="size-3" />
						Tahrirlash
					</button>
					<ConfirmPopover onConfirm={() => onDelete(row.original)}>
						<button
							type="button"
							className="inline-flex items-center gap-1 bg-red-50 text-red-600 hover:bg-red-100 text-[11px] font-semibold px-2 py-0.5 rounded-md transition-colors cursor-pointer"
						>
							<UserX className="size-3" />
							O'chirish
						</button>
					</ConfirmPopover>
				</div>
			),
		},
	];
}

export default function Research() {
	const { open } = useResearchSheetActions();
	const navigate = useNavigate();
	const { mutate: deleteResearch } = useDeleteResearch();

	const [searchName, setSearchName] = useState("");
	const [selectedType, setSelectedType] = useState<string>("all");
	const [selectedStatus, setSelectedStatus] = useState<string>("all");

	// For now, use fixed params, later can add pagination
	const { data: response, isLoading } = useGetResearchList({ page: 1, size: 100 });

	const researches: ResearchItem[] = response?.data?.body ?? [];

	const filteredData = useMemo(() => {
		if (!researches.length) return [];

		return researches.filter((research) => {
			const matchesName =
				research.name?.toLowerCase().includes(searchName.toLowerCase()) ?? false;

			const matchesType =
				selectedType === "all" || research.memberEnum === selectedType;

			const matchesStatus =
				selectedStatus === "all" || String(research.finished) === selectedStatus;

			return matchesName && matchesType && matchesStatus;
		});
	}, [researches, searchName, selectedType, selectedStatus]);

	const clearFilters = () => {
		setSearchName("");
		setSelectedType("all");
		setSelectedStatus("all");
	};

	const hasActiveFilters =
		searchName !== "" || selectedType !== "all" || selectedStatus !== "all";

	const columns = useMemo(
		() =>
			createColumns(
				(row) => open(row),
				(row) => deleteResearch(row.id)
			),
		[open, deleteResearch]
	);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1.5">
					<span className="text-[13px] font-semibold text-foreground">Tadqiqotlar soni:</span>
					<span className="bg-green-100 text-green-700 text-[12px] font-bold px-2 py-0.5 rounded-full">
						{filteredData.length}
					</span>
					{hasActiveFilters && (
						<button
							onClick={clearFilters}
							className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors ml-2"
						>
							<X className="size-3" />
							Filtrlarni tozalash
						</button>
					)}
				</div>
				<Button
					size="sm"
					className="h-8 gap-1 text-[12px] bg-green-600 hover:bg-green-700 text-white"
					onClick={() => open()}
				>
					<UserPlus className="size-3.5" />
					Tadqiqot qo'shish
				</Button>
			</div>

			<div className="flex flex-wrap items-end gap-3 p-4 bg-muted/30 rounded-lg border">
				<div className="flex-1 min-w-[200px]">
					<Label htmlFor="search-name" className="text-[11px] font-medium text-muted-foreground mb-1 block">
						Nomi bo'yicha qidirish
					</Label>
					<div className="relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
						<Input
							id="search-name"
							placeholder="Tadqiqot nomi..."
							value={searchName}
							onChange={(e) => setSearchName(e.target.value)}
							className="pl-9 h-9 text-[13px] truncate"
						/>
					</div>
				</div>

				<div className="w-[200px]">
					<Label htmlFor="type-filter" className="text-[11px] font-medium text-muted-foreground mb-1 block">
						Turi bo'yicha
					</Label>
					<Select value={selectedType} onValueChange={setSelectedType}>
						<SelectTrigger id="type-filter" className="h-9 text-[13px] truncate">
							<SelectValue placeholder="Tur tanlang" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all" className="text-[13px]">Barcha turlar</SelectItem>
							<SelectItem value="MILLIY" className="text-[13px]">Milliy</SelectItem>
							<SelectItem value="XALQARO" className="text-[13px]">Xalqaro</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="w-[200px]">
					<Label htmlFor="status-filter" className="text-[11px] font-medium text-muted-foreground mb-1 block">
						Holati bo'yicha
					</Label>
					<Select value={selectedStatus} onValueChange={setSelectedStatus}>
						<SelectTrigger id="status-filter" className="h-9 text-[13px] truncate">
							<SelectValue placeholder="Holat tanlang" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all" className="text-[13px]">Barcha holatlar</SelectItem>
							<SelectItem value="true" className="text-[13px]">Tugagan</SelectItem>
							<SelectItem value="false" className="text-[13px]">Davom etmoqda</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<DataTable
				columns={columns}
				data={filteredData}
				onRowClick={(row) => navigate(`/research/${row.id}`)}
			/>

			<ResearchSheet />
		</div>
	);
}