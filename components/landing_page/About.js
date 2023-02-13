import React from 'react'
import shape1 from "../../public/static/about-shape-1.svg"
import shape2 from "../../public/static/about-shape-2.svg"

import zaklady from "../../public/static/imgs/zaklady.jpg"
import murivo from "../../public/static/imgs/murivo.jpg"
import strecha from "../../public/static/imgs/strecha.jpg"



function About() {
  return (
    <>
    <section id="about" className="relative about-area">
        <div className="container">
            <div className="row">
                <div className="w-full lg:w-1/2">
                    <div className="mx-4 mt-12 about-content wow fadeInLeftBig" data-wow-duration="1s" data-wow-delay="0.5s">
                        <div className="mb-4 section-title">
                            <div className="line"></div>
                            <h3 className="title"><span>Ukážkový </span> Pôdorys Základov <span>pre optimálnu presnosť</span></h3>
                        </div>
                        <p className="mb-8 text-[18px]	">V projekte Pôdorysu Základov by mal byť priehľadne, hrubou čiarou, <span className='font-medium'>ohraničený výkopový pás</span>. Podľa neho naše algoritmy určujú kde sa stavba v projekte nachádza. Pre správne určenie obsahu a obvodu platne, spolu so vzdialosťami je dôležité aby boli po vonkajšej strane okolo stavby určené <span className='font-medium'>kóty s čitateľnými číslami</span>.</p>
                        {/* <a className="main-btn gradient-btn cursor-pointer">Príkladový projekt</a> */}
                    </div> 
                </div>
                <div className="w-full lg:w-1/2">
                    <div className="mx-4 mt-12 text-center about-image wow fadeInRightBig" data-wow-duration="1s" data-wow-delay="0.5s">
                        <img src={zaklady.src} alt="about"/>
                    </div> 
                </div>
            </div> 
        </div> 
        <div className="about-shape-1">
            <img src={shape1.src} alt="shape"/>
        </div>
    </section>

    <section className="relative pt-20 about-area">
        <div className="about-shape-2">
            <img src={shape2.src} alt="shape"/>
        </div>
        <div className="container">
            <div className="row">
                <div className="w-full lg:w-1/2 lg:order-last">
                    <div className="mx-4 mt-12 about-content wow fadeInLeftBig" data-wow-duration="1s" data-wow-delay="0.5s">
                        <div className="mb-4 section-title">
                            <div className="line"></div>
                            <h3 className="title"><span>Ukážkový </span> Pôdorys NP <span>pre optimálnu presnosť</span></h3>
                        </div> 
                        <p className="mb-8">Podobne ako pri základoch je nevyhnutné, aby bolo murivo v projekte <span className='font-medium'> ohraničené hrubšou čiarou. </span> Dôležité je aby <span className='font-medium'>pomer strán nebol väčší ako 5:1.</span> To znamená, že dĺžka prjektu nesmie byť 5-krát väčšia, ako výška. Keďže prebieha kompresia projektu,<span className='font-medium'> ani najtenšie mutivo sa nesmie stratiť.</span> </p>
                        {/* <a className="main-btn gradient-btn cursor-pointer">Príkladový projekt</a> */}
                    </div> 
                </div>
                <div className="w-full lg:w-1/2 lg:order-first">
                    <div className="mx-4 mt-12 text-center about-image wow fadeInRightBig" data-wow-duration="1s" data-wow-delay="0.5s">
                        <img src={murivo.src} alt="about"/>
                    </div> 
                </div>
            </div>
        </div> 
    </section>

    <section id="about" className="relative pt-20 about-area">
        <div className="container">
            <div className="row">
                <div className="w-full lg:w-1/2">
                    <div className="mx-4 mt-12 about-content wow fadeInLeftBig" data-wow-duration="1s" data-wow-delay="0.5s">
                        <div className="mb-4 section-title">
                            <div className="line"></div>
                            <h3 className="title"><span>Ukážkový </span> Pôdorys strechy <span>pre optimálnu presnosť</span> </h3>
                        </div>
                        <p className="mb-8">Pri pôdoryse strechy je nutné, aby v ňom bol <span className='font-medium'> čitateľne napísaný obsah strechy.</span> Keďže naše algirtmt z projektov čítajú obsah strechy. Ak sa programu obsah strechy prečítať nepodarí, pokúsi sa ho vypočítať sám. K tomu je potrebné <span className='font-medium'> presné ohraničenie strechy hrubšou čiarou </span> a tiež <span className='font-medium'> čitateľne napísaný sklon každej časti strechy.</span></p>
                        {/* <a className="main-btn gradient-btn cursor-pointer">Príkladový projekt</a> */}
                    </div> 
                </div>
                <div className="w-full lg:w-1/2">
                    <div className="mx-4 mt-12 text-center about-image wow fadeInRightBig" data-wow-duration="1s" data-wow-delay="0.5s">
                        <img src={strecha.src} alt="about"/>
                    </div> 
                </div>
            </div> 
        </div> 
        <div className="about-shape-1">
            <img src={shape1.src} alt="shape"/>
        </div>
    </section>

    </>
    
  )
}

export default About
