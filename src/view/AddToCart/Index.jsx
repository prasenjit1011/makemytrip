import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Countdown, {
  zeroPad,
  //  calcTimeDelta,
  //  formatTimeDelta
} from "react-countdown";
import { useNavigate } from "react-router-dom";
// import a from '../../assets/Images/shopCart1.png';
// import b from '../../assets/Images/shopCart2.png';
// import C from '../../assets/Images/paris.png';
// import d from '../../assets/Images/newYork.png';
// import e from '../../assets/Images/usa1.png';
// import f from '../../assets/Images/usa2.png';
// import g from '../../assets/Images/italy.png';
// import h from '../../assets/Images/albarello.png';
// import i from '../../assets/Images/uk.png';
// import j from '../../assets/Images/uae.png';
import giftAni from "../../assets/Images/giftboxAnim.gif";
import { useCartContext } from "../../Context/CartProvider";
import MainLoader from "../../components/Loaders/MainLoader";
// import { FiGift } from 'react-icons/fi';
import { toast } from "react-hot-toast";
import moment from "moment";
import emptyCart from "../../assets/emptyCart.png";
import {
  TopCityCartActivity,
  getAllDestinationsForFilter,
} from "../../API_HELPERS/apiHelpers";
import { useAuth } from "../../Context/AuthContextProvider";
import PopularDestinations from "./PopularDestinations";
import TopActivityCity from "../ActivityParis/TopActivityCity";

