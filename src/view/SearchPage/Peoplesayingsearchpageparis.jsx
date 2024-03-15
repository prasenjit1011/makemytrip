import React from 'react'
import '../SearchPage/Search.css'

function Peoplesayingsearchpageparis({cityDetail}) {
    return (
        <>
            <section className="whatPepSec">
                <div className="container">
                    <div className="row">
                        <div className="whatPepCol col newWhatPepCol">
                            <p className="topActHead">
                                What people are saying about {cityDetail?.cityName}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="whatPepCol2 col newwhatPepCol2">
                            <p className="ovRa">Overall rating</p>
                            <div className="stRate">
                                <div className="mainStarDiv">
                                    <i className="fa-solid fa-star" />
                                    <i className="fa-solid fa-star" />
                                    <i className="fa-solid fa-star" />
                                    <i className="fa-solid fa-star" />
                                    <i className="fa-solid fa-star" />
                                </div>
                                <span>4.4/5</span>
                            </div>
                            <p className="baseText">based on 276,581 reviews</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 whatPepCol3">
                            <div className="mainTextRateDiv mainSearchTextRateDiv">
                                <div className="starDate">
                                    <div className="strsDiv">
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                    </div>
                                    <span>13/05/2023</span>
                                </div>
                                <p className="longTextPart">
                                    This tour was exceptionally well organized. Directions were perfect,
                                    the bus was extremely comfortable, Isabelle our guide was
                                    knowledgeable and friendly, making the experience so much more
                                    meaningful. I visited Versailles 25 years ago and learned so much
                                    more this time. Having this private tour also helped us relax after
                                    a trying day navigating around the strikes around Paris on March 15.
                                    I can’t recommend this enough - no line, comfortable transportation
                                    so you can nap to and from. Tip: Angelina Cafe is in Versailles. You
                                    can skip the long line for the dining room and just get sandwiches
                                    and beverages - including the famous hot chocolate - and then go eat
                                    in the garden outside. What a beautiful and relaxing experience. The
                                    goat cheese and honey sandwich has spinach and is on a sesame
                                    baguette. So delicious!
                                </p>
                                <p className="revFirst">
                                    Review By <span>Sara</span>
                                </p>
                                <p className="frmPariPart">
                                    From Paris: Versailles Skip-the-Line Tour &amp; Gardens Access
                                </p>
                            </div>
                            <div className="mainTextRateDiv">
                                <div className="starDate">
                                    <div className="strsDiv">
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                    </div>
                                    <span>13/05/2023</span>
                                </div>
                                <p className="longTextPart">
                                    Julien was our guide and he was amazing! The tour was so much fun!
                                    It was the first thing we did after landing and a great jump start
                                    to seeing the city! Highly recommend! Julien knew all of the stops
                                    to take great photos of us!
                                </p>
                                <p className="revFirst">
                                    Review By <span>Sara</span>
                                </p>
                                <p className="frmPariPart">
                                    From Paris: Versailles Skip-the-Line Tour &amp; Gardens Access
                                </p>
                            </div>
                            <div className="mainTextRateDiv">
                                <div className="starDate">
                                    <div className="strsDiv">
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                    </div>
                                    <span>13/05/2023</span>
                                </div>
                                <p className="longTextPart">
                                    Bruno was Amazing. Very friendly, knowledgeable and outgoing !
                                </p>
                                <p className="revFirst">
                                    Review By <span>Sara</span>
                                </p>
                                <p className="frmPariPart">
                                    From Paris: Versailles Skip-the-Line Tour &amp; Gardens Access
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Peoplesayingsearchpageparis