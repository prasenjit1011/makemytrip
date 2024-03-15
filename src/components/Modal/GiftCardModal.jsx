import React, { useState, useEffect } from "react";
import giftPic1 from "../../assets/Images/giftPic1.png";
import giftPic2 from "../../assets/Images/giftPic2.png";
import giftPic3 from "../../assets/Images/giftPic3.png";
import giftPartyPic from "../../assets/Images/giftPartyPic.png";
import giftBoxPic from "../../assets/Images/giftBoxPic.png";
import giftHeartPic from "../../assets/Images/giftHeartPic.png";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import ActivityService from "../../Service/ActivityService";
import { toast } from "react-hot-toast";
import { useCartContext } from "../../Context/CartProvider";
import { useAuth } from "../../Context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import MainLoader from "../Loaders/MainLoader";
import HomeService from "../../Service/HomeService";
import { giftCardQuestion } from "../../API_HELPERS/apiHelpers";
import { ipaddress } from "../../utils/HttpClient";

function GiftCardModal(props) {
  const { closeModal, activityId, detail, slug } = props;

  const wheretogolink = `${ipaddress}/activity/${activityId}/${slug}`;

  console.log("hjhhjkh", wheretogolink);
  const { fetchCartData } = useCartContext();
  const { loginStatus } = useAuth();
  const navigate = useNavigate();
  const initGiftData = {
    ammount: "",
    msg: "",
    suggetsActivity: "yes",
  };
  const [giftData, setGiftData] = useState(initGiftData);
  const [isLoading, setIsLoading] = useState(false);
  const [isCustomInput, setIsCustomInput] = useState(true);
  const [fetchedGiftoffer, setfetchgiftoffer] = useState([]);
  const [giftQuestions, setgiftQuestions] = useState([]);

  console.log("giftDataDF", giftData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGiftData({ ...giftData, [name]: value });
  };

  const handleAddGift = async () => {
    // if (!loginStatus) return toast.error('Login to add activity into cart');
    if (!giftData.ammount) return toast.error("Amount is required");

    // if (!giftData.msg) {
    //   toast.error("Message is required");
    //   return;
    // }

    const sendData =
      giftData.suggetsActivity === "yes"
        ? {
            personalMsg: giftData.msg,
            // activityId: giftData.suggetsActivity === "yes" ? activityId : "",
            activityId: activityId,
            amount: giftData.ammount,
            giftApplyLink: wheretogolink,
          }
        : {
            personalMsg: giftData.msg,
            amount: giftData.ammount,
            giftApplyLink: wheretogolink,
          };

    // console.log("sendDataAs", sendData)
    setIsLoading(true);
    const res = await ActivityService.addGiftCard(sendData);
    console.log("resActivity", res);
    if (res && res?.status) {
      fetchCartData();
      setGiftData(initGiftData);
      closeModal(false);
      toast.success("Gift Card added successfully");
      setIsLoading(false);
      navigate("/add-to-cart");
    } else {
      toast.error(res?.message);
    }
  };

  const getvalue = async () => {
    const res = await HomeService.getAllGiftValue();
    if (res && res.data) {
      console.log(res.data);
      setfetchgiftoffer(res.data);
    }
    console.log(res);
  };

  const fetchAllQuestion = async () => {
    const res = await giftCardQuestion();
    if (res && res.data) {
      console.log(res.data);
      setgiftQuestions(res.data);
    }
  };

  useEffect(() => {
    // alert(wheretogolink)
    fetchAllQuestion();
    getvalue();
  }, []);

  return (
    <>
      <MainLoader isLoading={isLoading} />
      <section className="giftCardModalSection">
        <div className="subGiftCardParent">
          <div className="giftHeadPageDiv">
            <p className="thingHead">Things To Dooo gift card</p>
            <p className="giveTheText">
              Give the ones you love unforgettable travel experiences and make
              memories to last a lifetime.
            </p>

            <button className="closeIcon" onClick={() => closeModal(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="giveMainBody">
            <div className="giveLabDiv giveChooseDiv">
              <label htmlFor="" className="giveMLabel giveMFirstLabel">
                Choose the value of the gift card:
              </label>
              {/* <div className="giftAmmount">
                <select
                  className="giftModalSelect form-select"
                  onChange={(e) => {
                    const price = e.target.value;
                    if (price === "custom") {
                      setIsCustomInput(true);
                    } else {
                      setGiftData((prev) => {
                        return { ...prev, ammount: e.target.value };
                      });
                      setIsCustomInput(false);
                    }
                  }}
                >
                  <option value="custom">Custom Ammount</option>
                  <option value="2500">2500</option>
                  <option value="7500">7500</option>
                  <option value="10000">10000</option>
                </select>
                {isCustomInput && (
                  <input
                    type="number"
                    placeholder="Custom amount..."
                    className="giveMInp giveM1stInp"
                    name="ammount"
                    value={giftData.ammount}
                    onChange={(e) => handleChange(e)}
                  />
                )}
              </div> */}
              <div className="giftAmmount">
                <select
                  className="giftModalSelect form-select"
                  onChange={(e) => {
                    const price = e.target.value;
                    if (price === "custom") {
                      setIsCustomInput(true);
                    } else {
                      setGiftData((prev) => {
                        return { ...prev, ammount: e.target.value };
                      });
                      setIsCustomInput(false);
                    }
                  }}
                >
                  <option value="custom">Custom Amount</option>
                  {fetchedGiftoffer.map((ele) => {
                    return <option value={ele?.price}>{ele?.price}</option>;
                  })}
                  {/* <option value="2500">2500</option>
                  <option value="7500">7500</option>
                  <option value="10000">10000</option> */}
                </select>
                {isCustomInput && (
                  <input
                    type="number"
                    placeholder="Custom amount..."
                    className="giveMInp giveM1stInp"
                    name="ammount"
                    value={giftData.ammount}
                    onChange={(e) => handleChange(e)}
                  />
                )}
              </div>
            </div>
            <div className="giveLabDiv">
              <label htmlFor="" className="giveMLabel giveMSecondLabel">
                Add a personal message:
              </label>
              <textarea
                id=""
                cols=""
                rows="4"
                className="giveMInp giveMTextarea"
                name="msg"
                value={giftData.msg}
                onChange={(e) => handleChange(e)}
                placeholder="Message..."
              />
            </div>
          </div>
          <div className="giftGallery">
            <div className="giftSubFigDiv">
              <figure className="giftFig1">
                <img src={detail?.image[0]} alt="" />
              </figure>
            </div>
            <div className="giftSubFigDiv">
              <figure className="giftFig2">
                <img src={detail?.image[1]} alt="" />
              </figure>
              <figure className="giftFig2">
                <img src={detail?.image[2]} alt="" />
              </figure>
            </div>
          </div>
          <div className="formTextDiv">
            <p className="formParisHead">{detail?.activityTitle}</p>
            <p className="enjoySmallText">
              {/* Enjoy convenient skip-the-line entry to the Palace of Versailles with a half-day tour with round trip
              transportation from Paris. Take a guided tour of the exquisite rooms and galleries. */}
              {detail?.description}
            </p>
          </div>
          <div className="sugRadioDiv">
            <p className="suggText">
              Suggest this activity on the gift certificate.
            </p>
            <div className="suggRadioDiv">
              <div className="yesRadDiv">
                <input
                  type="radio"
                  id="test1"
                  className="radioSuggInp"
                  checked={giftData.suggetsActivity === "yes" ? true : false}
                  name="suggetsActivity"
                  value="yes"
                  onChange={(e) => handleChange(e)}
                />
                <label for="test1">Yes</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="test2"
                  className="radioSuggInp"
                  checked={giftData.suggetsActivity === "no" ? true : false}
                  name="suggetsActivity"
                  value="no"
                  onChange={(e) => handleChange(e)}
                />
                <label for="test2">No</label>
              </div>
            </div>
          </div>
          {/* Add Button */}
          <div className="addTOCartDivBtn">
            <button className="addTOCartBtn" onClick={() => handleAddGift()}>
              Add to cart
            </button>
          </div>
          <div className="unforGotDiv">
            <p className="unforHead">Unforgettable gifts made easy</p>
            <div className="unforCardMainDiv">
              <div className="unforCard">
                <figure className="giftUnforFig">
                  <img src={giftPartyPic} alt="" />
                </figure>
                <p className="giftUnforSmallHead">Instant gifting</p>
                <p className="giftSortText">
                  Buy in advance or in-the-moment; your gift card is available
                  immediately after purchase. Give it through email, mail, or
                  wrapped up with a bow.
                </p>
              </div>
              <div className="unforCard">
                <figure className="giftUnforFig">
                  <img src={giftBoxPic} alt="" />
                </figure>
                <p className="giftUnforSmallHead">Flexible selection</p>
                <p className="giftSortText">
                  There aren't restrictions on where you can spend your gift
                  card. Choose from over 60,000 tours, activities, and
                  attractions in over 3,600 global destinations.
                </p>
              </div>
              <div className="unforCard">
                <figure className="giftUnforFig">
                  <img src={giftHeartPic} alt="" />
                </figure>
                <p className="giftUnforSmallHead">Unforgettable experiences</p>
                <p className="giftSortText">
                  Unlock the best that the world has to offer. Tickets, top
                  sites, one-of-a-kind local tours; discover something
                  unexpected with us.
                </p>
              </div>
            </div>
          </div>
          <div className="gotAccroniumDiv">
            <p className="unforHead">Got a question?</p>
            <div className="accordianDiv">
              <Accordion>
                {giftQuestions.map((ele, id) => {
                  return (
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          {ele.question}
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p className="accordHidePara">{ele.answer}</p>
                      </AccordionItemPanel>
                    </AccordionItem>
                  );
                })}

                {/* <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      Do I need to choose a specific experience?
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p className="accordHidePara">
                      Nope! Just select an amount and let the giftee pick their
                      perfect experience.
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      When do the gift cards expire?
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p className="accordHidePara">
                      Nope! Just select an amount and let the giftee pick their
                      perfect experience.
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      Which amounts can I choose from?
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p className="accordHidePara">
                      Nope! Just select an amount and let the giftee pick their
                      perfect experience.
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      Can I send a physical gift card?
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p className="accordHidePara">
                      Nope! Just select an amount and let the giftee pick their
                      perfect experience.
                    </p>
                  </AccordionItemPanel>
                </AccordionItem> */}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default GiftCardModal;
