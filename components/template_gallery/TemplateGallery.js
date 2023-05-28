import React from "react";
import ButtonPrimary from "../buttons/ButtonPrimary";
import ButtonSecondary from "../buttons/ButtonSecondary";
import { useTemplate } from "../../context/TemplateContext";
import { motion } from "framer-motion";
import TemplateItem from "./TemplateItem";

export default function TemplateGallery() {
	const { templates, loading, handleInsert, closeTemplates, selectTab, tab } =
		useTemplate();

	return (
		<motion.div
			key="template-body"
			initial={{ opacity: 0, y: 20 }}
			exit={{ opacity: 0, y: 0 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2, delay: 0.1 }}
			className="relative z-[100]"
		>
			<div
				className="h-[500px] w-[800px] bg-white rounded-md grid shadow-2xl"
				style={{ gridTemplateColumns: "200px 1fr" }}
			>
				{!loading ? (
					<>
						<div className="border-r-[1px] pt-8 pb-8">
							<div className="px-8 font-bold">Kategórie</div>
							<div className="mt-4">
								<div className="py-2 pl-8 bg-gray-100">🙋‍♂️ Moje</div>
								<div className="py-2 pl-8 ">🏠 Hrubá stavba</div>
								<div className="py-2 pl-8">♨️ Vykurovanie</div>
								<div className="py-2 pl-8">⚡️ Elektroinštalácie</div>
								<div className="py-2 pl-8">🚽 Kanalizácie</div>
							</div>
						</div>
						<div className="flex flex-col">
							<div className="px-8 pt-8">
								<div className="flex items-center justify-between">
									<div className="text-2xl">Zoznam templatov</div>
									<div className="flex items-center gap-4">
										<ButtonSecondary
											onClick={() => {
												closeTemplates();
											}}
										>
											Zrušiť
										</ButtonSecondary>
										<ButtonPrimary onClick={handleInsert}>Vložiť</ButtonPrimary>
									</div>
								</div>

								<div className="mt-4 text-sm flex justify-start gap-6">
									<Tab name="Všetky" id="all"></Tab>
									<Tab name="Sekcie" id="section"></Tab>
									<Tab name="Bloky" id="block"></Tab>
									<Tab name="Položky" id="item"></Tab>
								</div>
							</div>
							<div className="w-full h-[1px] bg-gray-200"></div>

							<div className="m-4 h-full bg-gray-50 rounded-md relative">
								<div className="absolute inset-0 p-4 flex flex-col gap-4 overflow-y-scroll">
									{templates.map((template) => {
										return (
											<>
												{tab != "all" ? (
													<>
														{template.type == tab && (
															<TemplateItem template={template} />
														)}
													</>
												) : (
													<TemplateItem template={template} />
												)}
											</>
										);
									})}
								</div>
							</div>
						</div>
					</>
				) : (
					<TemplateSkeleton></TemplateSkeleton>
				)}
			</div>
		</motion.div>
	);
}

export function TemplateSkeleton() {
	return (
		<>
			<div className="border-r-[1px] pt-8 pb-8">
				<div className="h-6 w-[100px] skeleton ml-8 rounded-md"></div>
				<div className="mt-4 flex flex-col gap-2">
					<div className=" h-8 w-full skeleton"></div>
					<div className=" h-8 w-full skeleton"></div>
					<div className=" h-8 w-full skeleton"></div>
					<div className=" h-8 w-full skeleton"></div>
					<div className=" h-8 w-full skeleton"></div>
				</div>
			</div>
			<div className="flex flex-col">
				<div className="px-8 pt-8">
					<div className="flex items-center justify-between">
						<div className="h-8 w-40 rounded-md skeleton"></div>
						<div className="flex items-center gap-4">
							<div className=" h-8 w-16 skeleton rounded-md"></div>
							<div className=" h-8 w-16 skeleton rounded-md"></div>
						</div>
					</div>

					<div className="mt-4 text-sm flex justify-start gap-2">
						<div className=" h-4 w-16 skeleton rounded-tl-md rounded-tr-md "></div>
						<div className=" h-4 w-16 skeleton rounded-tl-md rounded-tr-md "></div>
						<div className=" h-4 w-16 skeleton rounded-tl-md rounded-tr-md "></div>
						<div className=" h-4 w-16 skeleton rounded-tl-md rounded-tr-md "></div>
					</div>
				</div>
				<div className="w-full h-[1px] bg-gray-200"></div>

				<div className="m-4 h-full bg-gray-50 rounded-md p-4 flex flex-col gap-4">
					<div className="skeleton h-12 w-full rounded-md"></div>
					<div className="skeleton h-12 w-full rounded-md"></div>
					<div className="skeleton h-12 w-full rounded-md"></div>
					<div className="skeleton h-12 w-full rounded-md"></div>
				</div>
			</div>
		</>
	);
}

function Tab({ name, id }) {
	const { selectTab, tab } = useTemplate();
	return (
		<button
			onClick={() => {
				selectTab(id);
			}}
			className="w-fit"
		>
			<div className="">{name}</div>
			<div
				className={`h-[3px] rounded-tl-lg rounded-tr-lg w-full transition-all ${
					tab === id ? "bg-blue-500" : ""
				}`}
			></div>
		</button>
	);
}
