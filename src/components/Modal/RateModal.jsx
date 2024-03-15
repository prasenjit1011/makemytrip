import React, { Fragment, useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import {
  checkReviewStatus,
  editUserReview,
  postReview,
} from "../../API_HELPERS/apiHelpers";
import useRatings from "../../Hooks/Ratings/useRatings";
import { useAuth } from "../../Context/AuthContextProvider";
import { toast } from "react-hot-toast";
import MainLoader from "../Loaders/MainLoader";

function RateModal({ activityDetailsId, setShowModal }) {
  const [editStatus, setEditStatus] = useState(false);
  const [editId, setEditId] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState("");
  const [flag, setflag] = useState(false);
  const [openModel, setopenModel] = useState(false);

  const { userData } = useAuth();

  const {
    ratingsComp: guideComp,
    finalRating: guideRating,
    // resetter: guideResetter,
    setFilledStarLength: guideSetFilledStarLength,
  } = useRatings();

  const {
    ratingsComp: serviceComp,
    finalRating: serviceRating,
    // resetter: serviceResetter,
    setFilledStarLength: serviceSetFilledStarLength,
  } = useRatings();

  const {
    ratingsComp: valueForMoneyComp,
    finalRating: valueForMoneyRating,
    // resetter: valueForMoneyResetter,
    setFilledStarLength: valueForMoneySetFilledStarLength,
  } = useRatings();

  const {
    ratingsComp: organizationComp,
    finalRating: organizationRating,
    // resetter: organizationResetter,
    setFilledStarLength: organizationSetFilledStarLength,
  } = useRatings();

  const validator = () => {
    if (review === "") {
      toast.error("Review is mandatory");
      return false;
    }

    return true;
  };
  const submitReview = async () => {
    if (!validator()) return;
    if (isLoading) return;

    try {
      setIsLoading(true);
      const data = {
        userId: userData?._id,
        activityDetailsId,
        review,
        guide: guideRating,
        valueForMoney: valueForMoneyRating,
        service: serviceRating,
        organization: organizationRating,
        date: new Date().toISOString(),
        time: new Date().toISOString(),
      };

      console.log("REVIEW DATA", data);
      let res;
      if (editStatus) {
        res = await editUserReview(data, editId);
      } else {
        res = await postReview(data);
      }
      if (res && res?.status) {
        // toast.success(res?.message || "Rating has been submitted successfully");
        toast.success("Rating has been submitted successfully");
        setShowModal(false);
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  const fetchReviewDetails = async () => {
    setIsLoading(true);
    try {
      const res = await checkReviewStatus({ id: activityDetailsId });
      if (res && res?.status) {
        setIsLoading(false);
        const data = res?.data[0];
        if (data?.review) {
          setflag(true);
        }
        setEditId(data?._id);
        setReview(data?.review);

        guideSetFilledStarLength(+data?.guide || 0);
        serviceSetFilledStarLength(+data?.service || 0);
        valueForMoneySetFilledStarLength(+data?.valueForMoney || 0);
        organizationSetFilledStarLength(+data?.organization || 0);
        setEditStatus(true);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (review) {
      toast.error("You have already rated this activity ");
    }
  }, [flag]);

  useEffect(() => {
    fetchReviewDetails();
  }, [activityDetailsId]);

  const model = (
    <>
      <MainLoader isLoading={isLoading} />
      <section className="filterNodalSection">
        <div className="subFilterModal">
          <div className="filCrossDiv">
            <p className="filterHead">Rate</p>
            <button className="closeFilter" onClick={() => setShowModal(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="acorFilterDiv">
            <Accordion>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>Guide</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div className="pl-3 ratAccorDiv">{guideComp}</div>
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>Organization</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div className="pl-3 ratAccorDiv">{organizationComp}</div>
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>Service</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div className="pl-3 ratAccorDiv">{serviceComp}</div>
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>Value For Money</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div className="pl-3 ratAccorDiv">{valueForMoneyComp}</div>
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>Review</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div className="pl-3">
                    <div className="mb-3">
                      {/* <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Example textarea
                </label> */}
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows={3}
                        value={review}
                        onChange={(e) => {
                          setReview(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="resetShowDiv">
            <button
              className="showRestBtn"
              onClick={(e) => {
                e.preventDefault();
                submitReview();
              }}
              style={{ display: flag ? "none" : "block" }}
            >
              Submit
            </button>
          </div>
        </div>
      </section>
    </>
  );

  if (openModel) {
    return (
      <>
        <MainLoader isLoading={isLoading} />
        <section className="filterNodalSection">
          <div className="subFilterModal">
            <div className="filCrossDiv">
              <p className="filterHead">Rate</p>
              <button
                className="closeFilter"
                onClick={() => setShowModal(false)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="acorFilterDiv">
              <Accordion>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>Guide</AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="pl-3 ratAccorDiv">{guideComp}</div>
                  </AccordionItemPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>Organization</AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="pl-3 ratAccorDiv">{organizationComp}</div>
                  </AccordionItemPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>Service</AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="pl-3 ratAccorDiv">{serviceComp}</div>
                  </AccordionItemPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>Value For Money</AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="pl-3 ratAccorDiv">{valueForMoneyComp}</div>
                  </AccordionItemPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>Review</AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="pl-3">
                      <div className="mb-3">
                        {/* <label
                          htmlFor="exampleFormControlTextarea1"
                          className="form-label"
                        >
                          Example textarea
                        </label> */}
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows={3}
                          value={review}
                          onChange={(e) => {
                            setReview(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="resetShowDiv">
              <button
                className="showRestBtn"
                onClick={(e) => {
                  e.preventDefault();
                  submitReview();
                }}
                style={{ display: flag ? "none" : "block" }}
              >
                Submit
              </button>
            </div>
          </div>
        </section>
      </>
    );
  } else {
    if (review) {
      (() => setShowModal(false))();
      // return (model)
    } else {
      return (
        <>
          <MainLoader isLoading={isLoading} />
          <section className="filterNodalSection">
            <div className="subFilterModal">
              <div className="filCrossDiv">
                {/* <p className="filterHead">Rate</p> */}
                <button
                  className="closeFilter"
                  onClick={() => setShowModal(false)}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="acorFilterDiv">
                <h3>Did you take part in this activity ?</h3>
              </div>
              <div
                className="resetShowDiv"
                style={{ display: "flex", gap: "0.8rem" }}
              >
                <button
                  className="showRestBtn"
                  onClick={() => {
                    setopenModel(true);
                  }}
                >
                  Yes
                </button>
                <button
                  className="showRestBtn"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </section>
        </>
      );
    }
  }
}

export default RateModal;
