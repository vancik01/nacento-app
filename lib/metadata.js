export const layoutConfig = {
	columnsWidth: {
		index: "30px",
		service_type: "30px",
		item_id: "120px",
		title: "1fr",
		unit: "70px",
		quantity: "70px",
		unit_delivery_price: "90px",
		unit_construction_price: "90px",
		total_delivery_price: "90px",
		total_construction_price: "90px",
		total: "90px",
	},
	defaultVisibleColumns: [
		"title",
		"unit",
		"quantity",
		"total_delivery_price",
		"total_construction_price",
		"total",
		// "unit_delivery_price",
		// "unit_construction_price",
	],

	defaultColors: [
		"#63A695",
		"#3399FF",
		"#000000",
		"#FF0000",
		"#F2A359",
		"#08A4BD",
		"#B5DDA4",
		"#745C97",
		"#C73E1D",
	],
};

export const themes = {
	theme1: {
		paper: {
			backgroundColor: "white",
		},

		header: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
		},

		logo: {},
		header_text: {},

		content: {},

		summary_info: {},

		customer: {},
		supplyer: {},
		price_summary: {},

		blocks_wraper: {},

		block: {},

		table: {},

		table_header: {},

		table_content: {},

		block_summary: {},

		footer: {},
	},
};

export const variant = {
	basic: {
		sections: true,
		blocks: false,
		table: false,
		sectionSummary: false,
		sectionWrap: true,
		summary: false,
		id: "basic",
	},
	normal: {
		sections: true,
		blocks: false,
		table: false,
		sectionSummary: true,
		sectionWrap: false,
		summary: false,
		id: "normal",
	},
	pro: {
		sections: true,
		blocks: true,
		table: true,
		sectionSummary: false,
		sectionWrap: true,
		summary: true,
		id: "pro",
	},
};

/*
    {
        sections:true|false,
        blocks:true|false,
        table:true|false,
        blockSummary:true|false,
        sectionSummary:true|false,
    }
*/
