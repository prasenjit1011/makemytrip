import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import aa from "../../assets/Images/bookingPicOne.png";
import bb from "../../assets/Images/bookingPicTwo.png";
import cc from "../../assets/Images/bookingPicOne.png";
import dd from "../../assets/Images/bookingPicTwo.png";
import {
  deleteBooking,
  getAllBookings,
  getAllGiftCards,
  getCompletedBookings,
  getUpcomingBookings,
  viewBookingTicket,
} from "../../API_HELPERS/apiHelpers";
import MainLoader from "../../components/Loaders/MainLoader";
import { toast } from "react-hot-toast";
import RateModalWrapper from "../../components/Modal/RateModalWrapper";
import { FiGift } from "react-icons/fi";
import noResult from "../../assets/noResult.png";
import { useAuth } from "../../Context/AuthContextProvider";
import moment from "moment";
import giftAni from "../../assets/Images/giftboxAnim.gif";
import SendGiftModal from "../GiftcardPage/SendGiftModal";

function Index() {
  const { fetchedActivityTypes } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [giftCardData, setGiftCardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [tab, setTab] = useState(1);
  const navigate = useNavigate();

  console.log("bookingsDDa", bookings);

  const CopyToClipboard = (text) => {
    toast.success("Copied");

    const tempInput = document.createElement("input");
    tempInput.value = text;

    document.body.appendChild(tempInput);

    tempInput.select();

    document.execCommand("copy");

    document.body.removeChild(tempInput);

    // toast.success("Copied");
  };

  const fetchUpcomingBookings = async () => {
    try {
      setIsLoading(true);
      const res = await getUpcomingBookings();
      if (res && res?.status) {
        setBookings(res?.data);
        setTab(1);
      } else {
        console.log("Error fetching upcomingBookings", res);
        setBookings([]);
      }
    } catch (error) {
      console.log("Error fetching upcomingBookings", error);
      setBookings([]);
    }
    setIsLoading(false);
  };

  const fetchCompletedBookings = async () => {
    try {
      setIsLoading(true);
      const res = await getCompletedBookings();
      if (res && res?.status) {
        setBookings(res?.data);

        setTab(2);
      } else {
        console.log("Error fetching CompletedBookings", res);
        setBookings([]);
      }
    } catch (error) {
      console.log("Error fetching CompletedBookings", error);
      setBookings([]);
    }
    setIsLoading(false);
  };

  const fetchPurchasedGiftCards = async () => {
    try {
      setIsLoading(true);
      const res = await getAllGiftCards();
      if (res && res?.status) {
        setGiftCardData(res?.data);
        setTab(3);
      } else {
        console.log("Error fetching GiftCards", res);
        setGiftCardData([]);
      }
    } catch (error) {
      console.log("Error fetching GiftCards", error);
      setGiftCardData([]);
    }
    setIsLoading(false);
  };
  const cancelBookingHandler = async (id) => {
    try {
      setIsLoading(true);
      const res = await deleteBooking(id);
      if (res && res?.status) {
        fetchUpcomingBookings();
        toast.success(res?.message || "Booking is Cancelled");
      } else {
        console.log("Error fetching GiftCards", res);
        toast.error(res?.message);
      }
    } catch (error) {
      console.log("Error fetching GiftCards", error);
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUpcomingBookings();
  }, []);

  const tickethandler = async (e, item) => {
    e.preventDefault();
    console.log("itemResss", item);
    try {
      setIsLoading(true);
      const res = await viewBookingTicket(
        item?.orderId,
        item?.activityDetailsId
      );
      if (res && res?.status) {
        window.open(res?.data, "_blank");
        // window.location.assign(res?.data);
      } else {
        toast.error(res?.message || "Error fetching ticket");
      }
    } catch (error) {
      toast.error(error?.message || "Error fetching ticket");
    }
    setIsLoading(false);
  };
  console.log("bookings", bookings);
  return (
    <>
      <MainLoader isLoading={isLoading} />

      <section className="bookingSection">
        <div className="custContain">
          <div className="row">
            <div className="col bookHead">
              <p>Bookings</p>
            </div>
          </div>
          <div className="row tabingParentRow">
            <div className="col-xl-6 col-lg-7 col-md-9 col-10 tabingParent">
              <ul className="nav nav-tabs myOwnTabs" role="tablist">
                <li className="nav-item bookNavItem">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#tabs-1"
                    role="tab"
                    onClick={(e) => {
                      e.preventDefault();
                      fetchUpcomingBookings();
                    }}
                  >
                    Upcoming
                  </a>
                </li>

                <li className="nav-item bookNavItem">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#tabs-2"
                    role="tab"
                    onClick={(e) => {
                      e.preventDefault();
                      fetchCompletedBookings();
                    }}
                  >
                    Completed
                  </a>
                </li>
                <li className="nav-item bookNavItem">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#tabs-3"
                    role="tab"
                    onClick={(e) => {
                      e.preventDefault();
                      fetchPurchasedGiftCards();
                    }}
                  >
                    Gift Cards
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="tab-content">
            <div className="tab-pane active" id={`tabs-${tab}`} role="tabpanel">
              {tab !== 3 &&
                bookings?.length > 0 &&
                bookings?.reverse()?.map((item, i) => {
                  return (
                    <div
                      className="card myBookingCard myBookingCard1"
                      key={i}
                      style={
                        item?.bookingStatus === "cancelled"
                          ? { backgroundColor: "#fff5f5" }
                          : {}
                      }
                    >
                      <div className="cardRow">
                        <div className="cartImgPart">
                          <figure className="cartImgFig">
                            {item?.bookingType === "activity" ? (
                              <img
                                src={item?.activityImage}
                                alt="..."
                                className="img-fluid"
                                style={{
                                  borderTopLeftRadius: "5px",
                                  borderBottomLeftRadius: "5px",
                                }}
                              />
                            ) : (
                              <span
                                className="mr-3"
                                style={{ fontSize: "120px" }}
                              >
                                <FiGift />
                              </span>
                            )}
                          </figure>
                        </div>
                        {/* <div className="bookingImgPart">
                          {item?.bookingType === 'activity' ? (
                            <img
                              src={item?.activityImage}
                              alt="..."
                              className="img-fluid"
                              style={{
                                borderTopLeftRadius: '5px',
                                borderBottomLeftRadius: '5px',
                              }}
                            />
                          ) : (
                            <span className="mr-3" style={{ fontSize: '120px' }}>
                              <FiGift />
                            </span>
                          )}
                        </div> */}

                        <div className="bookingTextPart">
                          <div className="card-body myBookBody">
                            <div>
                              <p className="edinText">{item?.activityName}</p>
                              {item?.bookingType === "activity" && (
                                <div className="edinAfterText">
                                  <p className="edinParagraph">
                                    <span>Booking Date :&nbsp; </span>
                                    {moment(item?.bookingDate).format(
                                      "DD MMMM YYYY"
                                    )}
                                  </p>
                                  <p className="edinParagraph">
                                    <span>Total Members :</span>
                                    {item?.participentType?.reduce(
                                      (sum, ele) => {
                                        return sum + ele.person;
                                      },
                                      0
                                    ) || 0}
                                  </p>
                                </div>
                              )}
                              <p className="edinParagraph">
                                <span>Booking Status :</span>&nbsp;
                                <span
                                  style={
                                    item?.bookingStatus === "completed" ||
                                    item?.bookingStatus === "confirmed"
                                      ? { color: "green", fontWeight: "600" }
                                      : { color: "red", fontWeight: "600" }
                                  }
                                >
                                  {item?.bookingStatus?.toUpperCase()}
                                </span>
                              </p>
                              <p className="edinParagraph">
                                <span>
                                  Booking Reference Id: {item?.alpfaNueID}
                                </span>
                              </p>
                            </div>
                            <div className="tpAftPart">
                              <div>
                                <p className="totalPriceText">Total Price</p>
                              </div>
                              <div>
                                <p className="usDollarText">
                                  {item?.currency?.symbol}{" "}
                                  {/* {item?.participentType
                                    ?.reduce((acc, item) => {
                                      return acc + item?.perPerson * item?.person;
                                    }, 0)
                                    .toFixed(2) || 0} */}
                                  {/* {item?.participentType?.reduce((sum, individualItem) => {
                                                  return sum + individualItem.perPerson;
                                              }, 0)
                                     || 0} */}
                                  {/* {item?.participentType?.reduce((sum, ele) => {
                                    return sum + ele.person * ele.perPerson;
                                  }, 0) || 0} */}
                                  {item?.amount?.toFixed(2)}
                                  {/* perPerson */}
                                </p>
                                <p className="afterUsDol">
                                  All taxes and fees included
                                </p>
                              </div>
                            </div>
                            <div className="viewRateBtns">
                              {item?.bookingType === "activity" &&
                                (item?.bookingStatus === "completed" ||
                                  item?.bookingStatus === "confirmed") && (
                                  <button
                                    className="edinParagraph showRestBtn"
                                    onClick={(e) => tickethandler(e, item)}
                                  >
                                    View Ticket
                                  </button>
                                )}
                              {tab === 1 &&
                                item?.bookingStatus === "confirmed" && (
                                  <div className="rateBtnDiv">
                                    <button
                                      className="edinParagraph restFilterBtn"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        cancelBookingHandler(item?._id);
                                      }}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                )}
                              {tab === 2 && (
                                <div className="rateBtnDiv">
                                  <div className="feedBackParent"></div>

                                  {item?.bookingType === "activity" &&
                                    item?.bookingStatus !== "cancelled" && (
                                      <RateModalWrapper
                                        activityDetailsId={
                                          item?.activityDetailsId
                                        }
                                      />
                                    )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {tab !== 3 && bookings?.length === 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={noResult}
                    alt=""
                    height="100px"
                    width="100px"
                    className="fade-in"
                  />
                  <p
                    className="tracking-in-expand mb-0"
                    style={{
                      textAlign: "center",
                      color: "#f95d12",
                      padding: "10px",
                      fontSize: "25px",
                    }}
                  >
                    No Bookings Found
                  </p>{" "}
                  <button
                    className="mb-3 mt-0 btn  text-light edinParagraph"
                    style={{ background: "#f95d12", fontWeight: "700" }}
                    onClick={() => {
                      navigate(
                        `/?lan=eng&currentTab=${fetchedActivityTypes?.[0]?._id}`
                      );
                    }}
                  >
                    Start Booking
                  </button>
                </div>
              )}
              {tab === 3 && giftCardData?.length === 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={noResult}
                    alt=""
                    height="100px"
                    width="100px"
                    className="fade-in"
                  />
                  <p
                    className="tracking-in-expand mb-0"
                    style={{
                      textAlign: "center",
                      color: "#f95d12",
                      padding: "10px",
                      fontSize: "25px",
                    }}
                  >
                    No gifts card found
                  </p>{" "}
                  <button
                    className="mb-3 mt-0 btn  text-light edinParagraph"
                    style={{ background: "#f95d12", fontWeight: "700" }}
                    onClick={() => {
                      navigate(
                        `/?lan=eng&currentTab=${fetchedActivityTypes?.[0]?._id}`
                      );
                    }}
                  >
                    Start Booking
                  </button>
                </div>
              )}
              {tab === 3 &&
                giftCardData?.length > 0 &&
                giftCardData?.reverse()?.map((item, i) => {
                  return (
                    <div
                      className="card myBookingCard myBookingCard1"
                      key={i}
                      style={
                        item?.sendToMail ? { backgroundColor: "#fff5f5" } : {}
                      }
                    >
                      <div className="cardRow">
                        <div className="cartImgPart">
                          <figure className="cartImgFig">
                            <img alt="" src={giftAni} />
                          </figure>
                        </div>

                        <div className="bookingTextPart">
                          <div className="card-body myBookBody">
                            <div>
                              <p className="edinText">
                                Gift Code : {item?.giftCode}{" "}
                                <span
                                  style={{
                                    cursor: "pointer",
                                    color: "#f95d12",
                                  }}
                                  onClick={() => {
                                    CopyToClipboard(item?.giftCode);
                                    navigator.clipboard
                                      .writeText(item?.giftCode)
                                      .then(() => {
                                        // <i className="fa-solid fa-check" style={{ color: '#10d11d' }} />;
                                      });
                                  }}
                                >
                                  <i className="fa-regular fa-clipboard"></i>
                                </span>{" "}
                              </p>

                              <div className="edinAfterText">
                                <p className="edinParagraph">
                                  <span>Purchased On :&nbsp; </span>
                                  {moment(item?.createdOn).format(
                                    "DD MMMM YYYY"
                                  )}
                                </p>
                                {/* <p className="edinParagraph">
                                  <span>Expiration Date :&nbsp;</span>
                                 

                                  {moment(item?.expirationDate).format(
                                    "DD MMMM YYYY, hh:mm:ss A"
                                  )}
                                </p> */}
                              </div>

                              {/* <p className="edinParagraph">
                                <span>Reedemed Status :</span>&nbsp; {item?.isRedeemed ? 'YES' : 'NO'}
                              </p> */}
                              {item?.sendToMail && (
                                <p className="edinParagraph text-danger">
                                  <span>Sent To :</span>&nbsp;{" "}
                                  {item?.receiverEmail}
                                </p>
                              )}
                              {item?.activity && (
                                <p className="edinParagraph">
                                  <span>Suggested Activity :</span>&nbsp;{" "}
                                  {item?.activity?.activityTitle}
                                </p>
                              )}
                            </div>
                            <div className="tpAftPart">
                              <div>
                                <p className="totalPriceText">Total Price</p>
                              </div>
                              <div>
                                <p className="usDollarText">
                                  {item?.activity?.currency?.symbol || "£"}{" "}
                                  {item?.amount}
                                </p>
                                <p className="afterUsDol">
                                  All taxes and fees included
                                </p>
                              </div>
                            </div>
                            {/* <div className="viewRateBtns">
                              <button className="edinParagraph showRestBtn">Send</button>
                            </div> */}

                            {!item?.sendToMail && (
                              <SendGiftModal
                                item={item}
                                fetchPurchasedGiftCards={
                                  fetchPurchasedGiftCards
                                }
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              {/* <div className="card myBookingCard myBookingCard2">
                <div className="row">
                  <div className="col-md-4 bookingImgPart">
                    <img src={bb} alt="..." className="img-fluid" />
                  </div>
                  <div className="col-xxl-6 col-xl-7 col-md-8 bookingTextPart">
                    <div className="card-body myBookBody">
                      <p className="edinText">Edinburgh: Harry Potter Magical Guided Walking Tour</p>
                      <div className="edinAfterText">
                        <p className="edinParagraph">
                          <span>Duration :</span>2 hours
                        </p>
                        <p className="edinParagraph">
                          <span>Member :</span>1 Adult
                        </p>
                        <p className="edinParagraph">
                          <span>Guide :</span>Italian
                        </p>
                      </div>
                      <div className="tpAftPart">
                        <div className="tpAftPartFirst">
                          <p className="totalPriceText">Total Price</p>
                          <p className="afterTotalPri">Completed</p>
                        </div>
                        <div>
                          <p className="usDollarText">US$ 42.93</p>
                          <p className="afterUsDol">All taxes and fees included</p>
                        </div>
                      </div>
                      <div className="feedBackParent">
                        <div className="startPartParent">
                          <i className="fa-regular fa-star" />
                          <i className="fa-regular fa-star" />
                          <i className="fa-regular fa-star" />
                          <i className="fa-regular fa-star" />
                          <i className="fa-regular fa-star" />
                        </div>
                        <div className="addFeedbackBtn">
                          <button>Add Your Feedback</button>
                        </div>
                      </div>
                      <div className="submitBtnParent">
                        <button>Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Index;
