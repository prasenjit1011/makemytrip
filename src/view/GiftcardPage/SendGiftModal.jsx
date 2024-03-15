import React, { useState } from "react";
import MainLoader from "../../components/Loaders/MainLoader";
import { sendGiftCard } from "../../API_HELPERS/apiHelpers";
import { toast } from "react-hot-toast";

const SendGiftModal = ({ item, fetchPurchasedGiftCards }) => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log("uiyi,ite,", item);

  const sentGiftCardHandler = async () => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!email) return toast.error("Email is Required");
    else if (!emailRegex.test(email))
      return toast.error("Please Enter Valid Email");

    const Senddata = {
      email: email,
      cardId: item?._id,
      giftApplyLink: item?.giftApplyLink
        ? item?.giftApplyLink
        : "http://34.201.127.230:2039/?lan=eng&currentTab=64d3a05d05edf815fbfb46a5",
    };
    try {
      setIsLoading(true);
      const res = await sendGiftCard(Senddata);

      console.log("kkhtf", res);
      if (res && res?.status) {
        if (fetchPurchasedGiftCards) fetchPurchasedGiftCards();
        toast.success("Gift Sent Successfully");
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      <MainLoader isLoading={isLoading} />
      <div className="viewRateBtns">
        <button
          className="edinParagraph showRestBtn"
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
        >
          Send
        </button>
      </div>
      {showModal && (
        <div>
          <div id="myModal" className="send-gift-modal">
            <div className="send-gift-modal-content">
              <span
                className="send-gift-close"
                onClick={() => setShowModal(false)}
              >
                &times;
              </span>
              <p>Send Gift</p>
              <div className="form-group">
                <label for="inputEmail3" className="col-form-label">
                  Email
                </label>
                <div className="">
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-success"
                  onClick={(e) => {
                    e.preventDefault();
                    sentGiftCardHandler();
                  }}
                >
                  Send Gift
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SendGiftModal;