function Index() {
  const { loginStatus, setShowLoginModal } = useAuth();
  const { cart, removeCartItem, removeGiftCartItem, isLoading } =
    useCartContext();

  const activityy = JSON.parse(localStorage.getItem("topactivity"));
  const navigate = useNavigate();
  const [destData, setDestData] = useState([]);
  const [someTopActivitys, setsomeTopActivitys] = useState([]);

  // const convertToTimeStamp = (timeString) => {
  //   const todayDate = moment().format("YYYY-MM-DD");
  //   // const timeString = '11:40:33 AM';
  //   const format = "YYYY-MM-DD h:mm:ss A";

  //   const combinedDateTimeString = `${todayDate} ${timeString}`;
  //   const timestamp = moment(combinedDateTimeString, format).valueOf();
  //   console.log("timestamp", timestamp);
  //   return timestamp;
  // };

  const convertToTimeStamp = (time) => {
    let newDate = new Date(time);
    let currentDate = new Date();

    const format = "hh:mm:ss A";

    const inputTime = moment(newDate, format);

    const currentTime = moment(currentDate);

    const differenceInMilliseconds = inputTime.diff(currentTime);

    return differenceInMilliseconds;
  };

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  const renderer = ({ hours, minutes, seconds }) => (
    <span style={{ color: "red", fontSize: "20px" }}>
      {zeroPad(minutes)} : {zeroPad(seconds)}
    </span>
  );

  const getDestinationData = async () => {
    const res = await getAllDestinationsForFilter();
    console.log("resDest", res);
    if (res && res?.status) {
      setDestData(res?.data);
    }
  };

  const getSomeTopActivity = async (data) => {
    const res = await TopCityCartActivity(data);

    if (res && res?.status) {
      console.log("setsomeTopActivitys", res?.data);
      setsomeTopActivitys(res?.data);
    } else {
      toast.error("Backend error");
      setsomeTopActivitys([]);
    }
  };

  let senddata;

  console.log("cart:", cart);
  // console.log("cart_activityyy:", cart?.cart_activity);
  // console.log("activity:", cart?.cart_activity?.[length1 - 1]?.activity);
  // console.log("_id:", cart?.cart_activity?.[length1 - 1]?.activity?._id);

  const r = 0;

  if (cart && cart?.length !== 0) {
    const length1 = cart?.cart_activity?.length;
    console.log("sucsess");
    senddata = cart?.cart_activity[length1 - 1]?.activity?._id;
  } else {
    senddata = "";
  }
  const rr = 66;

  useEffect(() => {
    getDestinationData();
  }, []);

  useEffect(() => {
    getSomeTopActivity(senddata);
  }, [senddata]);

  const loggedInCart = (
    <>
      <MainLoader isLoading={isLoading} />
      <section className="shoppingCartSection">
        <div className="custContain">
          <div className="row">
            <div className="col shopHead">
              <p>Your Cart</p>
            </div>
          </div>
          {cart?.cart_activity?.length === 0 &&
            cart?.cart_giftcard?.length === 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={emptyCart}
                  alt=""
                  height="100px"
                  width="100px"
                  className="fade-in"
                />
                <p
                  className="tracking-in-expand"
                  style={{
                    textAlign: "center",
                    color: "red",
                    padding: "20px",
                    fontSize: "25px",
                  }}
                >
                  Your cart has no items in it !
                </p>
              </div>
            )}

          {/* activity cart */}
          {cart?.cart_activity?.length !== 0 &&
            cart?.cart_activity
              ?.slice()
              .reverse()
              .map((item, i) => {
                console.log("bjhgdj", item);
                console.log("itttem", item);
                return (
                  <div className="mainCardDiv">
                    <div className="mainSubCardDiv">
                      <p className="actSubHead">
                        {item?.activity?.country?.name}
                      </p>

                      <div className="showTimeDiv">
                        <p style={{ fontSize: "18px", marginBottom: "0" }}>
                          Remaining Time : &nbsp;
                        </p>
                        <Countdown
                          // date={Date.now() + 600000}
                          // date={
                          //   item?.currentStatus !== "available"
                          //     ? Date.now()
                          //     : convertToTimeStamp(item?.timeAfter10Mint)
                          // }
                          date={
                            Date.now() +
                            convertToTimeStamp(item?.timeAfter10Mint)
                          }
                          renderer={renderer}
                          // onStop={() => {
                          //   alert("onstop");
                          // }}

                          onComplete={() => {
                            // alert("onComplete");
                            removeCartItem(item._id);
                          }}

                          //.................................chage
                        />
                      </div>
                    </div>
                    <Link className="cardHovAn">
                      <div className="card mainCardPart" key={i}>
                        <div className="cardRow">
                          <div className="cartImgPart">
                            <figure className="cartImgFig">
                              <img src={item?.activity?.image[0]} alt="..." />
                            </figure>
                            {/* <span className="iconHeart">
                            <i className="fa-regular fa-heart"></i>
                          </span> */}
                          </div>
                          <div className="cartTextPart">
                            <div className="card-body myCardBody">
                              <div className="cartTextParent">
                                <p className="entryTicText">Entry ticket</p>
                                <div className="cartTextFirstParentSub d-none d-sm-flex">
                                  <p className="numRateP">
                                    {+item?.activity?.reviewRating?.toFixed(
                                      1
                                    ) || 0}{" "}
                                    / 5
                                  </p>
                                  <div className="startRatePart">
                                    <i
                                      data-star={item?.activity?.reviewRating?.toFixed(
                                        1
                                      )}
                                    ></i>
                                  </div>
                                  <p className="userNumber">
                                    ({item?.activity?.totalReview})
                                  </p>
                                </div>
                              </div>
                              <div className="cartTextParent">
                                <div>
                                  <p className="parText">
                                    {item?.activity?.activityTitle}
                                  </p>
                                  {/* <p className="acText">Access</p> */}
                                </div>
                                {/* <p className="fromP">From</p> */}
                              </div>
                              <div className="cartTextFirstParentSub d-flex d-sm-none">
                                <p className="numRateP">
                                  {+item?.activity?.reviewRating?.toFixed(1) ||
                                    0}{" "}
                                  / 5
                                </p>
                                <div className="startRatePart">
                                  <i
                                    data-star={item?.activity?.reviewRating?.toFixed(
                                      1
                                    )}
                                  ></i>
                                </div>
                                <p className="userNumber">
                                  ({item?.activity?.totalReview})
                                </p>
                              </div>
                              <div className="cartTextParent mb-4">
                                <div className="firstParDiv">
                                  <p className="greenClrText">
                                    Starting Time : {item?.statingTime}
                                  </p>
                                  {/* <p className="greenClrText">Skip the line</p> */}
                                  {/* <p className="greenClrText">Access by Elevator</p> */}
                                </div>
                                <div className="cartSubTextPart">
                                  <p className="text1000">Total Price</p>
                                  <div className="secondParDiv">
                                    <p className="text1000">
                                      {item?.activity?.currency?.symbol}{" "}
                                      {item?.totalPrice?.toFixed(2)}
                                    </p>
                                    {/* <p className="perPText">per Person</p> */}
                                  </div>
                                </div>
                              </div>
                              <button
                                className="btn btn-sm btn-danger myRemoveBtn"
                                onClick={() => removeCartItem(item?._id)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}

          {/* gift cart */}
          {cart?.cart_giftcard?.length !== 0 &&
            cart?.cart_giftcard?.map((item, i) => {
              console.log("itttem", item);
              return (
                <Link className="cardHovAn">
                  <div className="card mainCardPart" key={i}>
                    <div className="cardRow">
                      {/* <div className="col-md-4 cartImgPart">
                    <img src={item?.activityImage} alt="..." />
                  </div> */}
                      <div className="cartImgPart">
                        <figure className="cartImgFig">
                          {/* <span className='mr-3 giftBoxSpan' style={{ fontSize: "80px" }}>
                          <FiGift />
                        </span> */}
                          <img alt="" src={giftAni} />
                        </figure>
                      </div>
                      <div className="cartTextPart">
                        <div className="card-body myCardBody">
                          <div>
                            <h5 className="thinksHead">
                              Things To Do Gift Certificate
                            </h5>
                          </div>
                          <div className="cartTextParent">
                            {/* <p className="entryTicText">Entry ticket</p> */}

                            {/* <div className="cartTextFirstParentSub">
                          <p className="numRateP">Ratings</p>
                          <p className="numRateP">{item?.activity?.reviewRating}</p>
                        </div> */}
                          </div>
                          <div className="cartTextParent">
                            <div>
                              {item?.activityName && (
                                <p className="parText">{item?.activityName}</p>
                              )}
                            </div>
                          </div>
                          <div className="mt-3">
                            {item?.personalMsg ? (
                              <p>Message: {item?.personalMsg}</p>
                            ) : (
                              <p>Message: No Message</p>
                            )}
                          </div>
                          <div className="cartTextParent d-flex justify-content-end">
                            {/* <div className="firstParDiv">
                          <p className="greenClrText">Starting Time : {item?.statingTime}</p>
                        </div> */}
                            <div className="secondParDiv">
                              <p className="text1000 mr-2">Total Price</p>
                              <p className="text1000">
                                {item?.activityCurrency?.symbol || "£"}
                                &nbsp;{item?.amount?.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <button
                            className="btn btn-sm btn-danger myRemoveBtn"
                            onClick={() => removeGiftCartItem(item?._id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}

          {/* Place Order */}
          {(cart?.cart_activity?.length !== 0 ||
            cart?.cart_giftcard?.length !== 0) && (
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
              <button
                className="btn btn-success"
                style={{ fontWeight: "700", fontSize: "18px" }}
                onClick={(e) => {
                  e.preventDefault();

                  navigate("/make-payment");
                }}
              >
                Proceed To Checkout
              </button>
            </div>
          )}
        </div>
      </section>
      {someTopActivitys?.length > 0 && (
        <TopActivityCity activites={someTopActivitys.slice(0, 9)} />
      )}
      <PopularDestinations />
    </>
  );

  const guestCart = (
    <>
      <MainLoader isLoading={isLoading} />
      <div className="col shopHead">
        <p>Your Cart</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={emptyCart}
          alt=""
          height="100px"
          width="100px"
          className="fade-in"
        />
        <p
          className="tracking-in-expand"
          style={{
            textAlign: "center",
            color: "red",
            padding: "5px",
            fontSize: "25px",
            margin: "0",
          }}
        >
          Your cart has no items in it !
        </p>
      </div>
      <p style={{ textAlign: "center" }}>Sync your cart across devices:</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <div className="findThinsDiv">
          <Link
            className="findThAN"
            onClick={(e) => {
              e.preventDefault();
              setShowLoginModal(true);
            }}
          >
            Log in / Sign up
          </Link>
        </div>
      </div>
      {/* {cart?.cart_activity[length1 - 1]?.activity?._id && (
        <TopActivityCity activites={activityy?.Top_activity} />
      )} */}
      ;
      <PopularDestinations />
    </>
  );
  return <>{loginStatus ? loggedInCart : guestCart}</>;
}

export default Index;
