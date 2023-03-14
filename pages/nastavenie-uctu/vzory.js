import React, { useState } from "react";
import FullPageLoading from "../../components/loading/FullPageLoading";
import SimpleCenovaPonuka from "../../components/SimpleCenovaPonuka/SimpleCenovaPonuka";
import AccountSidebarSkeleton from "../../components/skeletons/AccountSidebarSkeleton";
import AccountSidebarMenu from "../../components/user_components/AccountSidebarMenu";

function vzory() {
	const [loading, setloading] = useState(false);
	return (
		<div>
			<FullPageLoading></FullPageLoading>
			<div className="flex">
				{!loading ? (
					<AccountSidebarMenu></AccountSidebarMenu>
				) : (
					<AccountSidebarSkeleton />
				)}
				<div className="w-full py-16 px-10">
					<h1 className="text-2xl">Vzory</h1>
					<SimpleCenovaPonuka />
				</div>
			</div>
		</div>
	);
}

export default vzory;
