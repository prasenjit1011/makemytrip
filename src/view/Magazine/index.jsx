import React from 'react'
import mainbody_bg from '../../assets/Images/magzineBanner.png'
import magPic from '../../assets/Images/magPic.png'
import magPic2 from '../../assets/Images/magPic2.png'
import thPic1 from '../../assets/Images/thPic1.png'
import thPic2 from '../../assets/Images/thPic2.png'
import thPic3 from '../../assets/Images/thPic3.png'
import sliPic from '../../assets/Images/sliPic.png'
import sliPic2 from '../../assets/Images/sliPic2.png'
import sliPic3 from '../../assets/Images/sliPic3.png'
import sliPic4 from '../../assets/Images/sliPic4.png'
import arrowPic from '../../assets/Images/arrowPic.svg'

import { Link } from 'react-router-dom'

function index() {
    return (
        <>
            <section
                className="magBannerSection"
                style={{ backgroundImage: `url('${mainbody_bg}')`,  }}
            >
                <div className="backMegaDiv">
                    <h2 className="magHead">MAGAZINE</h2>
                </div>
            </section>
            <section className="doubDiv">
                <div className="myMagContainer">
                    <div className="myMegConRow">
                        <div className="megaTextDiv">
                            <p className="isThText">
                                Is this the world's hardest travel quiz? Download and find out!
                            </p>
                        </div>
                        <div className="megaPicDiv">
                            <figure className="megFig megFig2">
                                <img src={magPic} />
                            </figure>
                            <figure className="megFig megFig1">
                                <img src={magPic2} />
                            </figure>
                        </div>
                    </div>
                </div>
            </section>
            <section className="threePicSection">
                <div className="myMagContainer thPicsContainer">
                    <div className="thPicsDiv">
                        <figure className="thPics">
                            <img src={thPic1} />
                        </figure>
                        <span className="figCapa">
                            7 ciudades europeas para unas vacaciones en familia
                        </span>
                    </div>
                    <div className="thPicsDiv">
                        <figure className="thPics">
                            <img src={thPic2} />
                        </figure>
                        <span className="figCapa">
                            Get right to the center of Parisian history
                        </span>
                    </div>
                    <div className="thPicsDiv">
                        <figure className="thPics">
                            <img src={thPic3} />
                        </figure>
                        <span className="figCapa">
                            Stati Uniti: 7 destinazioni per l'autunno
                        </span>
                    </div>
                </div>
            </section>
            <section className="doubDiv">
                <div className="myMagContainer">
                    <div className="myMegConRow">
                        <div className="megaPicDiv">
                            <figure className="megFig megFig3">
                                <img src={sliPic} />
                            </figure>
                            <figure className="megFig megFig4">
                                <img src={sliPic2} />
                            </figure>
                        </div>
                        <div className="megaTextDiv2">
                            <p className="isThText">
                                How to travel with kids: 7 tips for your next vacation
                            </p>
                            <Link to="/howtravel">
                                <div className="reDiv">
                                    <span className="redText">READ MORE</span>
                                    <figure className="arrFig">
                                        <img src={arrowPic} />
                                    </figure>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="doubDiv">
                <div className="myMagContainer">
                    <div className="myMegConRow">
                        <div className="megaPicDiv">
                            <figure className="megFig megFig3">
                                <img src={sliPic3} />
                            </figure>
                            <figure className="megFig megFig4">
                                <img src={sliPic4} />
                            </figure>
                        </div>
                        <div className="megaTextDiv2">
                            <p className="isThText">9 aventuras salvajes en África</p>
                            <Link to="/howtravel">
                                <div className="reDiv">
                                    <span className="redText">READ MORE</span>
                                    <figure className="arrFig">
                                        <img src={arrowPic} />
                                    </figure>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="paginationSection">
                <ul className="pagiUl">
                    <li className="pagiLi">
                        <i className="fa-solid fa-chevron-left pageArrow" />
                    </li>
                    <li className="pagiLi">1</li>
                    <li className="pagiLi activePageLi">2</li>
                    <li className="pagiLi">3</li>
                    <li className="pagiLi">4</li>
                    <li className="pagiLi">
                        <i className="fa-solid fa-chevron-right pageArrow" />
                    </li>
                </ul>
            </section>
        </>

    )
}

export default index