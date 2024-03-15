import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import aa from "../../assets/Images/lockImg.png";
import bb from "../../assets/Images/payPalPic.png";
import cc from "../../assets/Images/gpayPic.png";
import dd from "../../assets/Images/amazonPayPic.png";
import ee from "../../assets/Images/shareIcon.png";
import ff from "../../assets/Images/watchPic.png";
import gg from "../../assets/Images/userPic.png";
import hh from "../../assets/Images/databasePic.png";
import ii from "../../assets/Images/giftPic.png";
import { useCartContext } from "../../Context/CartProvider";
import { makePayment } from "../../API_HELPERS/apiHelpers";
import { toast } from "react-hot-toast";
import MainLoader from "../../components/Loaders/MainLoader";
import { FiGift } from "react-icons/fi";
import HomeService from "../../Service/HomeService";
import ActivityService from "../../Service/ActivityService";
import { async } from "q";
import { reactLocalStorage } from "reactjs-localstorage";
import moment from "moment"; 
import { loadStripe } from '@stripe/stripe-js';

function Index() {
  const stripePromise = loadStripe('pk_test_7SAk1ShEaKFQSFopBzZe0iFh');
  const { cart, fetchCartData } = useCartContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [couponData, setCouponData] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  const [discData, setDiscData] = useState(
    reactLocalStorage.getObject("thingsCouponData")
  );
 

  const subtotalMemo = useMemo(() => {
    let subtotal = 0;
    cart?.length !== 0 &&
      cart?.cart_giftcard.forEach((item) => {
        subtotal = subtotal + item?.amount;
      });
    cart?.length !== 0 &&
      cart?.cart_activity.forEach((item) => {
        subtotal = subtotal + item?.totalPrice;
      });
    return subtotal?.toFixed(2);
  }, [cart?.cart_activity?.totalPrice, cart?.cart_giftcard?.amount]);


  const changedata = (arr) => {
    const temparr = arr?.map((ele, id) => {
      return {
        pertype: ele.partyname,
        age: ele.age,
        person: ele.count,
        perPerson: ele.price,
        discountPrice: ele.discountPrice,

        typeId: ele._id,
      };
    });

    return temparr;
  };



  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart?.cart_activity?.length === 0 && cart?.cart_giftcard?.length === 0)
      return toast.error("No items found in cart to checkout"); 
    let data = {
      items: cart?.cart_activity?.map((item) => {
        return {
          cart: "activity",
          cartid: item?._id,
          activityDetailsId: item?.activity?._id,
          bookingTime: item?.statingTime,
          bookingDate: item?.bookedOn,
          paymentMode: "offline",
          bookingStatus: true,
          amount: item?.totalPrice,
          totalTourPerson: item?.totalPerson,
          participentType: changedata(item?.participentType),
        };
      }),
      // actualPrice: cart?.cart_activity?.reduce((acc, item) => acc + +item?.totalPrice, 0),
      actualPrice: subtotalMemo,
      //  currencyId:item?.currency?_id,
      discountedPrice: discData?.discountedAmount
        ? discData?.discountedAmount
        : "",
      bookingStatus: true,
      paymentMode: "online",
    }; 
    cart?.cart_giftcard.forEach((item) => {
      data.items.push({
        cart: "giftcard",
        cartid: item?._id,
        amount: item?.amount,
        giftCode: item?.giftCode,
        // bookingTime: '12:00 PM',
        // bookingDate: '2023-07-05',
        bookingStatus: true,
        personalMsg: item?.personalMsg,
        giftApplyLink: item?.giftApplyLink,
        expirationDate: item?.expirationDate,
        activityId: item?.activityId,
        paymentMode: "offline",
      });
    });
    try {
      setIsLoading(true);
      const stripe = await stripePromise;
      const session = await makeStripePaymentSession(data); 
      console.log("else part",data)
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      }); 
      if (result.error) {
        toast.error(result.error.message);
      }  
      else{ 

        const res = await makePayment(data);
        if (res && res?.status) {
          fetchCartData();
          toast.success("Successfully Booked");
          reactLocalStorage.remove("thingsCouponData");
          // if (cart?.cart_giftcard?.length === 0) {
          //   navigate('/booking-history');
          // } else {
          //   navigate(`/send-gift/${res?.orderId}`);
          // }
          navigate("/booking-history");
        } else {
          toast.error(res?.message || "Purchase was unsuccessful");
          console.log("NOT PURCHASED", res);
        }
      }
    } catch (error) {
      console.log("NOT PURCHASED", error);
      toast.error(error?.message || "Purchase was unsuccessful");
    }
    setIsLoading(false);
  };  



  const makeStripePaymentSession = async (data) => { 
    try {
  const response = await fetch('http://34.201.127.230:8025/your-server-endpoint-to-create-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: data,
    }),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  const session = await response.json();
  return session;
} catch (error) {
  console.error("Error in makeStripePaymentSession:", error);
  throw error; 
}
}; 


  const applyCoupon = async (e) => {
    e.preventDefault();
    if (!couponData) return toast.error("Coupon Code is required");
    const data = {
      giftCode: couponData,
    };

    // return;
    const res = await ActivityService.addCouponCard(data);

    if (res && res?.status) {
      // setDiscountedAmount(res?.discountedAmount);
      // setTotalAmount(res?.totalAmount - res?.discountedAmount);
      setDiscData(res);
      reactLocalStorage.setObject("thingsCouponData", res);
    } else {
      toast?.error(res?.message);
    }
  };

  return (
    <>
      <MainLoader isLoading={isLoading} />
      <section className="checkPersonalSection mb-5">
        <div className="container">
          <div className="row">
            <div className="col checkHead">
              <p className="selectText">Select a payment method</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 paymentPart">
              <div className="paySmall">
                <figure>
                  <img src={aa} alt="" />
                </figure>
                <span>Payments are secure and encrypted</span>
              </div>
              <div className="debPayFormPart">
                {/* <p className="debHead">Debit or credit card</p> */}
                {/* <p className="debHead">Payment Mode</p> */}

                {/* {!isCheckout &&
                  <form className="debPay">
                    <div className="debPayBtn" onClick={(e) => {
                      // handleCheckout
                      e.preventDefault();
                      setIsCheckout(true);
                    }}
                    >
                      <button>Checkout</button>
                    </div>
                  </form>
                } */}

                {/* coupon code */}
                <div className="coupon-card-form">
                  {discData?.discountedAmount ? (
                    <div className="d-flex justify-content-center text-success">
                      <p>Discount code Applied</p>
                    </div>
                  ) : (
                    <form>
                      <div className="row">
                        <div className="col-12">
                          <label for="inputPassword5">Coupon Code</label>
                          <div className="d-flex justify-content-around">
                            <input
                              type="text"
                              className="form-control mr-2"
                              placeholder="Coupon Code"
                              onChange={(e) => {
                                setCouponData(e.target.value);
                              }}
                            />
                            <button
                              className="btn btn-success"
                              onClick={applyCoupon}
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                  <hr />
                  <div className="mt-3">
                    <div className="d-flex justify-content-between">
                      <span>Subtotal </span>
                      <span>
                        {cart?.cart_activity?.[0]?.activity?.currency?.symbol ||
                          "£"}
                        &nbsp; {subtotalMemo}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Coupon Discount </span>
                      <span>
                        {cart?.cart_activity?.[0]?.activity?.currency?.symbol ||
                          "£"}
                        &nbsp;
                        {discData?.discountedAmount >= 0
                          ? (
                              discData?.totalAmount - discData?.discountedAmount
                            )?.toFixed(2)
                          : 0}
                      </span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <span>Total </span>
                      <span>
                        {cart?.cart_activity?.[0]?.activity?.currency?.symbol ||
                          "£"}
                        &nbsp;
                        {discData?.discountedAmount >= 0
                          ? discData?.discountedAmount?.toFixed(2)
                          : subtotalMemo}
                      </span>
                    </div>
                    <div className="debPayBtn" onClick={handleCheckout}>
                      <button>Checkout</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* {item?.activity?.currency?.symbol} */}
              {/* <div className="otherPart">
                <p className="othText">Other payment mode</p>
                <div className="otherPayPicPrnt">
                  <figure>
                    <img src={bb} alt="Paypal" />
                  </figure>
                  <figure>
                    <img src={cc} alt="Gpay" />
                  </figure>
                  <figure>
                    <img src={dd} alt="Amazonpay" />
                  </figure>
                </div>
              </div> */}
            </div>
            <div className="col-lg-6 summaryPart">
              <div>
                <p className="orderHead">Order summary</p>
                <div className="summaryPartSub">
                  <div className="innerOrderPart innerOrderMakePayDiv">
                    {/* activity cart */}

                    {/* gift Cart */}
                    {/* {cart?.cart_activity?.length !== 0 && cart?.cart_giftcard?.length > 0 && (
                      <hr style={{ border: '1px dashed red' }} />
                    )} */}
                    <div className="innerSubDobDiv">
                      {cart?.cart_activity?.map((item, i, arr) => {
              
                        // const adult = item?.participentType?.find(item => item?.pertype === 'Adult');
                        // const children = item?.participentType?.find(item => item?.pertype === 'Children');
                        return (
                          <div
                            key={i}
                            style={{
                              padding: "1rem",
                              borderRadius: "10px",
                              boxShadow: "0 0 5px 0 #ced4da",
                              margin: "10px",
                            }}
                          >
                            <div className="fromPaParent">
                              <span>{item?.activity?.activityTitle}</span>
                            </div>
                            <div className="bookingRatePart">
                              <div className="bookRate">
                                {/* {Array.from({ length: item?.activity?.reviewRating }, () => 2)?.map((item, i) => {
                                return <i key={i} className="fa-solid fa-star" />;
                              })}
                              {Array.from(
                                { length: +item?.activity?.totalReview || 5 - +item?.activity?.reviewRating },
                                () => 2
                              )?.map((item, i) => {
                                return <i key={i} className="fa-regular fa-star" style={{ color: '#cfcfcf' }} />;
                              })} */}
                                <i
                                  data-star={item?.activity?.reviewRating?.toFixed(
                                    1
                                  )}
                                ></i>
                              </div>
                              <p className="bookNumRate">
                                {item?.activity?.reviewRating?.toFixed(1)}/5
                              </p>
                              <p className="bookPerson">
                                ({item?.activity.totalReview} reviews)
                              </p>
                            </div>
                            <div className="mt-2" />
                            {/* <div className="sharedIconPart">
                            <figure>
                              <img src={dd} alt="share" />
                            </figure>
                            <div className="shareText">
                              <span>Shared Group Tour in</span>
                              <span>English • Language: English</span>
                            </div>
                          </div> */}
                            <div className="sharedIconPart">
                              <figure>
                                <img src={ee} alt="watch" />
                              </figure>
                              <div className="shareText">
                                <span>
                                  {moment(item?.bookedOn).format(
                                    "ddd, DD MMMM YYYY"
                                  )}{" "}
                                  at {item?.statingTime}
                                </span>
                              </div>
                            </div>
                            <div className="sharedIconPart sharedIconLastPart">
                              <figure>
                                <img src={ff} alt="user" />
                              </figure>
                              <div className="shareText">
                                {item?.participentType?.map((ele, id) => {
                                  if (ele.count > 0) {
                                    return (
                                      <>
                                        <span>
                                          {ele?.partyname}

                                          {"    " +
                                            cart?.cart_activity?.[0]?.activity
                                              ?.currency?.symbol || "£"}
                                          {(ele?.count * ele?.price)?.toFixed(
                                            2
                                          )}
                                          {/* (Age: {ele?.age}) */}
                                        </span>
                                      </>
                                    );
                                  }
                                })}

                                {/* <span>
                                  {adult?.person} Adult (Age {adult?.age})
                                </span>
                                {children?.person && (
                                  <span>
                                    {children?.person} Children (Age {children?.age})
                                  </span>
                                )} */}
                              </div>
                            </div>

                            {item?.activity?.activitydiscountedPrice ? (
                              <div className="sharedIconPart sharedIconLastPart">
                                <figure>
                                  <img src={ff} alt="user" />
                                </figure>
                                <div className="shareText">
                                  <h5 style={{ fontSize: "14px" }}>
                                    Discount Price:
                                    {cart?.cart_activity?.[0]?.activity
                                      ?.currency?.symbol ||
                                      Number(discountedAmount).toFixed(2)}
                                    &nbsp;
                                    {(
                                      item?.activity?.activityAdultPrice -
                                      item?.activity?.activitydiscountedPrice
                                    )?.toFixed(2)}
                                  </h5>
                                </div>
                              </div>
                            ) : null}

                            {typeof discData?.discountedAmount !=
                            "undefined" ? (
                              <div className="sharedIconPart sharedIconLastPart">
                                <figure>
                                  <img src={ff} alt="user" />
                                </figure>
                                <div className="shareText">
                                  <h5 style={{ fontSize: "14px" }}>
                                    Coupon Discount:
                                    {
                                      cart?.cart_activity?.[0]?.activity
                                        ?.currency?.symbol || "$"

                                      // Number(discountedAmount).toFixed(2)}
                                    }
                                    &nbsp;
                                    {Number(item?.totalPrice)?.toFixed(2) -
                                      Number(
                                        discData?.discountedAmount
                                      )?.toFixed(2)}
                                    {/* {Number(item?.totalAmount)?.toFixed(2)} */}
                                  </h5>
                                </div>
                              </div>
                            ) : null}
                            <div className="mt-3 d-flex justify-content-end">
                              <h5>
                                Total Price:
                                {/* {cart?.cart_activity?.[0]?.activity?.currency
                                  ?.symbol || discountedAmount }
                                &nbsp;{item?.totalPrice?.toFixed(2)} */}
                                {/* {discData?.discountedAmount
                                  ? discData?.discountedAmount?.toFixed(2)
                                  : item?.totalPrice?.toFixed()} */}
                                {item?.totalPrice?.toFixed()}
                              </h5>
                            </div>
                            {/* {i !== arr.length - 1 && <hr style={{ border: '1px dashed red' }} />} */}
                          </div>
                        );
                      })}

                      {/* gift cart */}
                      {cart?.cart_giftcard?.map((item, i, arr) => {
                        return (
                          <div
                            key={i}
                            style={{
                              padding: "1rem",
                              borderRadius: "10px",
                              boxShadow: "0 0 5px 0 #ced4da",
                              margin: "10px",
                            }}
                          >
                            {/* {cart?.cart_activity.length && < hr style={{ border: '1px dashed red' }} />} */}
                            <div
                              className="fromPaParent"
                              style={{ margin: "0" }}
                            >
                              <p>Things To Do Gift Certificate</p>
                              <div className="d-flex justify-content-between">
                                <span
                                  className="mr-3"
                                  style={{ fontSize: "30px" }}
                                >
                                  <FiGift />
                                </span>
                                <span>{item?.activityName}</span>
                              </div>
                              <div className="mt-3">
                                {item?.personalMsg && (
                                  <p>Message: {item?.personalMsg}</p>
                                )}
                              </div>
                              <div className="mt-3 d-flex justify-content-end">
                                <h5>
                                  Price:{" "}
                                  {cart?.cart_activity?.[0]?.activity?.currency
                                    ?.symbol || "£"}{" "}
                                  {item?.amount?.toFixed(2)}
                                </h5>
                              </div>
                            </div>
                            {/* {i !== arr.length - 1 && <hr style={{ border: '1px dashed red' }} />} */}
                          </div>
                        );
                      })}
                    </div>

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
                    {/* <form action="" className="redeemForm">
                      <div>
                        <div className="input-group">
                          <input type="text" className="myFormCntrl" />
                        </div>
                        <div className="redeBtn">
                          <button className="btn" type="button" id="button-addon2">
                            Redeem
                          </button>
                        </div>
                      </div>
                    </form> */}
                  </div>
                  <div className="subtotalPart">
                    <div className="subTotalFirst">
                      <span>Subtotal</span>
                      {/* <span>$ {cart?.cart_activity?.reduce((acc, item) => acc + +item?.totalPrice, 0)}</span> */}
                      <span>
                        {cart?.cart_activity?.[0]?.activity?.currency?.symbol ||
                          "£"}
                        &nbsp;{" "}
                        {discData?.discountedAmount
                          ? discData?.discountedAmount?.toFixed(2)
                          : subtotalMemo}
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
