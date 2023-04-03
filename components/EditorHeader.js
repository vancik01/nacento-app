import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ArrowDown from "../public/SVG/ArrowDown";
import Pro from "./Pro";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import AccountToolbar from "./user_components/AccountToolbar";
import UserInfoHeader from "./user_components/UserInfoHeader";
import SelectProjectToolbar from "./editor/SelectProjectToolbar";
import ButtonSecondary from "./buttons/ButtonSecondary";
import ArrowBack from "../public/SVG/buttons/ArrowBack";
import { useData } from "../context/AppWrap";

export default function EditorHeader() {
	const router = useRouter();
	const {handleSave, savePromise} = useData()

	function saveOffer(){
		savePromise.then(() => {
			router.push('/dashboard')
		})	
	}

	return (
			<div className="flex justify-between items-center w-full px-10 pt-10 pb-5">
				<div className="flex items-center gap-8">
					<div>
						<ButtonSecondary
							onClick={saveOffer}
							iconBefore
							icon={<ArrowBack color={"black"}></ArrowBack>}
						>
							Zoznam ponúk
						</ButtonSecondary>
					</div>
					<SelectProjectToolbar />
				</div>
				<UserInfoHeader />
			</div>
	);
}
