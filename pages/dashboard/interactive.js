import Head from "next/head";
import React, { useState } from "react";
import TeamsList from "../../components/dashboard/TeamsList";
import UserInfoHeader from "../../components/user_components/UserInfoHeader";
import HomeSVG from "../../components/HomeSVG";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

import ButtonSecondary from "../buttons/components/ButtonSecondary";
import ArrowBack from "../../public/SVG/buttons/ArrowBack";

import { UseStepperContext } from "../../context/StepperContext";
import { ApiContext } from "../../context/ApiContext";

import HSForm from "../../components/form/HrubaStavbaForm";
import ElektromontazForm from "../../components/form/ElektromontazForm";

import HS from "./icons/HS";
import Elektro from "./icons/Elektro";
import Vykurovanie from "./icons/Vykurovanie";

export default function Dashboard() {
	const router = useRouter();

	var work_type;
	if (localStorage.getItem("WORK_TYPE") !== null) {
		work_type = window.localStorage.getItem("WORK_TYPE");
	} else work_type = -1;

	const [workTypes, SetWorkTypes] = useState(work_type);
	const [loading, setloading] = useState(false);
	const { userData } = useAuth();

	function hadndleWorkChange(ix) {
		if (workTypes == ix) {
			window.localStorage.setItem("WORK_TYPE", -1);
			SetWorkTypes(-1);
			return;
		}

		window.localStorage.setItem("WORK_TYPE", ix);
		SetWorkTypes(ix);
	}

	return (
		<div>
			<Head>
				<title>Dashboard</title>
			</Head>
			{/* <div style={{ backgroundColor: "#363636" }} className={"drop-shadow	"}> */}
			<div style={{ backgroundColor: "#2C2C2C" }} className={"drop-shadow	"}>
				{/* <Layout className="h-[55px]"> */}
				<div className="flex items-center justify-between px-4 h-[47px]">
					<div className="flex gap-4 text-white items-center">
						<HomeSVG />

						<div style={{ letterSpacing: "-0.2px" }}>
							<div style={{ fontSize: "14px" }}> {userData.name} </div>
							<div
								className="opacity-50 mt-[-4px]"
								style={{ fontSize: "10px" }}
							>
								{" "}
								{userData.email}{" "}
							</div>
						</div>
					</div>

					<UserInfoHeader color="white" is_smaller={true} />
				</div>
				{/* </Layout> */}
			</div>

			<div className="xl:grid" style={{ gridTemplateColumns: "240px 1fr" }}>
				<TeamsList></TeamsList>

				<div className="mb-16 mt-16 lg:mx-16">
					<ButtonSecondary
						href="/dashboard"
						iconBefore
						icon={<ArrowBack color={"black"}></ArrowBack>}
					>
						Zoznam ponúk
					</ButtonSecondary>

					<div className="flex items-center gap-12 mt-8 pb-6">
						<div className="text-center  text-xl font-medium	">
							Vyberte prácu, ktorú chcete naceniť:
						</div>

						<div className="flex gap-4 items-center font-medium justify-center">
							<SimpleButton
								color={"red"}
								active={workTypes == 0}
								title={"Hrubá stavba"}
								icon={<HS color={"#e11d48"} />}
								onClick={() => hadndleWorkChange(0)}
							></SimpleButton>

							<SimpleButton
								color={"blue"}
								active={workTypes == 1}
								title={"Elektroinštalácie"}
								icon={<Elektro color={"blue"} />}
								onClick={() => hadndleWorkChange(1)}
							></SimpleButton>

							<SimpleButton
								color={"green"}
								active={workTypes == 2}
								title={"Vykurovanie"}
								icon={<Vykurovanie color={"green"} />}
								onClick={() => hadndleWorkChange(2)}
							></SimpleButton>
						</div>
					</div>

					<UseStepperContext>
						<ApiContext>
							{workTypes == 0 && <HSForm theme_color={"red"} />}

							{workTypes == 1 && <ElektromontazForm theme_color={"blue"} />}

							{workTypes == 2 && (
								<div className="text-center pt-10">Pripravujeme...</div>
							)}
						</ApiContext>
					</UseStepperContext>
				</div>
			</div>
		</div>
	);
}

function SimpleButton({ color, active, title, onClick, icon }) {
	const colors = {
		red: [
			"hover:border-rose-600 hover:text-rose-600",
			"border-rose-600 text-rose-600",
			"text-gray-600",
		],
		green: [
			"hover:border-emerald-600 hover:text-emerald-600",
			"border-emerald-600 text-emerald-600",
			"text-gray-600",
		],
		blue: [
			"hover:border-blue-600	hover:text-blue-600",
			"border-blue-600 text-blue-600",
			"text-gray-600",
		],
	};

	return (
		<button
			onClick={onClick}
			className={`py-2 pr-4 pl-3 trans ${
				active ? colors[color][1] : colors[color][2]
			} ${
				colors[color][0]
			} border rounded-md flex items-center justify-center gap-2 text-start `}
		>
			<div className="flex items-center gap-2 justify-around">
				{icon && icon}
				{title}
			</div>
		</button>
	);
}
