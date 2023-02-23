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

export default function EditorHeader() {
	return (
		<nav className="h-32 flex items-center px-10">
			<div className="flex justify-between items-center w-full">
				<div>
					<SelectProjectToolbar />
				</div>
				<UserInfoHeader />
			</div>
		</nav>
	);
}
