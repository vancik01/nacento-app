import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function index() {
	const router = useRouter();
	useEffect(() => {
		router.push("/z-vykazu-vymer/");
	}, []);

	return <div>Redirecting</div>;
}

