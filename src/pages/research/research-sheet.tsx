import { FileInput } from "@/components/file-input/file-input";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { ScrollArea } from "@/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { Separator } from "@/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/ui/sheet";
import { Textarea } from "@/ui/textarea";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import type { CreateResearchRequest, UpdateResearchRequest } from "@/features/research/research.type";
import { useResearchSheetActions, useResearchSheetEditData, useResearchSheetIsOpen } from "@/store/researchSheet";
import { useCreateResearch } from "@/hooks/research/useCreateResearch";
import { useUpdateResearch } from "@/hooks/research/useUpdateResearch";

interface ResearchFormValues {
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

export function ResearchSheet() {
	const isOpen = useResearchSheetIsOpen();
	const editData = useResearchSheetEditData();
	const { close } = useResearchSheetActions();
	const isEdit = editData !== null;

	const { mutate: createResearch } = useCreateResearch();
	const { mutate: updateResearch } = useUpdateResearch();

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm<ResearchFormValues>({
		defaultValues: {
			name: "",
			description: "",
			year: new Date().getFullYear(),
			fileUrl: "",
			userId: 1, // TODO: get from auth
			member: false,
			univerName: "",
			finished: false,
			memberEnum: "MILLIY",
		},
	});

	useEffect(() => {
		if (editData) {
			reset({
				name: editData.name,
				description: editData.description,
				year: editData.year,
				fileUrl: editData.fileUrl,
				userId: editData.userId,
				member: editData.member,
				univerName: editData.univerName,
				finished: editData.finished,
				memberEnum: editData.memberEnum,
			});
		}
	}, [editData, reset]);

	const handleClose = () => {
		reset();
		close();
	};

	const onSubmit = (values: ResearchFormValues) => {
		if (isEdit && editData) {
			const updatePayload: UpdateResearchRequest = {
				id: editData.id,
				name: values.name,
				description: values.description,
				year: values.year,
				fileUrl: values.fileUrl,
				userId: values.userId,
				member: values.member,
				univerName: values.univerName,
				finished: values.finished,
				memberEnum: values.memberEnum,
			};

			updateResearch(updatePayload, { onSuccess: handleClose });
			return;
		}

		// Create
		const createPayload: CreateResearchRequest = {
			name: values.name,
			description: values.description,
			year: values.year,
			fileUrl: values.fileUrl,
			userId: values.userId,
			member: values.member,
			univerName: values.univerName,
			finished: values.finished,
			memberEnum: values.memberEnum,
		};

		createResearch(createPayload, { onSuccess: handleClose });
	};

	return (
		<Sheet open={isOpen} onOpenChange={(v) => !v && handleClose()}>
			<SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col gap-0">
				<SheetHeader className="px-6 py-4 border-b">
					<SheetTitle className="text-[16px]">{isEdit ? "Tadqiqotni tahrirlash" : "Tadqiqot qo'shish"}</SheetTitle>
				</SheetHeader>

				<ScrollArea className="flex-1">
					<form id="research-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 px-6 py-5">
						{/* Fayl */}
						<div className="flex flex-col gap-2">
							<Label htmlFor="fileUrl">
								Fayl URL <span className="text-muted-foreground font-normal">(ixtiyoriy)</span>
							</Label>
							<Input
								id="fileUrl"
								placeholder="Fayl URL"
								{...register("fileUrl")}
							/>
						</div>

						<Separator />

						{/* Nomi */}
						<div className="flex flex-col gap-2">
							<Label htmlFor="name">Nomi</Label>
							<Input
								id="name"
								placeholder="Tadqiqot nomi"
								{...register("name", {
									required: "Nomi kiritilishi shart",
									minLength: { value: 3, message: "Kamida 3 ta belgi kiriting" },
								})}
							/>
							{errors.name && <span className="text-[12px] text-red-500">{errors.name.message}</span>}
						</div>

						{/* Tavsif */}
						<div className="flex flex-col gap-2">
							<Label htmlFor="description">Tavsif</Label>
							<Textarea
								id="description"
								placeholder="Tadqiqot tavsifi"
								rows={3}
								{...register("description", {
									required: "Tavsif kiritilishi shart",
								})}
							/>
							{errors.description && <span className="text-[12px] text-red-500">{errors.description.message}</span>}
						</div>

						{/* Yil */}
						<div className="flex flex-col gap-2">
							<Label htmlFor="year">Yil</Label>
							<Input
								id="year"
								type="number"
								placeholder="2024"
								{...register("year", {
									required: "Yil kiritilishi shart",
									min: { value: 2000, message: "Yil 2000 dan katta bo'lishi kerak" },
									max: { value: new Date().getFullYear() + 1, message: "Yil kelajakda bo'lishi mumkin emas" },
								})}
							/>
							{errors.year && <span className="text-[12px] text-red-500">{errors.year.message}</span>}
						</div>

						{/* Universitet nomi */}
						<div className="flex flex-col gap-2">
							<Label htmlFor="univerName">Universitet nomi</Label>
							<Input
								id="univerName"
								placeholder="Universitet nomi"
								{...register("univerName", {
									required: "Universitet nomi kiritilishi shart",
								})}
							/>
							{errors.univerName && <span className="text-[12px] text-red-500">{errors.univerName.message}</span>}
						</div>

						{/* Turi */}
						<div className="flex flex-col gap-2">
							<Label>Turi</Label>
							<Controller
								name="memberEnum"
								control={control}
								render={({ field }) => (
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger>
											<SelectValue placeholder="Tur tanlang" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="MILLIY">Milliy</SelectItem>
											<SelectItem value="XALQARO">Xalqaro</SelectItem>
										</SelectContent>
									</Select>
								)}
							/>
						</div>

						{/* A'zo */}
						<div className="flex flex-col gap-2">
							<Label>A'zo</Label>
							<Controller
								name="member"
								control={control}
								render={({ field }) => (
									<Select value={String(field.value)} onValueChange={(value) => field.onChange(value === "true")}>
										<SelectTrigger>
											<SelectValue placeholder="A'zolik tanlang" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="true">Ha</SelectItem>
											<SelectItem value="false">Yo'q</SelectItem>
										</SelectContent>
									</Select>
								)}
							/>
						</div>

						{/* Tugagan */}
						<div className="flex flex-col gap-2">
							<Label>Holat</Label>
							<Controller
								name="finished"
								control={control}
								render={({ field }) => (
									<Select value={String(field.value)} onValueChange={(value) => field.onChange(value === "true")}>
										<SelectTrigger>
											<SelectValue placeholder="Holat tanlang" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="true">Tugagan</SelectItem>
											<SelectItem value="false">Davom etmoqda</SelectItem>
										</SelectContent>
									</Select>
								)}
							/>
						</div>

						{/* Submit buttons */}
						<div className="flex gap-3 pt-4">
							<Button type="button" variant="outline" onClick={handleClose} className="flex-1">
								Bekor qilish
							</Button>
							<Button type="submit" className="flex-1">
								{isEdit ? "Saqlash" : "Qo'shish"}
							</Button>
						</div>
					</form>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}