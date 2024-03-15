import React, { useCallback, useEffect, useMemo } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import SharedGroupModal from "../../components/Modal/SharedGroupModal";
import { toast } from "react-hot-toast";
import { useCartContext } from "../../Context/CartProvider";
import { useAuth } from "../../Context/AuthContextProvider";
import {
  addCartData,
  checkAvailability,
  getAllSlots,
} from "../../API_HELPERS/apiHelpers";
import GiftCardModal from "../../components/Modal/GiftCardModal";
import Calendar from "react-multi-date-picker";
import { useRef } from "react";
import MainLoader from "../../components/Loaders/MainLoader";
import spcial_offer from "../../assets/special_offer.gif";
import ReactCalender from "../../components/reactcalendar";

function compareDateTime(dateTimeString1, dateTimeString2) {
  const moment = require("moment");
  const firstTime = moment(dateTimeString1, "DD/MM/YYYY h:mm A");
  const secondTime = moment(dateTimeString2, "DD/MM/YYYY h:mm A");

  if (firstTime.isAfter(secondTime)) {
    // console.log(dateTimeString1, "is greater than ", dateTimeString2);
    return false;
  } else if (secondTime.isAfter(firstTime)) {
    // console.log(dateTimeString2, "is greater than ", dateTimeString1);
    return true;
  } else {
    // console.log("Both are equal", dateTimeString1, dateTimeString2);
    return false;
  }
}

