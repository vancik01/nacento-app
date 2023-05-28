import React from "react";
import TemplateBlock from "./TemplateBlock";
import { useTemplate } from "../../context/TemplateContext";

export default function TemplateItem({ template }) {
	const { tab } = useTemplate();
	return (
		<>
			{template.type == "block" && <TemplateBlock template={template} />}
			{template.type == "section" && <div>Section</div>}
			{template.type == "item" && <div>Item</div>}
		</>
	);
}
