import React from "react";
import aa from "../../assets/Images/personalBack.png";
import bb from "../../assets/Images/addGreenBack.png";
import cc from "../../assets/Images/paymentBack.png";
import dd from "../../assets/Images/cardPartImg2.png";
import ee from "../../assets/Images/cardPartImg.png";
import ff from "../../assets/Images/shareIcon.png";
import gg from "../../assets/Images/watchPic.png";
import hh from "../../assets/Images/userPic.png";
import II from "../../assets/Images/databasePic.png";
import JJ from "../../assets/Images/giftPic.png";
import { Link } from "react-router-dom";
import { useCartContext } from "../../Context/CartProvider";

function Index() {
  const { cart } = useCartContext();
  return (
    <>
      <section className="checkPersonalSection">
        <div className="container-fluid">
          <div className="row">
            <div className="col checkHead">
              <p>Check your personal details</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 bookingPart">
              <div className="bookingPartImg">
                <figure>
                  <img src={aa} alt="problem" />
                  <span className="bookingPartImgSpan activeImgSpan">
                    Personal
                  </span>
                </figure>
                <figure>
                  <img src={bb} alt="" />
                  <span className="bookingPartImgSpan activeImgSpan">
                    Additions
                  </span>
                </figure>
                <figure>
                  <img src={cc} alt="" />
                  <span className="bookingPartImgSpan">Payment</span>
                </figure>
              </div>
              <div className="cardPart firstCardPart">
                <figure className="cardImgPart">
                  <img src={dd} alt="" className="img-fluid" />
                </figure>
                <div className="cardTextPart">
                  <p className="entText">Entry ticket</p>
                  <div className="parTextPart">
                    <p className="firstParis">
                      Paris: Eiffel Tower Summit or Second Floor Access
                    </p>
                  </div>
                  <div className="againRating">
                    <div className="ratePartStar">
                      <i className="fa-solid fa-star" />
                      <i className="fa-solid fa-star" />
                      <i className="fa-solid fa-star" />
                      <i className="fa-solid fa-star" />
                      <i className="fa-solid fa-star" />
                    </div>
                    <span className="agNumRate">4.4/5</span>
                    <span className="agUserNum">(7,115)</span>
                  </div>
                  <div className="footCardPart">
                    <div>
                      <span className="agDoll">$ 1000</span>
                      <span className="agPer">per Person</span>
                    </div>
                    <figure className="seActBtnPart">
                      <button>Select Activity</button>
                    </figure>
                  </div>
                </div>
              </div>
              <div className="cardPart secondCardPart">
                <figure className="cardImgPart">
                  <img src={ee} alt="" className="img-fluid" />
                </figure>
                <div className="cardTextPart">
                  <p className="entText">Entry ticket</p>
                  <div className="parTextPart">
                    <p className="firstParis">
                      Paris: Eiffel Tower Summit or Second Floor Access
                    </p>
                  </div>
                  <div className="againRating">
                    <div className="ratePartStar">
                      <i className="fa-solid fa-star" />
                      <i className="fa-solid fa-star" />
                      <i className="fa-solid fa-star" />
                      <i className="fa-solid fa-star" />
                      <i className="fa-solid fa-star" />
                    </div>
                    <span className="agNumRate">4.4/5</span>
                    <span className="agUserNum">(7,115)</span>
                  </div>
                  <div className="footCardPart">
                    <div>
                      <span className="agDoll">$ 1000</span>
                      <span className="agPer">per Person</span>
                    </div>
                    <figure className="seActBtnPart">
                      <button>Select Activity</button>
                    </figure>
                  </div>
                </div>
              </div>
              <div className="continueBtn">
                <Link to="/make-payment" className="btn">
                  Continue to next
                </Link>
              </div>
            </div>
            <div className="col-lg-6 summaryPart">
              <div>
                <p className="orderHead">Order summary</p>
                <div className="summaryPartSub">
                  <div className="innerOrderPart">
                    {cart?.cart_activity?.map((item, i, arr) => {
                      const adult = item?.participentType?.find(
                        (item) => item?.pertype === "Adult"
                      );
                      const children = item?.participentType?.find(
                        (item) => item?.pertype === "children"
                      );

                      return (
                        <div key={i}>
                          <div className="fromPaParent">
                            <span>{item?.activity?.activityTitle}</span>
                          </div>
                          <div className="bookingRatePart">
                            <p className="bookNumRate">
                              {item?.activity?.reviewRating}/
                              {item?.activity?.totalReview}
                            </p>
                            <div className="bookRate">
                              {Array.from(
                                { length: item?.activity?.reviewRating },
                                () => 2
                              )?.map((item, i) => {
                                return (
                                  <i key={i} className="fa-solid fa-star" />
                                );
                              })}
                              {Array.from(
                                {
                                  length:
                                    +item?.activity?.totalReview ||
                                    5 - +item?.activity?.reviewRating,
                                },
                                () => 2
                              )?.map((item, i) => {
                                return (
                                  <i
                                    key={i}
                                    className="fa-regular fa-star"
                                    style={{ color: "#cfcfcf" }}
                                  />
                                );
                              })}
                            </div>
                            <p className="bookPerson">({item?.totalPerson})</p>
                          </div>
                          <div className="borderDiv" />
                          <div className="sharedIconPart">
                            <figure>
                              <img src={dd} alt="share" />
                            </figure>
                            <div className="shareText">
                              <span>Shared Group Tour in</span>
                              <span>English • Language: English</span>
                            </div>
                          </div>
                          <div className="sharedIconPart">
                            <figure>
                              <img src={ee} alt="watch" />
                            </figure>
                            <div className="shareText">
                              <span>
                                {new Date(
                                  item?.activity?.startDate
                                ).toDateString()}{" "}
                                at {item?.statingTime}
                              </span>
                            </div>
                          </div>
                          <div className="sharedIconPart sharedIconLastPart">
                            <figure>
                              <img src={ff} alt="user" />
                            </figure>
                            <div className="shareText">
                              <span>
                                {adult?.person} Adult (Age {adult?.age})
                              </span>
                              <span>
                                {children?.person} Children (Age {children?.age}
                                )
                              </span>
                            </div>
                          </div>
                          {i !== arr.length - 1 && (
                            <hr style={{ border: "1px dashed red" }} />
                          )}
                        </div>
                      );
                    })}

                    <div className="borderDiv boderLastDiv" />
                    <div className="sharedIconPart sharedIconLastPart">
                      <figure>
                        <img src={gg} alt="user" />
                      </figure>
                      <div className="shareText">
                        <span>
                          {cart?.cart_activity?.length > 1
                            ? "These activities are"
                            : "This activity is"}{" "}
                          non-refundable
                        </span>
                      </div>
                    </div>
                    {/* <div className="giftIconPart">
                      <figure>
                        <img src={hh} alt="gift" />
                      </figure>
                      <span>Enter gift or promo code</span>
                    </div> */}
                    <form action="" className="redeemForm">
                      {/* <div>
                        <div className="input-group">
                          <input type="text" className="myFormCntrl" />
                        </div>
                        <div className="redeBtn">
                          <button className="btn" type="button" id="button-addon2">
                            Redeem
                          </button>
                        </div>
                      </div> */}
                    </form>
                  </div>
                  <div className="subtotalPart">
                    <div className="subTotalFirst">
                      <span>Subtotal</span>
                      <span>
                        ${" "}
                        {cart?.cart_activity?.reduce(
                          (acc, item) => acc + +item?.totalPrice,
                          0
                        )}
                      </span>
                    </div>
                    <p className="allTextPart">All taxes and fees included</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Index;
