import React, { useState } from "react";
import logo from "../../assets/Images/Thingstodooo LOGO.png";
import { toast } from "react-hot-toast";
import requestData from "../../utils/HttpClient"
import ActivityService from "../../Service/ActivityService";
function CustReviewModal({ id, closeModal }) {
  const [organization, setorganization] = useState(0);
  const [money, setMoney] = useState(0);
  const [stars, setStars] = useState(0);
  const [service, setService] = useState(0);
  const [review, setReview] = useState("");

  const handleReviewSubmit = async () => {
    if (organization===0 || money===0 || stars===0 || service===0) {
      toast.error("Please add a rating!");
      return;
    }
    const sendData = {
      activityDetailsId: id,
      review: review,
      guide: stars,
      valueForMoney: money,
      service: service,
      organization: organization,
      date: new Date(),
    };

    let response =await ActivityService.addReviewRating(sendData);
    if(response && response.status){
         toast.success('Review submitted successfully');
         closeModal();
    }else{
      toast.error(response?.message);
    }
  };

  return (
    <section className="addReviewModalSection">
      <div className="addReviewInnerDiv">
        <button className="addRevClsBtn">
          <i class="fa-solid fa-xmark" onClick={() => closeModal()}></i>
        </button>
        <figure className="revCustModalLogo">
          <img src={logo} alt="..." />
        </figure>
        <p className="revCustAddCom">Add a review</p>
        <div className="revCstStarDiv" style={{cursor:'pointer'}}>
          {" "}
          <span>Guide </span>
          <i
            class={`${stars < 1 ? "fa-regular fa-star" : "fa fa-star"}`}
            style={{ color: `${stars >= 1 ? "orange" : ""}` }}
            onClick={() => setStars(1)}
          ></i>
          <i
            class={`${stars < 2 ? "fa-regular fa-star" : "fa fa-star"}`}
            style={{ color: `${stars >= 2 ? "orange" : ""}` }}
            onClick={() => setStars(2)}
          ></i>
          <i
            class={`${stars < 3 ? "fa-regular fa-star" : "fa fa-star"}`}
            style={{ color: `${stars >= 3 ? "orange" : ""}` }}
            onClick={() => setStars(3)}
          ></i>
          <i
            class={`${stars < 4 ? "fa-regular fa-star" : "fa fa-star"}`}
            style={{ color: `${stars >= 4 ? "orange" : ""}` }}
            onClick={() => setStars(4)}
          ></i>
          <i
            class={`${stars < 5 ? "fa-regular fa-star" : "fa fa-star"}`}
            style={{ color: `${stars >= 5 ? "orange" : ""}` }}
            onClick={() => setStars(5)}
          ></i>
        </div>
        <div className="revCstStarDiv" style={{cursor:'pointer'}}>
          {" "}
          <span>Organization </span>
          <i
            class={`${organization < 1 ? "fa-regular fa-star" : "fa fa-star"}`}
            style={{ color: `${organization >= 1 ? "orange" : ""}` }}
            onClick={() => setorganization(1)}
          ></i>
          <i
            class={`${organization < 2 ? "fa-regular fa-star" : "fa fa-star"}`}
            style={{ color: `${organization >= 2 ? "orange" : ""}` }}
            onClick={() => setorganization(2)}
          ></i>
          <i
            class={`${organization < 3 ? "fa-regular fa-star" : "fa fa-star"}`}
            style={{ color: `${organization >= 3 ? "orange" : ""}` }}
            onClick={() => setorganization(3)}
          ></i>
          <i
            class={`${organization < 4 ? "fa-regular fa-star" : "fa fa-star"}`}
            style={{ color: `${organization >= 4 ? "orange" : ""}` }}
            onClick={() => setorganization(4)}
          ></i>
          <i
            class={`${organization < 5 ? "fa-regular fa-star" : "fa fa-star"}`}
            style={{ color: `${organization >= 5 ? "orange" : ""}` }}
            onClick={() => setorganization(5)}
          ></i>
        </div>
        <div className="revCstStarDiv" style={{cursor:'pointer'}}>
          {" "}
          <span>Value for Money </span>
          <i
            class={`${money < 1 ? "fa-regular fa-star" : "fa fa-star"}`}
            style={{ color: `${money >= 1 ? "orange" : ""}` }}
            onClick={() => setMoney(1)}
          ></i>
          <i
            class={`${money < 2 ? "fa-regular fa-star" : "fa fa-star"}`}
            style={{ color: `${money >= 2 ? "orange" : ""}` }}
            onClick={() => setMoney(2)}
          ></i>
          <i
            class={`${money < 3 ? "fa-regular fa-star" : "fa fa-star"}`}
            style={{ color: `${money >= 3 ? "orange" : ""}` }}
            onClick={() => setMoney(3)}
          ></i>
          <i
            class={`${money < 4 ? "fa-regular fa-star" : "fa fa-star"}`}
            style={{ color: `${money >= 4 ? "orange" : ""}` }}
            onClick={() => setMoney(4)}
          ></i>
          <i
            class={`${money < 5 ? "fa-regular fa-star" : "fa fa-star"}`}
            style={{ color: `${money >= 5 ? "orange" : ""}` }}
            onClick={() => setMoney(5)}
          ></i>
        </div>
        <div className="revCstStarDiv" style={{cursor:'pointer'}}>
          {" "}
          <span>Service </span>
          <i
            class={`${service < 1 ? "fa-regular fa-star" : "fa fa-star"}`}
            style={{ color: `${service >= 1 ? "orange" : ""}` }}
            onClick={() => setService(1)}
          ></i>
          <i
            class={`${service < 2 ? "fa-regular fa-star" : "fa fa-star"}`}
            style={{ color: `${service >= 2 ? "orange" : ""}` }}
            onClick={() => setService(2)}
          ></i>
          <i
            class={`${service < 3 ? "fa-regular fa-star" : "fa fa-star"}`}
            style={{ color: `${service >= 3 ? "orange" : ""}` }}
            onClick={() => setService(3)}
          ></i>
          <i
            class={`${service < 4 ? "fa-regular fa-star" : "fa fa-star"}`}
            style={{ color: `${service >= 4 ? "orange" : ""}` }}
            onClick={() => setService(4)}
          ></i>
          <i
            class={`${service < 5 ? "fa-regular fa-star" : "fa fa-star"}`}
            style={{ color: `${service >= 5 ? "orange" : ""}` }}
            onClick={() => setService(5)}
          ></i>
        </div>
        <textarea
          name=""
          id=""
          cols=""
          rows="3"
          onChange={(e) => setReview(e.target.value)}
          placeholder="write here about your opinion?"
          className="revCstTextAr"
        ></textarea>
        <button className="rstSendBtn" onClick={handleReviewSubmit}>Submit</button>
      </div>
    </section>
  );
}

export default CustReviewModal;
