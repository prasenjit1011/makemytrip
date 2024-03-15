import React from 'react'
import '../../view/Career/Career.css'
import b from "../../assets/Images/Careercover.png"
import g from "../../assets/Images/SupportEllipse.png"
import f from "../../assets/Images/CareerCover2.png"
import f1 from "../../assets/Images/Support1.png"
import f2 from "../../assets/Images/Support2.png"
import f3 from "../../assets/Images/Support3.png"
import f4 from "../../assets/Images/Support4.png"
import f5 from "../../assets/Images/Support5.png"
import f6 from "../../assets/Images/ProblemSolving.png"
import f7 from "../../assets/Images/ExpImgDesign.png"
import f8 from "../../assets/Images/CareerExp2.png"
import f9 from "../../assets/Images/CareerExp1.png"
import f10 from "../../assets/Images/ExpArrow.png"
import f11 from "../../assets/Images/Team1.png"
import f12 from "../../assets/Images/Team2.png"
import f13 from "../../assets/Images/Team3.png"
import f14 from "../../assets/Images/Team4.png"
export default function Index() {
    return (

        <>
            {/* Banner part */}
            <section
                id="career_banner"
                style={{ backgroundImage: `url('${b}')`, position: 'relative' }}
            >
                <div className="container-fluid">
                    <div className="career_bannerimg">
                        <h1 className="careerbanner_head">Careers</h1>
                    </div>
                </div>
            </section>
            {/* career top part */}
            <section id="career_top">
                <div className="container-fluid">
                    <div className="career_topbody">
                        <h3 className="careertop_head">Lorem Ipsum</h3>
                        <p className="careertop_para">
                            It is a long established fact that a reader will be distracted by the
                            readable content of a page when looking at its layout. The point of
                            using Lorem Ipsum is that it has a more-or-less normal distribution of
                            letters, as opposed to using 'Content here, content here', making it
                            look like readable English. Many desktop publishing packages and web
                            page editors now use Lorem Ipsum as their default model text, and a
                            search for 'lorem ipsum' will uncover many web sites still in their
                            infancy. Various versions have evolved over the years, sometimes by
                            accident, sometimes on purpose (injected humour and the like).
                        </p>
                        <p className="careertop_para">
                            It was popularised in the 1960s with the release of Letraset sheets
                            containing Lorem Ipsum passages, and more recently with desktop
                            publishing software like Aldus PageMaker including versions of Lorem
                            Ipsum.
                        </p>
                    </div>
                    <div className="career_button">
                        <button type="submit">Discover the Jobs</button>
                    </div>
                </div>
            </section>
            {/* career experience part */}
            <section id="career_exp">
                <div className="container-fluid">
                    <div className="exp_body">
                        <div className="exp_text">
                            <div className="changetext">
                                <div className="changeHead">
                                    <h5>Change the way millions experience the world</h5>
                                </div>
                                <div className="changeArrow">
                                    <img
                                        src={f10}
                                        alt="img"
                                        width="100px"
                                        height="100px"
                                    />
                                </div>
                            </div>
                            <p className="changepara">
                                It was popularised in the 1960s with the release of Letraset sheets
                                containin
                            </p>
                        </div>
                        <div className="exp_img">
                            <div className="expimgwrapper" id="expimg1">
                                <img src={f9} alt="img" />
                            </div>
                            <div className="expimgwrapper" id="expimg2">
                                <img src={f8} alt="img" />
                                <div className="imgdesignwrapper">
                                    <img
                                        src={f7}
                                        alt="img"
                                        width="50px"
                                        height="50px"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Problem solving part */}
            <section id="problem_solving">
                <div className="container-fluid">
                    <div className="problem_body">
                        <div className="problemimg">
                            <img src={f6} alt="img" />
                        </div>
                        <div className="problemText">
                            <h3 className="problemhead">The problems we are solving</h3>
                            <p className="problempara">
                                It is a long established fact that a reader will be distracted by
                                the readable content of a page when looking at its layout. The point
                                of using Lorem Ipsum is that it has a more-or-less normal
                                distribution of letters, as opposed to using 'Content here, content
                                here',
                            </p>
                            <p className="problempara">
                                ature, discovered the undoubtable source. Lorem Ipsum comes from
                                sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The
                                Extremes of Good and Evil) by Cicero, written in 45 BC. This book is
                                a treatise o
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Support part */}
            <section id="support" style={{ backgroundImage: `url('${f}')`, position: 'relative' }}>
                <div className="container">
                    <div className="support_body">
                        <div className="support_top">
                            <h3 className="support_head">solid companions as support</h3>
                            <p className="support_para">
                                The standard chunk of Lorem Ipsum used since the 1500s is reproduced
                                below for those interested.
                            </p>
                        </div>
                        <div className="supportimg">
                            <div className="support_icon">
                                <img src={f1} alt="img" />
                            </div>
                            <div className="support_icon" id="support_circle" style={{ backgroundImage: `url('${g}')`, position: 'relative' }}>
                                <img src={f2} alt="img" />
                            </div>
                            <div className="support_icon">
                                <img src={f3} alt="img" />
                            </div>
                            <div className="support_icon">
                                <img src={f4} alt="img" />
                            </div>
                            <div className="support_icon">
                                <img src={f5} alt="img" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Team part */}
            <section id="team">
                <div className="container">
                    <div className="team_body">
                        <div className="team_img">
                            <div className="team_imgwrapper" id="teamimg1">
                                <img src={f11} alt="img" />
                            </div>
                            <div className="team_imgwrapper" id="teamimg2">
                                <img src={f12} alt="img" />
                            </div>
                            <div className="team_imgwrapper" id="teamimg3">
                                <img src={f13} alt="img" />
                            </div>
                            <div className="team_imgwrapper" id="teamimg4">
                                <img src={f14} alt="img" id="teamimg4" />
                            </div>
                            <div className="color_bg"></div>
                        </div>
                        <div className="team_text">
                            <h3 className="team_head">JOIN AN AMAZING TEAM</h3>
                            <p className="team_para">
                                Stay constantly inspired by working alongside creative,
                                collaborative and passionate colleagues.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>


    )
}
