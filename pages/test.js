import React from "react";
import UploadImage from "../components/editor/UploadImage";

export default function test() {
	return (
		<div>
			<UploadImage
				defaultPreview="https://firebasestorage.googleapis.com/v0/b/cenova-ponuka.appspot.com/o/users%2FgQOCLWJ9imVjAiuJdPOAjTYbBOA3%2Fsrdiecko-enics-gpv.png?alt=media&token=e029635d-1b10-4cb3-9cd6-7b6ee821f14d"
				height={100}
				width={300}
				onUpload={(url) => {
					console.log("From parent", url);
				}}
			></UploadImage>
		</div>
	);
}
