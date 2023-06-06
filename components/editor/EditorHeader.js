import React from "react";
import { useRouter } from "next/router";
import UserInfoHeader from "../user_components/UserInfoHeader";
import SelectProjectToolbar from "./SelectProjectToolbar";
import ButtonSecondary from "../buttons/ButtonSecondary";
import ArrowBack from "../../public/assets/buttons/ArrowBack";
import { useData } from "../../context/AppWrap";
import ButtonPrimary from "../buttons/ButtonPrimary";
import Share from "../../public/assets/buttons/Share";
import { useActions } from "../../context/ActionsContext";

export default function EditorHeader() {
	const router = useRouter();
	const { handleSave } = useData();
	const { openShare } = useActions();

	return (
		<div className='flex justify-between items-center w-full px-10 pt-10 pb-5'>
			<div className='flex items-center gap-8'>
				<div>
					<ButtonSecondary
						onClick={() => {
							handleSave(false);
							router.replace("/dashboard");
						}}
						// href="/dashboard"
						iconBefore
						icon={<ArrowBack color={"black"}></ArrowBack>}
					>
						Zoznam ponúk
					</ButtonSecondary>
				</div>
				<SelectProjectToolbar />
			</div>
			<div className='flex items-center justify-center gap-8'>
				<ButtonPrimary
					onClick={openShare}
					iconAfter
					icon={<Share color='white' />}
				>
					Zdielať
				</ButtonPrimary>
				<UserInfoHeader />
			</div>
		</div>
	);
}
