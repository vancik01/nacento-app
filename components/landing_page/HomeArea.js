import React from "react";

import logo from "../../public/static/logo.svg";
import ntbk from "../../public/static/imgs/ntbk.png";
import bg from "../../public/static/bg.svg";
import LogoHomepage from "../../public/SVG/LogoHomepage";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import UserInfoHeader from "../user_components/UserInfoHeader";

import FunctionsDiv from "./FunctionDiv";
import FunctionDiv_p from "./FunctionDiv_p";

import Zaklady from "../../public/static/Zaklady.png";
import Murivo from "../../public/static/Murivo.png";
import Strecha from "../../public/static/Strecha.png";

function HomeArea() {
	const { user, loading } = useAuth();

	return (
		<>
			<header
				className="header-area header-hero"
				style={{ backgroundImage: `url(${bg.src})` }}
			>
				<div className="navbar-area">
					<div className="container relative">
						<div className="row">
							<div className="w-full">
								<nav className="flex items-center justify-between navbar navbar-expand-lg py-10">
									<a className="mr-4 navbar-brand" href="/">
										{/* <img src={logo.src} alt="Logo" /> */}
										<div className="w-32">
											<LogoHomepage></LogoHomepage>
										</div>
									</a>

									{/* <div className="absolute left-0 z-20 hidden w-full px-5 py-3 duration-300 bg-white shadow lg:w-auto collapse navbar-collapse lg:block top-100 mt-full lg:static lg:bg-transparent lg:shadow-none"> */}
									<div>
										<ul
											id="nav"
											className="items-center content-start mr-auto lg:justify-end navbar-nav lg:flex"
										>
											<li className="nav-item active">
												<a className="page-scroll" href="/">
													Domov
												</a>
											</li>
											<li className="nav-item">
												<a className="page-scroll" href="/">
													Funkcie
												</a>
											</li>
											<li className="nav-item">
												<a className="page-scroll" href="/">
													O nás
												</a>
											</li>
											<li className="nav-item">
												<a className="page-scroll" href="/">
													Prečo
												</a>
											</li>
											<li className="nav-item">
												<a className="page-scroll" href="/">
													Tím
												</a>
											</li>
											<li className="nav-item">
												<a className="page-scroll" href="/">
													Blog
												</a>
											</li>
										</ul>
									</div>

									<div className="flex items-center justify-center gap-10">
										{!loading && (
											<>
												{!user && (
													<div className="absolute right-0 hidden mt-2 mr-24 navbar-btn sm:inline-block lg:mt-0 lg:static lg:mr-0">
														<Link
															className="main-btn gradient-btn"
															data-scroll-nav="0"
															href="/login/"
															rel="nofollow"
														>
															Prihlásiť sa
														</Link>
													</div>
												)}
												{user && <UserInfoHeader></UserInfoHeader>}

												<div className="absolute right-0 hidden mt-2 mr-24 navbar-btn sm:inline-block lg:mt-0 lg:static lg:mr-0">
													<Link
														className="main-btn gradient-btn"
														data-scroll-nav="0"
														href="/cenova-ponuka/select-project"
														rel="nofollow"
													>
														Admin
													</Link>
												</div>
											</>
										)}
									</div>
								</nav>
							</div>
						</div>
					</div>
				</div>

				{/* <div id="home" className="header-hero" style={{ backgroundImage: `url(${bg})` }}></div> */}

				<div id="home" className="header-hero pt-10">
					<div className="container flex justify-center items-center">
						<div className="justify-center row w-[80%]">
							<div className="w-full lg:w-full">
								<div className="text-center header-hero-content">
									<h1
										className="text-4xl font-bold text-center leading-tight text-white header-sub-title wow fadeInUp"
										data-wow-duration="1.3s"
										data-wow-delay="0.2s"
									>
										Stavbená firma či živnostník, zjednodušíme Vám tvorbu cenových ponúk
									</h1>

									<p
										className="text-justify font-light text-xl text-white lg:w-full pt-5">
										Jednoducho nasnímame projektovú dokumentáciu v PDF a vygenerujeme položkovo rozpísanú cenovú ponuku, ktorú si len upravíte. Vytvoríte si tak cenovú ponuku sami a za pár minút.
									</p>






									<hr className="mt-6 pb-4" />


									{/* <a href="/" className="main-btn gradient-btn gradient-btn-2 wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="1.1s">Get Started</a> */}
								</div>
							</div>
						</div>

						{/* <img src={ntbk.src} className=" w-1/2" alt="hero" /> */}
						{/* <div className="justify-center row">
                    <div className="w-full lg:w-2/3">
                        <div className="text-center header-hero-image wow fadeIn" data-wow-duration="1.3s" data-wow-delay="1.4s">
                            <img src={ntbk} alt="hero"/>
                        </div> 
                    </div>
                </div>  */}
					</div>
				</div>

				<div className="flex justify-evenly gap-[25%] mt-20">

					<div className=" w-[40%]">
						<div className="text-white text-center text-3xl font-bold">
							Príkladová cenová ponuka:
						</div>

						<div className="justify-evenly row">
							<FunctionsDiv
								title={"Základová doska"}
								image={Zaklady.src}
								landing={true}/>

							<FunctionsDiv
								title={"Murivo"}
								image={Murivo.src}
								landing={true}/>

							<FunctionsDiv
								title={"Strecha"}
								image={Strecha.src}
								landing={true}/>

						</div>
					</div>
					

					<div className="w-[20%] text-center">
						
					PONUKA

					</div>

				</div>



				<div className="w-[1px] h-[300px]"></div>
			</header>
		</>
	);
}

export default HomeArea;
