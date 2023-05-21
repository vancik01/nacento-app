import React from "react";

export default function PriceChangeIndicator({ val, endAdorment }) {
	//console.log(parseFloat(val * -1));
	//if ((val = -0)) val *= -1;
	if (val >= 0) {
		return (
			<div className="text-[#2b8f3b] text-xs">
				+{parseFloat(val).toFixed(2)}
				{endAdorment ? endAdorment : " €"}
			</div>
		);
	} else {
		return (
			<div className="text-[#8f2b2b] text-xs">
				{parseFloat(val).toFixed(2)}
				{endAdorment ? endAdorment : " €"}
			</div>
		);
	}
}
