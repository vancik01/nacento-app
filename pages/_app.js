import { AppWrap } from "../context/AppWrap";
import AuthContext from "../context/AuthContext";
import TeamContext from "../context/TeamContext";
import "../styles/globals.css";
import "../styles/index.css";

function MyApp({ Component, pageProps }) {
	return (
		<AuthContext>
			<TeamContext>
				<Component {...pageProps} />
			</TeamContext>
		</AuthContext>
	);
}

export default MyApp;
