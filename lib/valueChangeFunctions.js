export function splitBetweenSections(sections, valueToAdd, valueId, total) {
	if (valueId === "total" || valueId === "total_vat") {
		var value;

		if (valueId === "total_vat") valueToAdd = valueToAdd / 1.2;

		var add_total_construction_price =
			(total["total_construction_price"] / total.total) * valueToAdd;
		var add_total_delivery_price =
			(total["total_delivery_price"] / total.total) * valueToAdd;

		sections.map((section, sectionId) => {
			if (parseFloat(section.info.total) !== 0) {
				var add_construction =
					(section.info["total_construction_price"] /
						total["total_construction_price"]) *
					add_total_construction_price;

				var add_delivery =
					(section.info["total_delivery_price"] /
						total["total_delivery_price"]) *
					add_total_delivery_price;

				splitBetweenBlocks(
					section,
					add_construction,
					"total_construction_price"
				);
				splitBetweenBlocks(section, add_delivery, "total_delivery_price");
			}
		});
	} else {
		sections.map((section, sectionId) => {
			if (parseFloat(section.info.total) !== 0) {
				var sum = (section.info[valueId] / total[valueId]) * valueToAdd;
				splitBetweenBlocks(section, sum, valueId);
			}
		});
	}

	return sections;
}

export function splitBetweenBlocks(section, valueToAdd, valueId) {
	const totalSection = section.info;

	if (valueId === "total") {
		//vytvorenie koeficientov
		var add1 = [];
		var add2 = [];

		if (section.blocks.length > 0) {
			if (parseFloat(section.info.total) === 0) {
				section.blocks.map((block, blockId) => {
					var value_per_block = valueToAdd / section.blocks.length;
					add1.push(value_per_block / 2);
					add2.push(value_per_block / 2);
				});
			} else {
				var sum =
					(totalSection["total_construction_price"] / totalSection.total) *
					valueToAdd;

				section.blocks.map((block, blockId) => {
					if (parseFloat(section.info.total_construction_price) === 0) {
						add1.push(0);
					} else {
						add1.push(
							(block.info["total_construction_price"] /
								totalSection["total_construction_price"]) *
								sum
						);
					}
				});

				//vytvorenie koeficientov
				sum =
					(totalSection["total_delivery_price"] / totalSection.total) *
					valueToAdd;

				section.blocks.map((block, blockId) => {
					if (parseFloat(section.info.total_delivery_price) === 0) {
						add1.push(0);
					} else {
						add2.push(
							(block.info["total_delivery_price"] /
								totalSection["total_delivery_price"]) *
								sum
						);
					}
				});
			}
		} else {
			if (parseFloat(section.info.total) === 0) {
				section.info.total_construction_price =
					parseFloat(section.info.total_construction_price) + valueToAdd / 2;
				section.info.total_delivery_price =
					parseFloat(section.info.total_delivery_price) + valueToAdd / 2;
				section.info.total = parseFloat(section.info.total) + valueToAdd;
			} else {
				section.info.total_construction_price +=
					valueToAdd *
					(section.info.total_construction_price / section.info.total);
				section.info.total_delivery_price +=
					valueToAdd * (section.info.total_delivery_price / section.info.total);
				section.info.total += valueToAdd;
			}
			return section;
		}

		//nastavenie hodnôt

		section.blocks.map((block, blockId) => {
			block = splitBetweenItems(
				block,
				add1[blockId],
				"total_construction_price"
			);
		});

		section.blocks.map((block, blockId) => {
			block = splitBetweenItems(block, add2[blockId], "total_delivery_price");
		});
	} else {
		if (section.blocks.length === 0) {
			section.info[valueId] =
				parseFloat(section.info[valueId]) + parseFloat(valueToAdd);
			section.info.total =
				parseFloat(section.info.total) + parseFloat(valueToAdd);
			return section;
		} else {
			var add = [];
			if (parseFloat(section.info[valueId]) > 0) {
				section.blocks.map((block, blockId) => {
					add.push((block.info[valueId] / totalSection[valueId]) * valueToAdd);
				});
			} else {
				section.blocks.map((block, blockId) => {
					add.push(valueToAdd / section.blocks.length);
				});
			}

			section.blocks.map((block, blockId) => {
				//var sum = (block.info[valueId] / totalSection[valueId]) * valueToAdd
				var sum = add[blockId];
				// totalValue+=sum
				block = splitBetweenItems(block, sum, valueId);
			});
		}
	}

	section = updateSectionTotals(section).info;

	return section;
}

