import { useState, useEffect, useMemo } from 'react';
import aa from '../../assets/Images/personalBack.png';
import bb from '../../assets/Images/addWhiteBack.png';
import cc from '../../assets/Images/paymentBack.png';
import dd from '../../assets/Images/shareIcon.png';
import ee from '../../assets/Images/watchPic.png';
import ff from '../../assets/Images/userPic.png';
import gg from '../../assets/Images/databasePic.png';
import hh from '../../assets/Images/giftPic.png';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useCartContext } from '../../Context/CartProvider';
import { FaGift } from 'react-icons/fa';
import { FiGift } from 'react-icons/fi';
const INITIAL = { fullname: '', email: '', country: '', mobileNumber: '' };
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
function Index() {
  const { cart } = useCartContext();
  console.log('cart', cart);
  const naviagte = useNavigate();
  const [personalInfo, setpersonalInfo] = useState(JSON.parse(JSON.stringify(INITIAL)));

  // const validator = () => {
  //   const { fullname, email, country, mobileNumber } = personalInfo;
  //   if (fullname === '') {
  //     toast.error('Full Name is required');
  //     return false;
  //   }
  //   if (email === '') {
  //     toast.error('Email is required');
  //     return false;
  //   }
  //   if (!email.match(emailRegex)) {
  //     toast.error('Email is not valid');
  //     return false;
  //   }
  //   if (country === '') {
  //     toast.error('Country is required');
  //     return false;
  //   }
  //   if (mobileNumber === '') {
  //     toast.error('Ph. Number is required');
  //     return false;
  //   }
  //   if (mobileNumber?.length < 7) {
  //     toast.error('Ph. Number length must be greater than 6');
  //     return false;
  //   }
  //   return true;
  // };

  const changeHandler = e => {
    setpersonalInfo(prev => {
      let update = JSON.parse(JSON.stringify(prev));
      update[e.target.name] = e.target.value;
      return update;
    });
  };

  const subtotalMemo = useMemo(() => {
    let subtotal = 0;
    cart?.length !== 0 && cart?.cart_giftcard.forEach((item) => {
      subtotal = subtotal + item?.amount;
    });
    cart?.length !== 0 && cart?.cart_activity.forEach((item) => {
      subtotal = subtotal + item?.totalPrice;
    })
    return subtotal?.toFixed(2)
  }, [cart]);
  console.log("subtotalMemo", subtotalMemo)


  const submitter = e => {
    e.preventDefault();
    // if (!validator()) return;
    if (cart?.cart_activity?.length === 0 && cart?.cart_giftcard?.length === 0) return toast.error('No items found in cart to checkout');
    naviagte('/make-payment');
  };

  return (
    <>
      <section className="checkPersonalSection">
        <div className="container">
          <div className="row">
            <div className="col checkHead">
              {/* <p>Check your personal details</p> */}
              <p>Order Summary</p>
            </div>
          </div>
          <div className="row bookRowPart">
            <div className="col-lg-6 bookingPart">
              <div className="bookingPartImg">
                <figure>
                  <img src={aa} alt="problem" />
                  <span className="bookingPartImgSpan activeImgSpan">Summary</span>
                </figure>
                {/* <figure>
                  <img src={bb} alt="" />
                  <span className="bookingPartImgSpan">Additions</span>
                </figure> */}
                <figure>
                  <img src={cc} alt="" />
                  <span className="bookingPartImgSpan">Payment</span>
                </figure>
              </div>
              {/* <form action="" className="bookingFormThings">
                <div className="bookFormThingsParent">
                  <label htmlFor="fullname" className="thingsBookLabel">
                    full name
                  </label>
                  <div className="thingsBookInputParent">
                    <input
                      name="fullname"
                      value={personalInfo?.fullname}
                      onChange={changeHandler}
                      type="text"
                      id="fullname"
                      className="thingsBookInput"
                    />
                  </div>
                </div>
                <div className="bookFormThingsParent">
                  <label htmlFor="email" className="thingsBookLabel">
                    Email
                  </label>
                  <div className="thingsBookInputParent">
                    <input
                      name="email"
                      value={personalInfo?.email}
                      onChange={changeHandler}
                      type="email"
                      id="email"
                      className="thingsBookInput"
                    />
                  </div>
                </div>
                <div className="bookFormThingsParent">
                  <label htmlFor="country" className="thingsBookLabel">
                    Country
                  </label>
                  <div className="thingsBookInputParent">
                    <input
                      name="country"
                      value={personalInfo?.country}
                      onChange={changeHandler}
                      type="text"
                      id="country"
                      className="thingsBookInput"
                    />
                  </div>
                </div>
                <div className="bookFormThingsParent bookFormThingsParentLast">
                  <label htmlFor="mobileNumber" className="thingsBookLabel">
                    Ph. number
                  </label>
                  <div className="thingsBookInputParent">
                    <input
                      name="mobileNumber"
                      onChange={changeHandler}
                      value={personalInfo?.mobileNumber}
                      type="number"
                      id="mobileNumber"
                      className="thingsBookInput"
                    />
                  </div>
                </div>
              </form> */}
              {/* <p className="freeText">Free cancellation until 7:00 PM on June 3</p> */}
              <div className="continueBtn">
                <Link onClick={submitter} className="btn">
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
                      const adult = item?.participentType?.find(item => item?.pertype === 'Adult');
                      const children = item?.participentType?.find(item => item?.pertype === 'children');

                      return (
                        <div key={i}>
                          <div className="fromPaParent">
                            <span>{item?.activity?.activityTitle}</span>
                          </div>
                          <div className="bookingRatePart">
                            <p className="bookNumRate">
                              {item?.activity?.reviewRating}/{item?.activity?.totalReview}
                            </p>
                            <div className="bookRate">
                              {Array.from({ length: item?.activity?.reviewRating }, () => 2)?.map((item, i) => {
                                return <i key={i} className="fa-solid fa-star" />;
                              })}
                              {Array.from(
                                { length: +item?.activity?.totalReview || 5 - +item?.activity?.reviewRating },
                                () => 2
                              )?.map((item, i) => {
                                return <i key={i} className="fa-regular fa-star" style={{ color: '#cfcfcf' }} />;
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
                                {new Date(item?.activity?.startDate).toDateString()} at {item?.statingTime}
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
                                {children?.person} Children (Age {children?.age})
                              </span>
                            </div>
                          </div>
                          {i !== arr.length - 1 && <hr style={{ border: '1px dashed red' }} />}
                        </div>
                      );
                    })}

                    {/* gift Cart */}
                    {cart?.cart_activity?.length !== 0 && < hr style={{ border: '1px dashed red' }} />}
                    {cart?.cart_giftcard?.map((item, i, arr) => {
                      return (
                        <div key={i}>
                          {/* {cart?.cart_activity.length && < hr style={{ border: '1px dashed red' }} />} */}
                          <div className="fromPaParent" style={{ margin: "28px 0px" }}>
                            <div>
                              <p className='thinkToPara'>Thinks To Do Gift Certificate</p>
                            </div>
                            <div className='d-flex justify-content-between'>
                              <span className='mr-3' style={{ fontSize: "30px" }}>
                                <FiGift />
                              </span>
                              {item?.activityName && <span>{item?.activityName}</span>}
                            </div>
                            <div className='mt-3'>
                              {item?.personalMsg
                                ?
                                <p>Message: {item?.personalMsg}</p>
                                :
                                <p>Message: No Message</p>
                              }
                            </div>
                            <div className='mt-3'>
                              <h4>Price: $ {item?.amount}</h4>
                            </div>
                          </div>
                          {i !== arr.length - 1 && <hr style={{ border: '1px dashed red' }} />}
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
                          {cart?.cart_activity?.length > 1 ? 'These activities are' : 'This activity is'} non-refundable
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
                      <span>$ {subtotalMemo}</span>
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
