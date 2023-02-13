import React from 'react'
// import logo from "../assets/logo.svg"
// import ftrbg from "../assets/footer-bg.svg"

import logo from "../../public/static/logo.svg"
import ftrbg from "../../public/static/footer-bg.svg"


function Footer() {
    return (
        <footer id="footer" className="relative z-10 footer-area pt-[250px] mt-[250px]">

            <div className="footer-bg" style={{ backgroundImage: `url(${ftrbg.src})` }}></div>
            <div className="container">
                <div className="px-6 pt-10 pb-20 mb-12 bg-white rounded-lg shadow-xl md:px-12 subscribe-area wow fadeIn" data-wow-duration="1s" data-wow-delay="0.5s">
                    <div className="row justify-between	">
                        <div className="w-full lg:w-1/2">
                            <div className="lg:mt-12 subscribe-content">
                                <h2 className="text-2xl font-bold sm:text-4xl subscribe-title">
                                    Chceš sa k nám pridať?
                                    <span className="block font-normal">Zadaj svoj mail a my ti napíšeme :)</span>
                                </h2>
                            </div>
                        </div>
                        <div className="w-full lg:w-[45%]">
                            <div className="mt-12 subscribe-form">
                                <form action="#" className="relative focus:outline-none">
                                    <input type="email" placeholder="Zadaj email" className="w-full py-4 pl-6 pr-40 duration-300 border-2 rounded focus:border-theme-color focus:outline-none" />
                                    <button className="main-btn gradient-btn">Pridaj sa!</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-widget pb-120">
                    <div className="row">
                        <div className="w-4/5 md:w-3/5 lg:w-2/6">
                            <div className="mt-12 footer-about wow fadeIn" data-wow-duration="1s" data-wow-delay="0.2s">
                                <a className="inline-block mb-8 logo" href="index.html">
                                    <img src={logo.src} alt="logo" className="w-40" />
                                </a>
                                <p className="pb-10 pr-10 leading-snug text-white">Vložte potrebné projekty rodinného domu v PDF a bude vám vygenerovaná cenová ponuka na základe kľúčových parametrov stavby. Upravte si vašu cenovú ponuku a pošlite ju zákaznikovi do pár minút.</p>
                                <ul className="flex footer-social">
                                    <li><a href="http://localhost:3000/"><i className="lni lni-facebook-filled"></i></a></li>
                                    <li><a href="http://localhost:3000/"><i className="lni lni-twitter-filled"></i></a></li>
                                    <li><a href="http://localhost:3000/"><i className="lni lni-instagram-filled"></i></a></li>
                                    <li><a href="http://localhost:3000/"><i className="lni lni-linkedin-original"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-4/5 sm:w-2/3 md:w-3/5 lg:w-2/6">
                            <div className="row">
                                <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2">
                                    <div className="mt-12 link-wrapper wow fadeIn" data-wow-duration="1s" data-wow-delay="0.4s">
                                        <div className="footer-title">
                                            <h4 className="mb-8 text-2xl font-bold text-white">Rýchle odkazy</h4>
                                        </div>
                                        <ul className="link">
                                            <li><a href="http://localhost:3000/">Príkladová cenová ponuka</a></li>
                                            <li><a href="http://localhost:3000/">Vzorový projekt základov</a></li>
                                            <li><a href="http://localhost:3000/">Vzorový projekt pôdorysu</a></li>
                                            <li><a href="http://localhost:3000/">Vzorový projekt strechy</a></li>
                                            <li><a href="http://localhost:3000/">Cenník</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2">
                                    <div className="mt-12 link-wrapper wow fadeIn" data-wow-duration="1s" data-wow-delay="0.6s">
                                        <div className="footer-title">
                                            <h4 className="mb-8 text-2xl font-bold text-white">Navigácia</h4>
                                        </div>
                                        <ul className="link">
                                            <li><a href="http://localhost:3000/">Domov</a></li>
                                            <li><a href="http://localhost:3000/">Page</a></li>
                                            <li><a href="http://localhost:3000/">Portfolio</a></li>
                                            <li><a href="http://localhost:3000/">Blog</a></li>
                                            <li><a href="http://localhost:3000/">Contact</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-4/5 sm:w-1/3 md:w-2/5 lg:w-2/6">
                            <div className="mt-12 footer-contact wow fadeIn" data-wow-duration="1s" data-wow-delay="0.8s">
                                <div className="footer-title">
                                    <h4 className="mb-8 text-2xl font-bold text-white">Kontakt</h4>
                                </div>
                                <ul className="contact">
                                    <li>+421 907 990 046</li>
                                    <li>adrianhochla@gmail.com</li>
                                    <li> <a href='https://vancoweb.online/' target={"_blank"}> www.vancoweb.online </a></li>
                                    <li>Kvašov 020 62, Slovensko</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-8 border-t border-gray-200 footer-copyright">
                    <p className="text-white">
                        Naceňto Team 2023
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
