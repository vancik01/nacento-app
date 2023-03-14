import React from "react";

import bg from "../../public/static/bg.svg";
import LogoHomepage from "../../public/SVG/LogoHomepage";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import UserInfoHeader from "../user_components/UserInfoHeader";

import mockupImg from "../../public/static/mockup.png";
import Footer from "./Footer";

import Mockup from "./Mockup";

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
												<UserInfoHeader></UserInfoHeader>

												<div className="absolute right-0 hidden mt-2 mr-24 navbar-btn sm:inline-block lg:mt-0 lg:static lg:mr-0">
													<Link
														className="main-btn gradient-btn"
														data-scroll-nav="0"
														href="/dashboard"
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

				<div id="home" className="header-hero">
					<div className="container flex justify-center gap-20">
						<div className="justify-center row mt-[12%]">
							<div className="w-full lg:w-full">
								<div className="text-center header-hero-content">
									<h1
										className="text-4xl font-bold text-left leading-tight text-white header-sub-title wow fadeInUp"
										data-wow-duration="1.3s"
										data-wow-delay="0.2s"
									>
										Stavbená firma či živnostník, zjednodušíme Vám tvorbu
										cenových ponúk
									</h1>

									<p className="text-justify font-light text-xl text-white lg:w-full pt-5">
										Jednoducho nasnímame projektovú dokumentáciu v PDF a
										vygenerujeme položkovo rozpísanú cenovú ponuku, ktorú si len
										upravíte. Vytvoríte si tak cenovú ponuku sami a za pár
										minút.
									</p>

									{/* <a href="/" className="main-btn gradient-btn gradient-btn-2 wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="1.1s">Get Started</a> */}
								</div>
							</div>
						</div>

						{/* <img src={ntbk.src} className=" w-1/2" alt="hero" /> */}
						{/* <div className="h-[1] w-[40%]">aa</div> */}
						{/* <img src	={mockupImg.src} className="w-[40%]" alt="hero" /> */}
						<Mockup />

						{/* <div className="justify-center row">
                    <div className="w-full lg:w-2/3">
                        <div className="text-center header-hero-image wow fadeIn" data-wow-duration="1.3s" data-wow-delay="1.4s">
                            <img src={ntbk} alt="hero"/>
                        </div> 
                    </div>
                </div>  */}
					</div>
				</div>

				<div className="w-[1px] h-[300px]"></div>
			</header>
		</>
	);
}

export default HomeArea;
