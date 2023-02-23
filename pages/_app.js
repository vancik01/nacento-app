import { AppWrap } from "../context/AppWrap";
import AuthContext from "../context/AuthContext";
import "../styles/globals.css";
import "../styles/index.css";

function MyApp({ Component, pageProps }) {
	return (
		<AuthContext>
			<Component {...pageProps} />
		</AuthContext>
	);
}

export default MyApp;
