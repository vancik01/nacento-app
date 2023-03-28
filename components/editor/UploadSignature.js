import React, { useEffect, useState } from "react";
import { useData } from "../../context/AppWrap";
import { useLayout } from "../../context/LayoutContext";
import Close from "../../public/SVG/Close";

export default function UploadSignature() {
	const [selectedFile, setselectedFile] = useState();
	const { primaryColor } = useLayout();

	const { signature, setsignature } = useData();

	useEffect(() => {
		if (selectedFile && selectedFile.target.files.length > 0) {
			setsignature(URL.createObjectURL(selectedFile?.target?.files[0]));
		} else {
			setsignature(null);
		}
	}, [selectedFile]);

	return (
		<div className="flex justify-between items-center relative">
			<label htmlFor="upload-signature">
				{!signature && (
					<div className="text-xl px-6 py-2 border h-40 w-64 flex justify-center items-center hover:bg-gray-100 transition-all">
						Nahrať podpis
					</div>
				)}
			</label>
			{signature && (
				<img
					src={signature}
					alt="logo"
					className="max-w-[250px] max-h-[200px]"
				/>
			)}
			{signature && (
				<button
					onClick={() => {
						setselectedFile(null);
					}}
					className="absolute -top-3 -right-2"
				>
					<Close color={"red"}></Close>
				</button>
			)}

			<input
				accept=".jpg,.jpeg,.png"
				type="file"
				onChange={setselectedFile}
				className="hidden"
				name=""
				id="upload-signature"
			></input>
		</div>
	);
}
