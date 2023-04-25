import React, { useEffect, useState } from "react";
import { useData } from "../context/AppWrap";
import { numberWithCommas } from "../lib/helpers";
import EditPen from "../public/SVG/EditPen";
import Layout from "./Layout";
import PriceChangeIndicator from "./PriceChangeIndicator";
import ButtonSecondary from "./buttons/ButtonSecondary";
import { getValue } from "../context/ValuesContext";

export default function BottomBar() {
	const { total, initialTotal, openBulkEdit, bulkEdit, toggleTotals } =
		useData();

	const [newTotal] = getValue((data) => data.sections[0].info.total);
	const [total_delivery_price] = getValue(
		(data) => data.sections[0].info.total_delivery_price
	);
	const [total_construction_price] = getValue(
		(data) => data.sections[0].info.total_construction_price
	);

	const [changeDodavka, setchangeDodavka] = useState(
		total.total_delivery_price - initialTotal.dodavka
	);
	const [changeMontaz, setchangeMontaz] = useState(0);
	const [changeTotal, setchangeTotal] = useState(0);

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}
	useEffect(() => {
		setchangeDodavka(
			(total_delivery_price - initialTotal.total_delivery_price).toFixed(
				2
			)
		);
		setchangeMontaz(
			(
				total_construction_price - initialTotal.total_construction_price
			).toFixed(2)
		);
		setchangeTotal((newTotal - initialTotal.total).toFixed(2));
	}, [newTotal]);

	return (
		<div className="bottom-bar bg-white relative h-16 z-30">
			<div className="flex h-full flex-row justify-center items-center w-full gap-20">
				<div className="relative w-fit" id="bulk-edit">
					<PriceChangeIndicator val={changeMontaz} />
					<div>
						Cena Montáže:{" "}
						{numberWithCommas(total_construction_price)} €
					</div>
				</div>

				<div className="relative w-fit">
					<PriceChangeIndicator val={changeDodavka} />
					<div>
						Cena Dodávky:{" "}
						{numberWithCommas(total_delivery_price)} €
					</div>
				</div>

				<div className="relative w-fit">
					<PriceChangeIndicator val={changeTotal} />
					<div>
						Spolu: {numberWithCommas(newTotal)} €{" "}
						<span className="text-[10px]">bez DPH</span>
					</div>
				</div>

				<div className="absolute right-1">
					<ScrollToTop />
				</div>

			</div>



		</div>
	);
}



const ScrollToTop = () => {
	const [showTopBtn, setShowTopBtn] = useState(false);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 400) {
				setShowTopBtn(true);
			} else {
				setShowTopBtn(false);
			}
		});
	}, []);
	const goToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	return (
		<>
			{showTopBtn && (
				<ButtonSecondary
					onClick={goToTop}
				>
					Späť hore
				</ButtonSecondary >
			)}
		</>
	);
};