export function splitBetweenItems(block, value, valueId) {
	if (value == 0) return;

	if (block.items.length == 0) {
		if (valueId == "total") {
			if (block.info["total"] === 0) {
				block.info["total_construction_price"] = parseFloat(value / 2).toFixed(
					2
				);

				block.info["total_delivery_price"] = parseFloat(value / 2).toFixed(2);

				block.info["total"] = parseFloat(value).toFixed(2);
			} else {
				var cdcIndex = block.info["total_delivery_price"] / block.info["total"];

				var cmcIndex =
					block.info["total_construction_price"] / block.info["total"];

				block.info["total"] =
					parseFloat(block.info["total"]) + parseFloat(value);

				block.info["total_construction_price"] =
					parseFloat(block.info["total_construction_price"]) +
					parseFloat(value * cmcIndex);

				block.info["total_delivery_price"] =
					parseFloat(block.info["total_delivery_price"]) +
					parseFloat(value * cdcIndex);
			}
		} else {
			block.info[valueId] = parseFloat(block.info[valueId]) + parseFloat(value);

			block.info["total"] = parseFloat(block.info["total"]) + parseFloat(value);
		}

		return block;
	}

	var sum = parseFloat(block.info[valueId]);
	var allZero = true;

	block.items.map((item, i) => {
		//console.log(`${((item[valueId] / sum) *100).toFixed(2)}% -> + ${((item[valueId] / sum) * value).toFixed(2)}`)
		item[valueId] = parseFloat(item[valueId]);
		if (item[valueId] === 0 || item["quantity"] === 0) {
		} else {
			item = updateTableRow(
				item,
				valueId,
				parseFloat(item[valueId]) + parseFloat((item[valueId] / sum) * value)
			);

			allZero = false;
		}
	});

	if (allZero) {
		block.items.map((item, i) => {
			item = updateTableRow(
				item,
				valueId,
				parseFloat(block.items[i][valueId]) +
					parseFloat(value / block.items.length)
			);
		});
	}

	block = updateBlockTotals(block);

	return block;
}

export function updateTableRow(item, valueId, value) {
	if (value < 0 || value === NaN || isNaN(value) || !value) {
		value = 0;
	}

	if (valueId == "title") {
		item.title = value;
		return item;
	}

	if (valueId != "total") {
		item[valueId] = parseFloat(value);
	}

	if (valueId === "total_construction_price") {
		//ak je quantity 0 nastav na 1
		if (item.quantity == 0) {
			item.quantity = 1;
		}

		item["unit_construction_price"] = parseFloat(
			parseFloat(value) / item["quantity"]
		).toFixed(2);
		item.total = parseFloat(
			parseFloat(item.total_construction_price) +
				parseFloat(item.total_delivery_price)
		).toFixed(2);
	} else if (valueId === "total_delivery_price") {
		item["unit_delivery_price"] = (
			item["total_delivery_price"] / item["quantity"]
		).toFixed(2);

		item.total_delivery_price = value;

		item.total = parseFloat(
			parseFloat(item.total_construction_price) +
				parseFloat(item.total_delivery_price)
		).toFixed(2);
	} else if (valueId === "total") {
		var valueChange = value - item.total;
		var cmcIndex;
		var cdcIndex;
		if (parseFloat(item.total) !== 0) {
			var cmcIndex = item.total_construction_price / item.total;
			var cdcIndex = item.total_delivery_price / item.total;
		} else {
			var cmcIndex = 0.5;
			var cdcIndex = 0.5;
		}

		// console.log("cmc -> ", cmcIndex *100, "% ->" , parseFloat(valueChange * cmcIndex))
		// console.log("cdc -> ", cdcIndex *100, "%->", parseFloat(valueChange * cdcIndex))

		item.total_construction_price = (
			parseFloat(item.total_construction_price) +
			parseFloat(valueChange * cmcIndex)
		).toFixed(2);

		item.total_delivery_price = (
			parseFloat(item.total_delivery_price) + parseFloat(valueChange * cdcIndex)
		).toFixed(2);

		item.unit_construction_price = parseFloat(
			item.total_construction_price / item.quantity
		).toFixed(2);

		item.unit_delivery_price = parseFloat(
			item.total_delivery_price / item.quantity
		).toFixed(2);

		item.total = parseFloat(value);
	} else {
		item["total_construction_price"] =
			item.unit_construction_price * item.quantity;

		item["total_delivery_price"] = item.unit_delivery_price * item.quantity;

		item.total = item.total_construction_price + item.total_delivery_price;

		//2 desatinné miesta
		item["total_construction_price"] = parseFloat(
			item["total_construction_price"]
		).toFixed(2);

		item["unit_construction_price"] = parseFloat(
			item["unit_construction_price"]
		).toFixed(2);

		item["total"] = parseFloat(item["total"]).toFixed(2);
	}

	return item;
}

export function updateBlockTotals(block) {
	block.info["total_delivery_price"] =
		block.info["total_construction_price"] =
		block.info["total"] =
			0;
	block.items.map((item, i) => {
		block.info["total_delivery_price"] += parseFloat(
			item["total_delivery_price"]
		);
		block.info["total_construction_price"] += parseFloat(
			item["total_construction_price"]
		);
	});

	block.info.total =
		block.info["total_construction_price"] + block.info["total_delivery_price"];

	return block;
}

export function updateSectionTotals(section) {
	section.info.total = 0;
	section.info["total_construction_price"] = 0;
	section.info["total_delivery_price"] = 0;

	section?.blocks.map((block, blockId) => {
		section.info.total += parseFloat(block.info["total"]);
		section.info["total_construction_price"] += parseFloat(
			block.info["total_construction_price"]
		);
		section.info["total_delivery_price"] += parseFloat(
			block.info["total_delivery_price"]
		);
	});

	return section;
}
