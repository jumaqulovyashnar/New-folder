import { FileInput } from "@/components/file-input/file-input";
import { Modal } from "@/components/modal/modal";
import { useModalActions, useModalEditData, useModalIsOpen } from "@/store/modalStore";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useCreateResearch } from "@/hooks/research/useCreateResearch";
import { useUpdateResearch } from "@/hooks/research/useUpdateResearch";
import { toast } from "sonner";
import type { CreateResearchRequest, UpdateResearchRequest } from "@/features/research/research.type";

type ResearchFormData = {
	name: string;
	description: string;
	year: string;
	organization: string;
	membershipType: "MILLIY" | "XALQARO" | "";
	status: "JARAYONDA" | "TUGALLANGAN" | "";
	pdf: File | null;
};

export function ResearchModal() {
	const isOpen = useModalIsOpen();
	const editData = useModalEditData();
	const { close } = useModalActions();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const visible = isOpen && editData?._type === "research";
	const isEdit = visible && !!editData?.id;

	const { mutate: createResearch, isPending: isCreating } = useCreateResearch();
	const { mutate: updateResearch, isPending: isUpdating } = useUpdateResearch();

	const { register, handleSubmit, control, reset } = useForm<ResearchFormData>({
		defaultValues: { name: "", description: "", year: "", organization: "", membershipType: "", status: "", pdf: null },
	});

	useEffect(() => {
		if (visible && isEdit) {
			reset({
				name: editData.name ?? "",
				description: editData.description ?? "",
				year: editData.year ?? "",
				organization: editData.organization ?? "",
				membershipType: editData.membershipType ?? "",
				status: editData.status ?? "",
				pdf: null,
			});
		} else if (visible && !isEdit) {
			reset({ name: "", description: "", year: "", organization: "", membershipType: "", status: "", pdf: null });
		}
	}, [visible, isEdit, editData, reset]);

	const handleClose = () => {
		reset();
		close();
	};

	const onSubmit = async (values: ResearchFormData) => {
		try {
			setIsSubmitting(true);

			// Map form data to API request structure
			const payload = {
				name: values.name,
				description: values.description,
				year: Number(values.year),
				fileUrl: values.pdf ? values.pdf.name : "",
				univerName: values.organization,
				memberEnum: values.membershipType as "MILLIY" | "XALQARO",
				member: values.membershipType === "XALQARO",
				finished: values.status === "TUGALLANGAN",
				userId: 1, // TODO: get from auth context
			};

			if (isEdit && editData?.id) {
				const updatePayload: UpdateResearchRequest = {
					id: editData.id,
					...payload,
				};

				updateResearch(updatePayload, {
					onSuccess: () => {
						toast.success("Tadqiqot muvaffaqiyatli yangilandi");
						handleClose();
						setIsSubmitting(false);
					},
					onError: (error: any) => {
						toast.error(error?.message || "Tadqiqotni yangilashda xato");
						setIsSubmitting(false);
						console.error("Update error:", error);
					},
				});
				return;
			}

			// Create new
			const createPayload: CreateResearchRequest = payload;

			createResearch(createPayload, {
				onSuccess: () => {
					toast.success("Tadqiqot muvaffaqiyatli qo'shildi");
					handleClose();
					setIsSubmitting(false);
				},
				onError: (error: any) => {
					toast.error(error?.message || "Tadqiqot qo'shishda xato");
					setIsSubmitting(false);
					console.error("Create error:", error);
				},
			});
		} catch (error) {
			toast.error("Xatolik yuz berdi");
			setIsSubmitting(false);
			console.error("Form submission error:", error);
		}
	};

	return (
		<Modal open={visible} onClose={handleClose} title={isEdit ? "Tadqiqotni tahrirlash" : "Tadqiqot qo'shish"}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<Label htmlFor="r-name">Tadqiqot nomi</Label>
					<Input id="r-name" placeholder="Tadqiqot nomini kiriting..." {...register("name")} />
				</div>
				<div className="flex flex-col gap-2">
					<Label htmlFor="r-desc">Qisqa tavsif</Label>
					<Textarea
						id="r-desc"
						placeholder="Tadqiqot haqida qisqacha..."
						className="min-h-[80px] resize-none"
						{...register("description")}
					/>	
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="r-year">Yil</Label>
						<Input id="r-year" type="number" placeholder="2024" {...register("year")} />
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="r-org">Universitet / Tashkilot</Label>
						<Input id="r-org" placeholder="Tashkilot nomi..." {...register("organization")} />
					</div>
					<div className="flex flex-col gap-2">
						<Label>A'zolik turi</Label>
						<Controller
							name="membershipType"
							control={control}
							render={({ field }) => (
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Tanlang..." />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="MILLIY">MILLIY</SelectItem>
										<SelectItem value="XALQARO">XALQARO</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label>Holati</Label>
						<Controller
							name="status"
							control={control}
							render={({ field }) => (
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Tanlang..." />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="JARAYONDA">JARAYONDA</SelectItem>
										<SelectItem value="TUGALLANGAN">TUGALLANGAN</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<Label>
						PDF yuklash <span className="text-muted-foreground font-normal">(ixtiyoriy)</span>
					</Label>
					<Controller
						name="pdf"
						control={control}
						render={({ field }) => (
							<FileInput type="document" accept=".pdf" value={field.value} onChange={field.onChange} />
						)}
					/>
				</div>
				<div className="flex items-center justify-end gap-2 pt-1">
					<Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting || isCreating || isUpdating}>
						Bekor qilish
					</Button>
					<Button type="submit" disabled={isSubmitting || isCreating || isUpdating}>
						{isSubmitting || isCreating || isUpdating ? "Yuklanmoqda..." : isEdit ? "Yangilash" : "Saqlash"}
					</Button>
				</div>
			</form>
		</Modal>
	);
}
