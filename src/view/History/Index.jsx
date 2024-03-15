import React from 'react'
import a from "../../assets/Images/shopCart1.png";

function Index() {
    return (
        <>
            <div className="container-fluid">
                <h2 className="headingTop" style={{ padding: "8rem 3% 0" }}>
                    Your browsing history
                </h2>

                <div className="card mainCardPart" style={{backgroundColor: "transparent"}}>
                    <div className="row">
                        <div className="col-md-4 cartImgPart">
                            <img src={a} alt="..." />
                        </div>
                        <div className="col-md-8 cartTextPart">
                            <div className="card-body myCardBody">
                                <div className="cartTextParent">
                                    <p className="entryTicText">Entry ticket</p>
                                    <div className="cartTextFirstParentSub">
                                        <p className="numRateP">4.4/5</p>
                                        <div className="startRatePart">
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                        </div>
                                        <p className="userNumber">(11.5k)</p>
                                    </div>
                                </div>
                                <div className="cartTextParent">
                                    <div>
                                        <p className="parText">
                                            Paris: Eiffel Tower Summit or Second Floor Access
                                        </p>
                                        
                                    </div>
                                    <p className="fromP">From</p>
                                </div>
                                <div className="cartTextParent">
                                    <div className="firstParDiv">
                                        <p className="greenClrText">1.5 - 2 hours</p>
                                        <p className="greenClrText">Skip the line</p>
                                        <p className="greenClrText">Access by Elevator</p>
                                    </div>
                                    <div className="secondParDiv">
                                        <p className="text1000">$ 1000</p>
                                        <p className="perPText">per Person</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mainCardPart">
                    <div className="row">
                        <div className="col-md-4 cartImgPart">
                            <img src={a} alt="..." />
                        </div>
                        <div className="col-md-8 cartTextPart">
                            <div className="card-body myCardBody">
                                <div className="cartTextParent">
                                    <p className="entryTicText">Entry ticket</p>
                                    <div className="cartTextFirstParentSub">
                                        <p className="numRateP">4.4/5</p>
                                        <div className="startRatePart">
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                        </div>
                                        <p className="userNumber">(11.5k)</p>
                                    </div>
                                </div>
                                <div className="cartTextParent">
                                    <div>
                                        <p className="parText">
                                            Paris: Eiffel Tower Summit or Second Floor Access
                                        </p>
                                    </div>
                                    <p className="fromP">From</p>
                                </div>
                                <div className="cartTextParent">
                                    <div className="firstParDiv">
                                        <p className="greenClrText">1.5 - 2 hours</p>
                                        <p className="greenClrText">Skip the line</p>
                                        <p className="greenClrText">Access by Elevator</p>
                                    </div>
                                    <div className="secondParDiv">
                                        <p className="text1000">$ 1000</p>
                                        <p className="perPText">per Person</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Index