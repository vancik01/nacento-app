
export const customBuild = {
	customer: {
		name: "",
	},
	supplyer: {
		company_name: "",
		ico: "",
		dic: "",
		phone: "",
		email: "",
		web: "",
	},
	headers: [
		"service_type",
		"item_id",
		"title",
		"unit",
		"quantity",
		"unit_delivery_price",
		"unit_construction_price",
		"total_delivery_price",
		"total_construction_price",
		"total",
	],
	sections: [],
	totals: {
		total_delivery_price: 0,
		total_construction_price: 0,
		total: 0,
	}
};

// {
// 	info: {
// 		title: "Nová sekcia",
// 		total_delivery_price: 0,
// 		total_construction_price: 0,
// 		total: 0,
// 	},
// 	blocks: [{
// 		info: {
// 			title: "Nový blok",
// 			total_delivery_price: 0,
// 			total_construction_price: 0,
// 			total: 0,
// 		},
// 		items: [{
// 			service_type: "",
// 			item_id: "U000000",
// 			title: "Nová položka",
// 			unit: "m",
// 			quantity: 0,
// 			unit_delivery_price: 0.0,
// 			unit_construction_price: 0.0,
// 			total_delivery_price: 0.0,
// 			total_construction_price: 0.0,
// 			total: 0.0,
// 		}],
// 	}],
// }