import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import ButtonPrimary from "../../components/buttons/ButtonPrimary";
import VOoffer from "../../components/ViewOnlyOffer/VOoffer";
import LayoutContext from "../../context/LayoutContext";
import ViewOnlyContext from "../../context/ViewOnlyContext";
import { firestore } from "../../lib/firebase";
import Logo from "../../public/assets/editor/Logo";

export default function View({ dbData }) {
	const router = useRouter();
	const offerId = router.query.offerId;
	return (
		<div className='w-fit px-8 mx-auto'>
			<nav className='h-32 flex items-center'>
				<div className='flex justify-between items-center w-full'>
					<div className='w-32'>
						<Logo></Logo>
					</div>
					<div className='flex items-center gap-8'>
						<div>
							<ButtonPrimary
								href='/dashboard'
								//iconBefore
								color='#64A695'
								//icon={<ArrowBack color={"white"}></ArrowBack>}
							>
								Vyskúšaj na 14 zadarmo
							</ButtonPrimary>
						</div>
					</div>
				</div>
			</nav>
			<div>
				<LayoutContext layout={dbData.layout} headers={dbData.data.headers}>
					<ViewOnlyContext dbData={dbData}>
						<VOoffer></VOoffer>
					</ViewOnlyContext>
				</LayoutContext>
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	const projectId = context.query.projectId;

	const docRef = doc(firestore, `/shareView/${projectId}`);
	const snap = await getDoc(docRef);
	if (snap.exists()) {
		return {
			props: {
				dbData: { ...snap.data() },
			},
		};
	}
}
