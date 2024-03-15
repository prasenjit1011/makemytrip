import React, { useEffect, useState } from "react";
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
import HomeService from "../../Service/HomeService";
import { giftCardQuestion } from "../../API_HELPERS/apiHelpers";

function Gift() {
  const { fetchCartData } = useCartContext();
  console.log("hhhh", fetchCartData);
  const { loginStatus } = useAuth();
  const navigate = useNavigate();
  // const initGiftData = {
  //   ammount: "",
  //   msg: "",
  //   suggetsActivity: "yes",
  // };
  // const [giftData, setGiftData] = useState(initGiftData);
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

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setGiftData({ ...giftData, [name]: value });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGiftData({ ...giftData, [name]: value });
  };

  // const handleAddGift = async () => {
  //   // if (!loginStatus) return toast.error('Login to add activity into cart');
  //   if (!giftData.ammount) return toast.error("Amount is required");

  //   // if (!giftData.msg) {
  //   //   toast.error("Message is required");
  //   //   return;
  //   // }

  //   // const sendData = {
  //   //   personalMsg: giftData.msg,
  //   //   // activityId: activityId,
  //   //   amount: giftData.ammount,
  //   // };
  //   const sendData = {
  //     personalMsg: giftData.msg,
  //     amount: giftData.ammount,
  //   };
  //   console.log("sendDataAs", sendData);
  //   // return;
  //   setIsLoading(true);
  //   const res = await ActivityService.addGiftCard(sendData);
  //   console.log("resActivity", res);
  //   if (res && res?.status) {
  //     fetchCartData();
  //     setGiftData(initGiftData);
  //     toast.success(res?.message);
  //     setIsLoading(false);
  //     navigate("/add-to-cart");
  //   } else {
  //     toast.error(res?.message);
  //   }
  // };

  const handleAddGift = async () => {
    // if (!loginStatus) return toast.error('Login to add activity into cart');
    if (!giftData?.ammount) return toast.error("Amount is required");

    // if (!giftData.msg) {
    //   toast.error("Message is required");
    //   return;
    // }

    const sendData = {
      personalMsg: giftData.msg,
      amount: giftData.ammount,
      giftApplyLink:
        "http://34.201.127.230:2039/?lan=eng&currentTab=64d3a05d05edf815fbfb46a5",
    };

    // console.log("sendDataAs", sendData)
    setIsLoading(true);
    const res = await ActivityService.addGiftCard(sendData);
    console.log("resActivity", res);
    if (res && res?.status) {
      fetchCartData();
      setGiftData(initGiftData);

      toast.success("Gift Card added successfully");
      setIsLoading(false);
      navigate("/add-to-cart");
    } else {
      toast.error(res?.message);
    }
  };

  const fetchAllQuestion = async () => {
    const res = await giftCardQuestion();
    if (res && res.data) {
      console.log(res.data);
      setgiftQuestions(res.data);
    }
  };

  const getvalue = async () => {
    try {
      const res = await HomeService.getAllGiftValue();
      if (res && res?.data) {
        console.log(res?.data);
        setfetchgiftoffer(res?.data);
      }

      console.log(res);
    } catch (err) {
      console.log("errdatsh", err);
    }
  };

  useEffect(() => {
    getvalue();
    fetchAllQuestion();
  }, []);

  return (
    <>
      <section className="giftCardPageSection">
        <div className="subGiftCardPageParent">
          <div className="giftHeadDiv">
            <p className="thingHead">Things To Dooo gift card</p>
            <p className="giveTheText">
              Give the ones you love unforgettable travel experiences and make
              memories to last a lifetime.
            </p>
          </div>
          <div className="giveMainBody">
            <div className="giveLabDiv giveChooseDiv">
              <label htmlFor="" className="giveMLabel giveMFirstLabel">
                Choose the value of the gift card:
              </label>
              {/* <input
                type="number"
                placeholder="Custom amount..."
                className="giveMInp giveM1stInp"
                name="ammount"
                value={giftData.ammount}
                onChange={(e) => handleChange(e)}
              /> */}
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
                    return <option value={ele.price}>{ele.price}</option>;
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
                    value={giftData?.ammount}
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
                value={giftData?.msg}
                onChange={(e) => handleChange(e)}
                placeholder="Message..."
              />
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

export default Gift;
