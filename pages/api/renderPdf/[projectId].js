import ReactPDF from "@react-pdf/renderer";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { Pdf } from "../../../components/Pdf";
import { useAuth } from "../../../context/AuthContext";
import { firestore } from "../../../lib/firebase";
import { getTitle } from "../../../lib/helpers";

export default async function test(req, res) {
	const { projectId } = req.query;
	const docRef = doc(firestore, `offers/${projectId}`);
	const snap = await getDoc(docRef);

	if (!snap.exists()) {
		res.status(404).send("Error, no Id");
	}

	const dbData = snap.data();

	var result;

	try {
		result = await ReactPDF.renderToStream(
			<Pdf
				data={dbData.data}
				title={dbData.name}
				logo={dbData?.images?.logo}
				layout={dbData.layout}
				totals={dbData.totals}
				isHorizontal={dbData.layout.isHorizontal}
				signature={dbData?.images?.signature}
				expiration={dbData.expiration}
				subHeading={dbData.subHeading}
				description={dbData.description}
			/>
		);
	} catch (error) {
		console.log(error);
	}

	res.setHeader("Content-Type", "application/pdf");
	res.setHeader("Content-Disposition", `attachment; filename=${dbData.name}`);

	// Streaming our resulting pdf back to the user
	result.pipe(res);
}
