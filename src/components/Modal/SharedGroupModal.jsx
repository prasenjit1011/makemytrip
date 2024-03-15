import React from 'react'
import { Link } from 'react-router-dom'
import aa from "../../assets/Images/calender.png";
import bb from "../../assets/Images/diskTime.png";

function SharedGroupModal(props) {
    const { closemodal }= props;
    return (
        <>
            <section className="sharedSection" onClick={() => closemodal(false)}>
                <div className="sharedParent">
                    <h1 className="shHead">Shared Group Tour in English</h1>
                    <p className="sharPara">
                        Shared guided tour of the palace with up to 25 people and self-guided tour
                        of the gardens
                    </p>
                    <div className="clockText">
                        <i className="fa-regular fa-clock shClock" />
                        <span className="shTime">6 hours</span>
                    </div>
                    <div className="locaText">
                        <i className="fa-solid fa-location-dot shLocation" />
                        <span className="shLocText">
                            Meet at 62 Av. de Suffren, 75015 Paris, France
                        </span>
                    </div>
                    <div className="timeTabPart">
                        <p className="shSeText">Select a starting time</p>
                        <div className="shTimeDePrnt">
                            <span className="shTimeDe shTimeDeActive">1:15 PM</span>
                            <span className="shTimeDe">1:15 PM</span>
                        </div>
                    </div>
                    <div className="calImgText">
                        <figure className="calPic">
                            <img src={aa} alt="calender" />
                        </figure>
                        <span className="calText">
                            Cancel before 8:45 AM on May 31 for a full refund
                        </span>
                    </div>
                    <div className="calImgText">
                        <figure className="calPic">
                            <img src={bb} alt="Disk Time" />
                        </figure>
                        <span className="calText">
                            You can reserve now &amp; pay later with this activity option.
                        </span>
                    </div>
                    <div className="priText">
                        <div className="priTextDiv">
                            <p className="priMainText">Price breakdown</p>
                            <p className="aduText">Adult1 x $ 9,676</p>
                        </div>
                        <p className="dollText">$ 9,676</p>
                    </div>
                    <div className="footTextDiv">
                        <div className="footTotDiv">
                            <p className="totText">Total Price</p>
                            <p className="totDollText">$ 3000</p>
                        </div>
                        <div className="footTotBtn">
                            <button className="addToBtn">Add to cart</button>
                            <Link to="/booking" className="bkNowBtn">Book now</Link>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default SharedGroupModal