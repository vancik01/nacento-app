import { ToastContainer } from "react-toastify";
import { AppWrap } from "../context/AppWrap";
import AuthContext from "../context/AuthContext";
import TeamContext from "../context/TeamContext";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import ExcelContext from "../context/ExcelContext";

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	return (
		<AuthContext>
			<TeamContext>
				<ExcelContext>
					<ToastContainer
						position="top-center"
						autoClose={1000}
						hideProgressBar={true}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="light"
					/>
					<AnimatePresence mode="wait">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.1 }}
							key={router.asPath}
						>
							<Component {...pageProps} />
						</motion.div>
					</AnimatePresence>
				</ExcelContext>
			</TeamContext>
		</AuthContext>
	);
}

export default MyApp;