const AboutActivity = ({
  detail,
  id,
  slug,
  numPersons,
  setNumPersons,
  calendarShow,
  setCalendarShow,
}) => {
  const avialibiltyRef = useRef();
  const aboutRef = useRef();
  const participentTypeRef = useRef();
  const [modalA, setModalA] = useState(false);
  const { setShowLoginModal, loginStatus } = useAuth();
  const navigate = useNavigate();
  const [personOverlay, setPersonOverlay] = useState(false);
  const [modal, setModal] = useState(false);
  const [totalPersons, settotalPersons] = useState(0);  
  //  const [calendarShow, setCalendarShow] = useState(false);

  //  const[total_Price,settotal_Price]=useState(()=>{if(numPersons?.length>0 )
  //   return(numPersons?.reduce((ele,sum)=>{sum=sum+(ele?.count*ele?.price)}))})

  // const[total_Price,settotal_Price]=useState((()=>{if(numPersons?.length>0 )
  //   return(numPersons?.reduce((ele,sum)=>{sum=sum+(ele?.count*ele?.price)}))})())
  const [total_Price, settotal_Price] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slots, setSlots] = useState([]);
  const [showSlots, setShowSlots] = useState(false);
  const { fetchCartData } = useCartContext();
  const priceDetailsForChildren = detail?.participentType?.filter(
    (item) => item?.pertype === "Children"
  )?.[0];
  const priceDetailsForAdult = detail?.participentType?.filter(
    (item) => item?.pertype === "Adult"
  )?.[0];
  // const totalPersons = +numPersons?.adult + +numPersons?.children;
  // const totalPersons=numPersons?.length>0?numPersons?.reduce((ele,sum)=>sum+ele.count):0
  const totalPriceForChildren = +(
    +numPersons?.children *
    +(priceDetailsForChildren?.price || +priceDetailsForAdult?.price)
  )?.toFixed(3);
  const totalPriceForAdult = +(
    +numPersons?.adult * +priceDetailsForAdult?.price
  )?.toFixed(3);
  const totalPrice = +(totalPriceForChildren + totalPriceForAdult).toFixed(3);
  // getting the discounted price
  const discountedPriceMemo = useCallback(
    (mainPrice) => {
      if (detail?.offerDetails) {
        return (
          (Number(mainPrice) *
            (100 - Number(detail?.offerDetails?.discountPercentage))) /
          100
        );
      } else {
        return "";
      }
    },
    [detail]
  );

  //...........................................for closing calender
  const handleOpenCalendar = () => {
    const cal = document.querySelector(".calendar-wrapper");
    if (cal) {
      // Check if the element exists
      if (!calendarShow) {
        cal.style.display = "block";
        setCalendarShow(true);
      } else {
        cal.style.display = "none";
        setCalendarShow(false);
      }
    }
  };
  const handleClick = () => {
    if (!loginStatus) return setShowLoginModal(true);
    setModalA(!modalA);
  };
  const changeHandler = (e, flag, indx) => {
    if (flag === "minus") {
      if (numPersons[indx].count > 0) {
        const temparr1 = [...numPersons];
        temparr1[indx].count = temparr1[indx].count - 1;
        setNumPersons(temparr1);
        if (totalPersons > 0) {
          settotalPersons((prev) => prev - 1);
        }
        if (
          detail?.activitydiscountedPrice > 0 ||
          detail?.activityDiscountPrice > 0
        ) {
          if (temparr1[indx]?.partyname == "Adult") {
            settotal_Price(
              total_Price -
                (temparr1[indx].price -
                  (temparr1[indx].price *
                    detail?.offerDetails?.discountPercentage) /
                    100)
            );
          } else {
            settotal_Price(total_Price - temparr1[indx].price);
          }
        } else {
          settotal_Price(total_Price - temparr1[indx].price);
        }
        // console.log("lgdfjhdfsd", total_Price, temparr1[indx].price);
      }
      return;
    } 

    if (flag === "add") {
      const temparr = [...numPersons];
      temparr[indx].count = temparr[indx].count + 1;
      setNumPersons(temparr);
      settotalPersons((prev) => prev + 1);
      if (
        detail?.activitydiscountedPrice > 0 ||
        detail?.activityDiscountPrice > 0
      ) {
        if (temparr[indx]?.partyname == "Adult") {
          settotal_Price(
            total_Price +
              (temparr[indx].price -
                (temparr[indx].price *
                  detail?.offerDetails?.discountPercentage) /
                  100)
          );
        } else {
          settotal_Price(total_Price + temparr[indx].price);
        }
      } else {
        settotal_Price(total_Price + temparr[indx].price);
      }
      // console.log(temparr[indx].count * temparr[indx].price,"======price");
      return;
    }
  };

  const validator = () => {
    if (numPersons?.adult === 0) {
      toast.error("Atleast one adult is needed");
      return false;
    }

    if (selectedDate === "") {
      toast.error("Date is required");
      return false;
    }

    return true;
  };

  const fetchSlots = async (date, id) => {
    try {
      setIsLoading(true);
      const res = await getAllSlots({
        tourdate: date,
        activityId: id,
      });
      if (res && res?.status) {
        console.log(
          "SLOTS",
          {
            tourdate: date,
            activityId: id,
          },
          res?.data
        );
        const filteredSlots = res?.data?.filter((item) => {
          // const current = `${new Date().toLocaleDateString()} ${new Date()?.toLocaleTimeString()}`;
          // const fetched = `${new Date(date).toLocaleDateString()} ${item?.cutoffTime}`;
          const current = `${moment().format("DD/MM/YYYY h:mm A")}`;
          const fetched = `${new Date(date).toLocaleDateString("en-IN", {
            year: "numeric",
            day: "2-digit",
            month: "2-digit",
          })} ${item?.cutoffTime}`;
          // const fetched = `${moment(`${date} ${item?.cutoffTime}`).format('DD/MM/YYYY h:mm A')}`;
          if (compareDateTime(current, fetched)) {
            return item;
          }
        });
        // console.log('test', moment('2023-08-02 5:00 AM').format('DD/MM/YYYY h:mm A'));
        const newdata = filteredSlots.sort((a, b) => {
          const [timeA, periodA] = a.time.split(" ");
          const [hoursA, minutesA] = timeA.split(":");
          const totalMinutesA =
            parseInt(hoursA) * 60 +
            parseInt(minutesA) +
            (periodA === "PM" ? 720 : 0);

          const [timeB, periodB] = b.time.split(" ");
          const [hoursB, minutesB] = timeB.split(":");
          const totalMinutesB =
            parseInt(hoursB) * 60 +
            parseInt(minutesB) +
            (periodB === "PM" ? 720 : 0);

          return totalMinutesA - totalMinutesB;
        });
        // const filterAvailibility = newdata?.filter((ele, id) => {
        //   return ele.remeningUser === 0;
        // });
        setSlots(newdata);
        // setSlots(filterAvailibility);
      } else {
        setSlots([]);
        toast.error(res?.message ? res?.message : "SOMETHING  WRONG");
        console.log("ERROR FETCHING SLOTS", res?.message, res);
      }
    } catch (error) {
      console.log("ERROR FETCHING SLOTS", error?.message, error);
    }
    setIsLoading(false);
  };
  const availabilityChecker = async (data, slot, id) => {
    try {
      setIsLoading(true);
      const res = await checkAvailability({
        activityId: id,
        ...data,
      }); 
      console.log("krishna =======>>>",res)
      if (res && res?.status) {
        // toast.success(res?.message || 'Slot is Available');
        setSelectedSlot(slot);
      } else {
        toast.error("Maximum participants exceeded for this activity");
        // toast.error(res?.message || "Maximum participants exceeded for this activity");
      }
    } catch (error) {
      toast.error("Maximum participants exceeded for this activity");
    }
    setIsLoading(false);
  };
  const cartHandler = async (e, flag) => {
    e.preventDefault();
    if (!loginStatus) return setShowLoginModal(true);
    if (isLoading) return;
    if (selectedSlot === null) return toast.error("Select a slot first");
    setIsLoading(true);
    // console.log(selectedDate, "selectedDate");

    const data = {
      activityId: detail?._id,
      statingTime: selectedSlot?.time,

      bookedOn: selectedDate,
      totalPerson: totalPersons,
      // totalPrice: detail?.offerDetails ? discountedPriceMemo(totalPrice) : totalPrice,
      totalPrice: total_Price,
      participentType: numPersons,
    };
 
    // console.log("data=====",data)
    if (total_Price > 0 && totalPersons > 0) {
      try {
        const res = await addCartData(data);
        if (res && res?.status) {
          toast.success("Activity added to Cart");
          fetchCartData();
          setIsLoading(false);
          if (flag === "book") {
            navigate("/make-payment");
            return;
          }
          navigate("/add-to-cart");
        } else {
          setIsLoading(false);
          toast.error(res?.message || "Something went wrong");
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(error?.message || "Something went wrong");
      }
    } else {
      toast.error("Select atleast one Person ");
      setIsLoading(false);
      return;
    }
  };
  const scrollHandle = () => {
    // console.log(window.innerHeight, window.innerWidth);
    let width = window.innerWidth;
    if (width < 1146) {
      aboutRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      avialibiltyRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };
  const outsideClickHandler = (e) => {
    if (
      participentTypeRef.current &&
      !participentTypeRef.current.contains(e.target)
    ) {
      setPersonOverlay(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", outsideClickHandler);
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  });
  // console.log(
  //   "discountedPriceMemo",
  //   discountedPriceMemo(detail?.activityActualPrice)
  // );
  return (
    <>
      <MainLoader isLoading={isLoading} />
      <section className="aboutActivityPart" ref={avialibiltyRef}>
        {/* <section 
      className="aboutActivityPart" ref={avialibiltyRef}> */}

        <div className="container-fluid">
          <div className="row aboutActivityPartRow1">
            <div className="col aboutActivityParentCol">
              <p className="aboutActP">About this activity</p>
            </div>
          </div>
          <div className="row aboutActivityPartRow2">
            <div className="col aboutActivityParentCol">
              <div className="formInnerPart">
                <div className="formTextPart">
                  <ul ref={aboutRef}>
                    {detail?.tourActivity?.map((item, i) => {
                      return (
                        <li key={i}>
                          <p className="liHeadingPart">{item.term}</p>
                          <p className="liSmallPart">{item.description}</p>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Select Participants & Date left part*/}
                  <div className="formMainPart" id="formMainPartID">
                    <p>Select Participants & Date</p>
                    <form action="" className="myFormParent">
                      <div className="firstSelectBoxParent">
                        <div className="modal_own">
                          <div className="dropdown" ref={participentTypeRef}>
                            <button
                              className="btn selectPartBtn"
                              type="button"
                              onClick={() => {
                                setPersonOverlay((prev) => !prev);
                              }}
                            >
                              <span className="mulUserIcon">
                                <i class="fa-solid fa-user-group"></i>
                              </span>
                              Participants
                              <span className="drpdwn_icon">
                                <i className="fa-solid fa-caret-down"></i>
                              </span>
                            </button>
                            {
                              personOverlay &&
                                numPersons?.map((ele, indx) => {
                                  return (
                                    <>
                                      <div className="act_btn_add_mns">
                                        <h5
                                          className="actn_txt"
                                          style={{ paddingTop: "7px" }}
                                        >
                                          {ele.partyname}
                                        </h5>
                                        <div
                                          style={{ cursor: "pointer" }}
                                          className="minus_button"
                                          onClick={(e) =>
                                            changeHandler(e, "minus", indx)
                                          }
                                        >
                                          <i
                                            style={{ cursor: "pointer" }}
                                            className="fa-solid fa-minus fa-2xs"
                                          ></i>
                                        </div>
                                        <input
                                          type="text"
                                          className="numperson"
                                          style={{
                                            width: "30px",
                                            textAlign: "center",
                                          }}
                                          value={ele?.count}
                                          name="adult"
                                          disabled={true}
                                        />
                                        <div
                                          className="minus_button"
                                          style={{ cursor: "pointer" }}
                                          onClick={(e) =>
                                            changeHandler(e, "add", indx)
                                          }
                                        >
                                          <i className="fa-solid fa-plus fa-2xs"></i>
                                        </div>
                                      </div>
                                      <hr
                                        style={{
                                          margin: "0",
                                          borderTop:
                                            "1px solid rgb(0 0 0 / 50%)",
                                        }}
                                      />
                                    </>
                                  );
                                })

                              // <section className="actn_own fade-in">
                              //   <div className="act_btn_add_mns">
                              //     <h5 className="actn_txt" style={{ paddingTop: '7px' }}>
                              //       Adult
                              //     </h5>
                              //     <div
                              //       style={{ cursor: 'pointer' }}
                              //       className="minus_button"
                              //       onClick={e => changeHandler(e, 'minus', 'adult')}
                              //     >
                              //       <i style={{ cursor: 'pointer' }} className="fa-solid fa-minus fa-2xs"></i>
                              //     </div>
                              //     <input
                              //       type="text"
                              //       className="numperson"
                              //       style={{
                              //         width: '30px',
                              //         textAlign: 'center',
                              //       }}
                              //       value={numPersons?.adult}
                              //       name="adult"
                              //       disabled={true}
                              //     />
                              //     <div
                              //       className="minus_button"
                              //       style={{ cursor: 'pointer' }}
                              //       onClick={e => changeHandler(e, 'add', 'adult')}
                              //     >
                              //       <i className="fa-solid fa-plus fa-2xs"></i>
                              //     </div>
                              //   </div>
                              //   <hr
                              //     style={{
                              //       margin: '0',
                              //       borderTop: '1px solid rgb(0 0 0 / 50%)',
                              //     }}
                              //   />
                              //   {priceDetailsForChildren && (
                              //     <div className="act_btn_add_mns">
                              //       <h5 className="actn_txt" style={{ paddingTop: '7px' }}>
                              //         Children
                              //       </h5>
                              //       <div
                              //         style={{ cursor: 'pointer' }}
                              //         className="minus_button"
                              //         onClick={e => changeHandler(e, 'minus', 'children')}
                              //       >
                              //         <i style={{ cursor: 'pointer' }} className="fa-solid fa-minus fa-2xs"></i>
                              //       </div>
                              //       <input
                              //         type="text"
                              //         className="numperson"
                              //         style={{
                              //           width: '30px',
                              //           textAlign: 'center',
                              //         }}
                              //         value={numPersons?.children}
                              //         name="children"
                              //         disabled={true}
                              //       // onChange={e => changeHandler(e, 'input')}
                              //       />
                              //       <div
                              //         className="minus_button"
                              //         style={{ cursor: 'pointer' }}
                              //         onClick={e => changeHandler(e, 'add', 'children')}
                              //       >
                              //         <i className="fa-solid fa-plus fa-2xs"></i>
                              //       </div>
                              //     </div>
                              //   )}
                              // </section>
                            }
                          </div>
                        </div>

                        {/* calender sec */}

                        {/* <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setCalendarShow(true);
                          }}
                        > */}
                        <ReactCalender
                          activityId={id}
                          selectedDate={selectedDate}
                          onSelectDate={(val) => setSelectedDate(val)}
                          calendarShow={calendarShow}
                          setCalendarShow={setCalendarShow}
                        />
                        {/* </div> */}

                        {/* <div className="secondSelectBoxParent">
                          <span className="calSecIcon">
                            <i class="fa-solid fa-calendar-days"></i>
                          </span>

                          <Calendar
                            value={new Date(selectedDate)}
                            placeholder="YYYY/MM/DD"
                            style={{ height: '40px' }}
                            numberOfMonths={2}
                            disableMonthPicker
                            disableYearPicker
                            onChange={e => {
                              const x = `${e.year}-${e.month.toString().padStart(2, '0')}-${e.day
                                .toString()
                                .padStart(2, '0')}`;
                              setSelectedDate(x);
                              console.log('selectedDate', x);
                            }}

                          />
                          <span className="drpdwn_icon">
                            <i className="fa-solid fa-caret-down"></i>
                          </span>
                        </div> */}
                        {/* <div className="secondSelectBoxParent">
                        <input
                          type="date"
                          className="form-control"
                          autocomplete="off"
                          value={selectedDate}
                          onChange={e => setSelectedDate(e.target.value)}
                        />
                      </div> */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            if (!validator()) return;
                            fetchSlots(selectedDate, id);
                            setShowSlots(true);
                          }}
                          className="chkSlotBtn"
                        >
                          Check Slots
                        </button>
                      </div>
                      {/*  */}

                      <h5 className="tracking-in-expand chseChidHead">
                        Choosen
                        {numPersons.map((ele, id) => {
                          return (
                            <>
                              {" " + ele?.partyname} :{" "}
                              <span className="chseChSpan">
                                {ele?.count + " "}
                              </span>
                              {/* {priceDetailsForChildren && (
    <>
      
      &nbsp; & &nbsp;  {ele?.partyname} : <span className="chseChSpan">
        {numPersons?.children}</span>
    </>
  )} */}
                            </>
                          );
                        })}
                      </h5>

                      {/* <h5 className="tracking-in-expand chseChidHead">
                        Choosen Adult : <span className="chseChSpan">
                          {numPersons?.adult}</span>
                        {priceDetailsForChildren && (
                          <>
                            
                            &nbsp; & &nbsp; Children : <span className="chseChSpan">
                              {numPersons?.children}</span>
                          </>
                        )}
                      </h5> */}

                      {/* <div
                        className="buttonSelectPart"
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto' }}
                      >

                      </div> */}
                    </form>
                  </div>

                  <div className="slotSecMainDiv">
                    {showSlots && (
                      <div
                        className="slotsection tracking-in-expand"
                        style={{ overflow: "hidden" }}
                      >
                        <div>
                          <h2 className="slothead">Available Slots</h2>
                          <h2 className="slotpara">Select a starting time</h2>
                        </div>
                        <div className="slots-container">
                          {slots.length === 0 && (
                            <p
                              className="tracking-in-expand"
                              style={{ color: "#ff6b6b", marginTop: "5px" }}
                            >
                              {!isLoading && "No Slots Available To Book"}
                            </p>
                          )}
                          {slots.length > 0 &&
                            slots?.map((item, i) => {
                              // console.log("slots fetch", item);
                              return (
                                <div
                                  key={i}
                                  className={`time-container ${
                                    selectedSlot?._id === item?._id
                                      ? "activeSlot"
                                      : ""
                                  } ${item?.status ? "" : "deactive"} ${
                                    item.remeningUser === null ||
                                    item.remeningUser <= 0
                                      ? "deactive"
                                      : ""
                                  }`}
                                  style={{
                                    cursor:
                                      item?.status && item?.remeningUser >= 0
                                        ? "pointer"
                                        : "",
                                    // backgroundColor: item?.status
                                    //   ? "red"
                                    //   : "blue",
                                  }}
                                  onClick={() => {
                                    if (!item?.status) return;

                                    if (!validator()) return;
                                    availabilityChecker(
                                      {
                                        tourdate: selectedDate,
                                        time: item?.time,
                                        noOfPerson: totalPersons,
                                      },
                                      item,
                                      id
                                    );
                                  }}
                                >
                                  <h1>{item?.time}</h1>
                                  <h6
                                    style={{ color: "green", fontSize: "10px" }}
                                  >
                                    Available:{item?.remeningUser}
                                  </h6>
                                </div>
                              );
                            })}
                        </div>
                        {slots.length > 0 && (
                          <div
                            style={{
                              alignSelf: "flex-end",
                              color: "red",
                              margin: "10px 0px",
                            }}
                            className="clickOnSlot"
                          >
                            *Click on slots to check its availability
                          </div>
                        )}

                        {slots.length > 0 && (
                          <div>
                            <hr
                              style={{
                                margin: "15px 0",
                                border: "1px dotted #1a2b49",
                              }}
                            />

                            {/* price breakdown */}
                            <div className="price">
                              <div className="pricefirstdiv">
                                <p className="priceBrText">Price Breakdown</p>
                                {detail ? (
                                  <div className="priCalcParDiv">
                                    {numPersons.map((ele, id) => {
                                      // console.log("kjgjhv", ele);
                                      if (ele?.count > 0)
                                        return (
                                          <span className="pricecalculate">
                                            {ele.partyname}: {ele?.count} ×{" "}
                                            {detail?.currency?.symbol}
                                            {detail?.activitydiscountedPrice >
                                              0 ||
                                            detail?.activityDiscountPrice > 0
                                              ? ele.partyname === "Adult"
                                                ? (
                                                    ele?.price -
                                                    (ele?.price *
                                                      detail?.offerDetails
                                                        ?.discountPercentage) /
                                                      100
                                                  )?.toFixed(2)
                                                : ele?.price
                                              : ele?.price}
                                          </span>
                                        );
                                    })}
                                    {/* {numPersons?.children > 0 && (
                                      <span className="pricecalculate">
                                        (Children: {numPersons?.children} ×{" "}
                                        {detail?.currency?.symbol}{" "}
                                        {discountedPriceMemo(
                                          priceDetailsForChildren?.price ||
                                            +detail?.activityActualPrice
                                        )}
                                        )
                                      </span>
                                    )} */}
                                  </div>
                                ) : (
                                  <p className="adulPerMW">
                                    <span className="pricecalculate">
                                      (Adult: {numPersons?.adult} ×{" "}
                                      {detail?.currency?.symbol}{" "}
                                      {priceDetailsForAdult?.price ||
                                        detail?.activityActualPrice}
                                      )
                                    </span>
                                    {numPersons?.children > 0 && (
                                      <span className="pricecalculate">
                                        (Children: {numPersons?.children} ×{" "}
                                        {detail?.currency?.symbol}{" "}
                                        {priceDetailsForChildren?.price ||
                                          +detail?.activityActualPrice}
                                        )
                                      </span>
                                    )}
                                  </p>
                                )}
                              </div>
                              <div className="priceseconddiv">
                                <p className="priCalcParDiv">
                                  {detail?.currency?.symbol}
                                  {total_Price.toFixed(2)}
                                  {/* {detail?.offerDetails ? discountedPriceMemo(totalPrice) : totalPrice || 0} */}
                                </p>
                              </div>
                            </div>

                            <hr
                              style={{
                                margin: "15px 0 0 0",
                                border: "1px dotted #1a2b49",
                              }}
                            />

                            {/* total price */}
                            <div
                              className="totalprice"
                              style={{
                                backgroundColor: "#ebeef1",
                                padding: "10px",
                              }}
                            >
                              <div className="priceamt">
                                <p className="totPriText">Total price</p>
                                <p className="totPriAmnt">
                                  {" "}
                                  {detail?.currency?.symbol}
                                  {total_Price.toFixed(2)}
                                  {/* {detail?.offerDetails ? discountedPriceMemo(totalPrice) : totalPrice || 0} */}
                                </p>
                                <p className="allTaxText">
                                  **All taxes and fees included
                                </p>
                              </div>
                              <div className="addcart">
                                <button
                                  className="addTocrtBtn"
                                  onClick={(e) => cartHandler(e)}
                                >
                                  Add to cart
                                </button>
                                <button
                                  className="plaOrdr"
                                  onClick={(e) => cartHandler(e, "book")}
                                >
                                  Place Order
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* right part */}
                <div>
                  <div className="likelyDiv">
                    <div>
                      <div className="offer-header">
                        {detail?.paymentTag ? (
                          <div
                            className="likeSubDiv"
                            style={{ backgroundColor: detail?.paymentTagColor }}
                          >
                            <span className="likeSmSpan">
                              {detail?.paymentTag}
                            </span>
                          </div>
                        ) : null}

                        {(detail?.activityDiscountPrice > 0 ||
                          detail?.activitydiscountedPrice > 0) && (
                          <div>
                            <div className="offer-main-body">
                              <img src={spcial_offer} alt="" />
                              <p className="offer-text">
                                {detail?.offerDetails?.specialOfferName}!{" "}
                                {detail?.offerDetails?.discountPercentage} % off
                              </p>
                              <p className="offer-text"></p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <p className="formSubPara">From</p>
                        <div className="priceChkDiv">
                          <div>
                            {/* {detail?.offerDetails ? ( */}
                            {detail?.activityDiscountPrice > 0 ||
                            detail?.activitydiscountedPrice > 0 ? (
                              <div>
                                <span className="rupActIcon">
                                  {detail?.currency?.symbol}
                                </span>
                                <span
                                  className="rupActText"
                                  style={{
                                    textDecoration:
                                      "line-through solid red 15%",
                                  }}
                                >
                                  {detail?.activityAdultPrice}
                                </span>

                                <span className="rupActIcon ml-3">
                                  {detail?.currency?.symbol}
                                </span>
                                <span className="rupActText">
                                  {/* {discountedPriceMemo(
                                    detail?.activityActualPrice
                                  )} */}
                                  {/* {detail?.participentType?.map((ele, ind) => {
                                    console.log("kkkhd", ele);
                                    if (ele.pertype === "Adult") {
                                      return (
                                        ele.price -
                                        (ele.price *
                                          detail.discountPercentage) /
                                          100
                                      );
                                    }
                                  })} */}
                                  {detail?.activityDiscountPrice ||
                                  detail?.activitydiscountedPrice
                                    ? (
                                        detail?.activityAdultPrice -
                                        detail?.activitydiscountedPrice
                                      )?.toFixed(2)
                                    : (
                                        detail?.activityAdultPrice -
                                        detail?.activitydiscountedPrice
                                      )?.toFixed(2)}
                                </span>
                              </div>
                            ) : (
                              <div>
                                <span className="rupActIcon">
                                  {detail?.currency?.symbol}
                                </span>
                                <span className="rupActText">
                                  {detail?.participentType?.map((ele, ind) => {
                                    // console.log("kkkhd", ele);
                                    if (ele.pertype === "Adult") {
                                      return ele.price;
                                    }
                                  })}
                                </span>
                              </div>
                            )}
                          </div>
                          <span className="perSpan">per person</span>
                        </div>
                      </div>
                      {/* <p className="reserveText">
                        <i className="fa-regular fa-calendar" /> Reserve now &amp; pay later to book your spot and pay
                        nothing today
                      </p> */}
                    </div>
                  </div>
                  <p className="giftText" onClick={handleClick}>
                    <i className="fa-solid fa-gift" /> Give this as a gift
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {modal && <SharedGroupModal closemodal={setModal} />}
      {modalA && (
        <GiftCardModal
          closeModal={setModalA}
          detail={detail}
          activityId={id}
          slug={slug}
        />
      )}
    </>
  );
};

export default AboutActivity;
