import { useAuth } from "../context/AuthContext";

export function LoggedIn() {
	const { logOut } = useAuth();
	return (
		<div className="flex items-center flex-col">
			<h1 className="text-4xl">Už ste prihlásený</h1>
			<button
				className="text-center underline text-red-500 mt-4"
				onClick={logOut}
			>
				Odhlásiť sa
			</button>
		</div>
	);
}
