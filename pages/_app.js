import { ToastContainer } from "react-toastify";
import { AppWrap } from "../context/AppWrap";
import AuthContext from "../context/AuthContext";
import TeamContext from "../context/TeamContext";
import "../styles/globals.css";
import "../styles/index.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
	return (
		<AuthContext>
			<TeamContext>
				<ToastContainer
					position="top-center"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
				<Component {...pageProps} />
			</TeamContext>
		</AuthContext>
	);
}

export default MyApp;
