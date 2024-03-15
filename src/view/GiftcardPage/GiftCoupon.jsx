import React, { useEffect, useState } from "react";
import giftAni from "../../assets/Images/giftboxAnim.gif";

import moment from "moment";
import SendGiftModal from "./SendGiftModal";
import toast from "react-hot-toast";
import { MyGiftcouponApi } from "../../API_HELPERS/apiHelpers";
import { getAllGiftCards } from "../../API_HELPERS/apiHelpers";
import MainLoader from "../../components/Loaders/MainLoader";
import noResult from "../../assets/girl404.gif";
function GiftCoupon() {
  const [isLoading, setIsLoading] = useState(false);
  const [giftCardData, setGiftCardData] = useState([]);
  const [tab, setTab] = useState(1);

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

  const fetchMyAllGiftCoupon = async () => {
    try {
      setIsLoading(true);
      const res = await MyGiftcouponApi();
      console.log("jjjjrrr", res);
      if (res && res?.status) {
        setGiftCardData(res?.data);
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

  useEffect(() => {
    fetchMyAllGiftCoupon();
  }, []);

  return (
    <>
      <MainLoader isLoading={isLoading} />
      {giftCardData?.length > 0 &&
        giftCardData?.reverse()?.map((item, i) => {
          console.log("jgdcgs", item);
          return (
            <div
              className="card myBookingCard myBookingCard1"
              key={i}
              // style={item?.sendToMail ? { backgroundColor: "#fff5f5" } : {}}
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

                      <div
                        className="edinAfterText"
                        style={{ flexDirection: "column" }}
                      >
                        <p className="edinParagraph">
                          <span>Gifted By :</span>&nbsp;
                          {`${item?.firstName} ${item?.lastName}`}
                        </p>
                        {/* <p className="edinParagraph">
                          <span>Expiration Date :&nbsp;</span>
                          {moment(item?.expirationDate).format("DD MMMM YYYY")}
                        </p> */}
                      </div>
                    </div>
                    <div className="tpAftPart">
                      <div>
                        <p className="totalPriceText">Remaining Price</p>
                      </div>
                      <div>
                        <p className="usDollarText">
                          {item?.activity?.currency?.symbol || "£"}{" "}
                          {item?.amount}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      {giftCardData.length <= 0 && (
        <div
          className="cartImgPart"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <figure className="cartImgFig">
            <img alt="" src={noResult} />
          </figure>
        </div>
      )}
    </>
  );
}

export default GiftCoupon;
