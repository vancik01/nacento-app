import React, { useEffect, useState } from "react";
import { useData } from "../../context/AppWrap";
import { numberWithCommas } from "../../lib/helpers";
import PriceChangeIndicator from "./PriceChangeIndicator";
import ButtonSecondary from "../buttons/ButtonSecondary";
import { getValue } from "../../context/ValuesContext";


export default function BottomBar() {
	const {initialTotal, total } = useData();

	const [value, setValue] = getValue((data) => data.data.totals);

	const data = {
		total: 0,
		total_construction_price: 0,
		total_delivery_price: 0,
	}


	const [changeDodavka, setchangeDodavka] = useState(data.total_delivery_price - initialTotal.dodavka);
	const [changeMontaz, setchangeMontaz] = useState(0);
	const [changeTotal, setchangeTotal] = useState(0);

	function format_number(number) {
		if(!number) return 0;
		return numberWithCommas(number.toFixed(2))
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	useEffect(() => {
		if(value){
			setchangeDodavka(
				(value.total_delivery_price - initialTotal.total_delivery_price).toFixed(2));

			setchangeMontaz(
				(value.total_construction_price - initialTotal.total_construction_price).toFixed(2));

			setchangeTotal((value.total - initialTotal.total).toFixed(2));
		}

		else{
			setchangeDodavka(0);
			setchangeMontaz(0);
			setchangeTotal(0);
		}
	}, [value]);

	return (
		<div className="bottom-bar bg-white relative h-16">
				<div className="flex h-full flex-row justify-center items-center w-full gap-20">
					<div className="relative w-fit" id="bulk-edit">
						<PriceChangeIndicator val={changeMontaz} />
						<div>
							Cena Montáže:{" "}
							{format_number(value?.total_construction_price)}€
						</div>
					</div>

					<div className="relative w-fit">
						<PriceChangeIndicator val={changeDodavka} />
						<div>
							Cena Dodávky:{" "}
							{format_number(value?.total_delivery_price)}
							{/* {numberWithCommas(value?.total_delivery_price.toFixed(2))}  */}€
						</div>
					</div>

					<div className="relative w-fit">
						<PriceChangeIndicator val={changeTotal} />
						<div>
							Spolu: {" "}
							{format_number(value?.total)}
							{/* {numberWithCommas(value?.total.toFixed(2))}  */}
							€{" "}
							<span className="text-[10px]">bez DPH</span>
						</div>
					</div>

					<div className="absolute right-1">
						<ScrollToTop/>
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