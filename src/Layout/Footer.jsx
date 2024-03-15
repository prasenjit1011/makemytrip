import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";

import footerLogo from "../assets/Images/thingsToDoLogo.png";
import workwith1 from "../assets/Images/workWith1.png";
import workwith2 from "../assets/Images/workWith2.png";
import workwith3 from "../assets/Images/workWith3.png";
import workwith4 from "../assets/Images/workWith4.png";
import workwith5 from "../assets/Images/workWith5.png";
import workwith6 from "../assets/Images/workWith6.png";
import googlePlay from "../assets/Images/googlePlay.png";
import appleStore from "../assets/Images/appleStore.png";
import aaa from "../assets/Images/ellipseImg2.png";
import { Link } from "react-router-dom";
import HomeService from "../Service/HomeService";
import BecameAsupplierModel from "../components/Modal/BecameAsupplier";
import { useAuth } from "../Context/AuthContextProvider";
import toast from "react-hot-toast";

const Footer = () => {
  const [languageData, setLanguageData] = useState([]);
  const [selectLang, setSelectLang] = useState("English");
  const [currencyData, setCurrencyData] = useState([]);
  const [selectCurr, setSelectCurr] = useState("");

  const [modalA, setModalA] = useState(false);

  const { loginStatus, setShowLoginModal } = useAuth();

  console.log("objlamguageDataect", currencyData);
  console.log("loginstatusss", loginStatus);
  // language
  const getLanguages = async () => {
    const res = await HomeService.languages();
    if (res && res?.status) {
      setLanguageData(res?.data);
    } else {
    }
  };

  // currency
  const getCurrency = async () => {
    const res = await HomeService.getAllCurrency();
    console.log("resCurrency", res);
    if (res && res?.status) {
      setCurrencyData(res?.data);
    } else {
    }
  };

  useEffect(() => {
    getLanguages();
    getCurrency();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <div>
        <section className="footerParent">
          <div className="container-fluid .footerContainer">
            <div className="row footerPrevImg">
              <figure>
                <img src={aaa} alt="" className="img-fluid" />
              </figure>
            </div>
            <div className="row firstRowParent">
              <figure className="footerSecondFigure">
                <img src={footerLogo} alt="footerlogo" className="mb-3" />
              </figure>
            </div>
            {/* <div className="row secondRowParent">
            <div className="subColumnfirstPart col-lg-3 col-sm-6">
              <div>
                <div className="workWithUsPart">
                  <p className="subColHeadingPart">WORK WITH US</p>
                  <ul>
                    <li>
                      <a href="http://34.201.127.230:2060/registration" target="_blank" style={{ color: '#fff' }}>
                        Become a Supplier
                      </a>
                    </li>
                    <li>
                      <a href="http://34.201.127.230:2060/login" target="_blank" style={{ color: '#fff' }}>
                        Supplier Portal Login
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="workWithPart2">
                  <div className="workWithPart2Sub1">
                    <p className="subColHeadingPart">WORK WITH US</p>
                    <div>
                      <figure>
                        <img src={workwith1} alt="" />
                      </figure>
                      <figure>
                        <img src={workwith2} alt="" />
                      </figure>
                      <figure>
                        <img src={workwith3} alt="" />
                      </figure>
                    </div>
                    <div>
                      <figure>
                        <img src={workwith4} alt="" />
                      </figure>
                      <figure>
                        <img src={workwith5} alt="" />
                      </figure>
                      <figure>
                        <img src={workwith6} alt="" />
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="subColumnsecondPart col-lg-3 col-sm-6">
              <div className="companyPart">
                <p className="subColHeadingPart">COMPANY</p>
                <ul>
                  <li>
                    <Link to="/about-us" onClick={scrollToTop}>
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" onClick={scrollToTop}>
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/gift" onClick={scrollToTop}>
                      Gift Cards
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="subColumnThirdPart col-lg-3 col-sm-6">
              <div className="supportPart">
                <p className="subColHeadingPart">SUPPORT</p>
                <ul>
                  <li>
                    <Link to="/contact" onClick={scrollToTop}>
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link to="/legal" onClick={scrollToTop}>
                      Legal Notice
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy" onClick={scrollToTop}>
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/cookies" onClick={scrollToTop}>
                      Cookies and Marketing Preferences
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" onClick={scrollToTop}>
                      General Terms and Conditions
                    </Link>
                  </li>
                  <li>
                    <Link to="/information" onClick={scrollToTop}>
                      Information according to the Digital Services Act
                    </Link>
                  </li>
                  <li>
                    <Link to="/sitemap" onClick={scrollToTop}>
                      Sitemap
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="subColumnFourthPart col-lg-3 col-sm-6">
              <div className="mobilePart">
                <p className="subColHeadingPart">MOBILE</p>
                <div className="imgPart">
                  <figure className="mobilePartFirst">
                    <img src={googlePlay} alt="" />
                  </figure>
                  <figure className="mobilePartSecond">
                    <img src={appleStore} alt="" />
                  </figure>
                </div>
              </div>
            </div>
          </div>
          <div className="row thirdRowParent">
            <div className="subFooterPart col-md-11">
              <div className="footerTextPart">
                Copyright <span>Things to dooo -</span> 2023-2023 MADE IN DUBLIN IRELAND
              </div>
              <div className="footerIconPart">
                <div>
                  <i className="fa-brands fa-pinterest"></i>
                </div>
                <div>
                  <i className="fa-brands fa-linkedin"></i>
                </div>
                <div>
                  <i className="fa-brands fa-instagram"></i>
                </div>
                <div>
                  <i className="fa-brands fa-twitter"></i>
                </div>
                <div>
                  <i className="fa-brands fa-square-facebook"></i>
                </div>
              </div>
            </div>
          </div> */}
          </div>
          <div className="footerContain">
            <div className="footerFirstSecDiv">
              <div className="footerFirstDiv">
                {/* language */}
                <div className="mb-4">
                  <p className="footerHeads">Language</p>
                  <select
                    value={selectLang}
                    className="footerLiSelect"
                    onChange={(e) => setSelectLang(e.target.value)}
                  >
                    {languageData.map((item, i) => (
                      <option value={item?.name} key={i}>
                        {item?.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* currency */}
                <div>
                  <p className="footerHeads">Currency</p>
                  <select
                    className="footerLiSelect"
                    value={selectCurr}
                    onChange={(e) => setSelectCurr(e.target.value)}
                  >
                    {currencyData.map((item, i) => (
                      <option
                        value={
                          item?.name + " " + "(" + item?.symbol_native + ")"
                        }
                        key={i}
                      >
                        {item?.name + " " + "(" + item?.symbol_native + ")"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="footerSecondDiv">
                <p className="footerHeads">Mobile</p>
                <div className="mobFigDiv">
                  <figure className="mobFooterFig">
                    <img src={googlePlay} alt="" />
                  </figure>
                  <figure className="mobFooterFig">
                    <img src={appleStore} alt="" />
                  </figure>
                </div>
              </div>
            </div>
            <div className="footerThirdFourth">
              <div>
                <p className="footerHeads">Support</p>
                <ul>
                  <li className="footerThingsLi">
                    <Link to="/contact" className="footerThingsLiAn">
                      Contact
                    </Link>
                  </li>
                  <li className="footerThingsLi">
                    <Link to="/legal" className="footerThingsLiAn">
                      Legal Notice
                    </Link>
                  </li>
                  <li className="footerThingsLi">
                    <Link to="/privacy-policy" className="footerThingsLiAn">
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="footerThingsLi">
                    <Link to="/cookies" className="footerThingsLiAn">
                      Cookies and Marketing Preferences
                    </Link>
                  </li>
                  <li className="footerThingsLi">
                    <Link to="/terms" className="footerThingsLiAn">
                      General Terms and Conditions
                    </Link>
                  </li>
                  <li className="footerThingsLi">
                    <Link to="/information" className="footerThingsLiAn">
                      Information according to the Digital Services Act
                    </Link>
                  </li>
                  <li className="footerThingsLi">
                    <Link to="/sitemap" className="footerThingsLiAn">
                      Sitemap
                    </Link>
                  </li>
                  {/* <li className="footerThingsLi">
                  <Link to="/" className="footerThingsLiAn">
                    Do not Sell or Share my Personal Information
                  </Link>
                </li> */}
                </ul>
              </div>

              <div>
                <p className="footerHeads">Company</p>
                <ul>
                  <li className="footerThingsLi">
                    <Link to="/about-us" className="footerThingsLiAn">
                      About Us
                    </Link>
                  </li>
                  {/* <li className="footerThingsLi">
                  <Link to="/career" className="footerThingsLiAn">
                    Careers
                  </Link>
                </li> */}
                  <li className="footerThingsLi">
                    <Link to="/blog" className="footerThingsLiAn">
                      Blog
                    </Link>
                  </li>
                  <li className="footerThingsLi">
                    <Link to="/press" className="footerThingsLiAn">
                      Press
                    </Link>
                  </li>
                  <li className="footerThingsLi">
                    {loginStatus ? (
                      <Link to="/gift" className="footerThingsLiAn">
                        Gift Cards
                      </Link>
                    ) : (
                      <Link
                        onClick={() => {
                          toast.error("To Enter Gift Section Login first ");
                        }}
                        to="#"
                        className="footerThingsLiAn"
                      >
                        Gift Cards
                      </Link>
                    )}
                  </li>
                  {/* <li className="footerThingsLi">
                  <Link to="/magazine" className="footerThingsLiAn">
                    Magazine
                  </Link>
                </li> */}
                  {/* <li className="footerThingsLi">
                  <Link to="/travelguides" className="footerThingsLiAn">
                    Travel Guides
                  </Link>
                </li> */}
                </ul>
              </div>

              <div>
                <div>
                  <p className="footerHeads">Work With Us</p>
                  <ul>
                    <li className="footerThingsLi">
                      <a
                        href="http://34.201.127.230:2060/login"
                        target="_blank"
                        style={{ color: "#fff" }}
                        className="resFooterLiAn"
                      >
                        As a Supply Partner
                      </a>
                    </li>
                    <li className="footerThingsLi">
                      {/* <a
                        href="http://34.201.127.230:2060/registration"
                        target="_blank"
                        style={{ color: "#fff" }}
                      >
                        Become a Supplier
                      </a> */}
                      <p
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setModalA(true);
                        }}
                      >
                        {" "}
                        Become a Supplier
                      </p>
                    </li>
                    {/* <li className="footerThingsLi">
                    <Link to="/" className="footerThingsLiAn">
                      As a Content Creator
                    </Link>
                  </li> */}
                    {/* <li className="footerThingsLi">
                    <Link to="/" className="footerThingsLiAn">
                      As an Affiliate Partner
                    </Link>
                  </li> */}
                  </ul>
                </div>
                <div>
                  <p className="footerHeads">Ways You Can Pay</p>
                  <div className="firstWorkRow mb-1">
                    <figure className="footerliFig">
                      <img src={workwith1} alt="" />
                    </figure>
                    <figure className="footerliFig">
                      <img src={workwith2} alt="" />
                    </figure>
                    <figure className="footerliFig">
                      <img src={workwith3} alt="" />
                    </figure>
                  </div>
                  <div className="firstWorkRow">
                    <figure className="footerliFig">
                      <img src={workwith4} alt="" />
                    </figure>
                    <figure className="footerliFig">
                      <img src={workwith5} alt="" />
                    </figure>
                    <figure className="footerliFig">
                      <img src={workwith6} alt="" />
                    </figure>
                  </div>
                </div>
              </div>
            </div>

            <div className="responsiveFooterThirdFourth">
              <div>
                <Accordion>
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>Support</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <ul className="resFooterUl">
                        <li className="resFooterLi">
                          <Link
                            to="/contact"
                            className="resFooterLiAn"
                            style={{ color: "#fff" }}
                          >
                            Contact
                          </Link>
                        </li>
                        <li className="resFooterLi">
                          <Link
                            to="/legal"
                            className="resFooterLiAn"
                            style={{ color: "#fff" }}
                          >
                            Legal Notice
                          </Link>
                        </li>
                        <li className="resFooterLi">
                          <Link
                            to="/privacy-policy"
                            className="resFooterLiAn"
                            style={{ color: "#fff" }}
                          >
                            Privacy Policy
                          </Link>
                        </li>
                        <li className="resFooterLi">
                          <Link
                            to="/cookies"
                            className="resFooterLiAn"
                            style={{ color: "#fff" }}
                          >
                            Cookies and Marketing Preferences
                          </Link>
                        </li>
                        <li className="resFooterLi">
                          <Link
                            to="/terms"
                            className="resFooterLiAn"
                            style={{ color: "#fff" }}
                          >
                            General Terms and Conditions
                          </Link>
                        </li>
                        <li className="resFooterLi">
                          <Link
                            to="/information"
                            className="resFooterLiAn"
                            style={{ color: "#fff" }}
                          >
                            Information according to the Digital Services Act
                          </Link>
                        </li>
                        <li className="resFooterLi">
                          <Link
                            to="/sitemap"
                            className="resFooterLiAn"
                            style={{ color: "#fff" }}
                          >
                            Sitemap
                          </Link>
                        </li>
                        {/* <li className="resFooterLi">
                        <Link to="/" className="resFooterLiAn">
                          Do not Sell or Share my Personal Information
                        </Link>
                      </li> */}
                      </ul>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>Company</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <ul className="resFooterUl">
                        <li className="resFooterLi">
                          <Link
                            to="/about-us"
                            className="resFooterLiAn"
                            style={{ color: "#fff" }}
                          >
                            About Us
                          </Link>
                        </li>
                        {/* <li className="resFooterLi">
                        <Link to="/career" className="resFooterLiAn">
                          Careers
                        </Link>
                      </li> */}
                        <li className="resFooterLi">
                          <Link
                            to="/blog"
                            className="resFooterLiAn"
                            style={{ color: "#fff" }}
                          >
                            Blog
                          </Link>
                        </li>
                        {/* <li className="resFooterLi">
                        <Link to="/press" className="resFooterLiAn">
                          Press
                        </Link>
                      </li> */}
                        <li className="resFooterLi">
                          <Link
                            to="/gift"
                            className="resFooterLiAn"
                            style={{ color: "#fff" }}
                          >
                            Gift Cards
                          </Link>
                        </li>
                        {/* <li className="resFooterLi">
                        <Link to="/magazine" className="resFooterLiAn">
                          Magazine
                        </Link>
                      </li> */}
                        {/* <li className="resFooterLi">
                        <Link to="/travelguides" className="resFooterLiAn">
                          Travel Guides
                        </Link>
                      </li> */}
                      </ul>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>Work With Us</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <ul className="resFooterUl">
                        <li className="resFooterLi">
                          <a
                            href="http://34.201.127.230:2060/login"
                            target="_blank"
                            style={{ color: "#fff" }}
                            className="resFooterLiAn"
                          >
                            As a Supply Partner
                          </a>
                        </li>

                        <li className="resFooterLi">
                          {/* <a href="http://34.201.127.230:2060/registration" target="_blank" style={{ color: '#fff' }}>
                          Become a Supplier
                        </a> */}
                          <button
                            onClick={() => {
                              setModalA(true);
                            }}
                          >
                            {" "}
                            Become a Supplier rrr
                          </button>
                        </li>

                        {/* <li className="resFooterLi">
                        <Link to="/" className="resFooterLiAn">
                          As a Content Creator
                        </Link>
                      </li> */}

                        {/* <li className="resFooterLi">
                        <Link to="/" className="resFooterLiAn">
                          As an Affiliate Partner
                        </Link>
                      </li> */}
                      </ul>
                    </AccordionItemPanel>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="waysResDiv">
                <p>Ways You Can Pay</p>
                <div className="resrWaysMainDiv">
                  <div className="resPicsFirstDiv mb-2">
                    <figure className="footerliFig">
                      <img src={workwith1} alt="" />
                    </figure>
                    <figure className="footerliFig">
                      <img src={workwith2} alt="" />
                    </figure>
                    <figure className="footerliFig">
                      <img src={workwith3} alt="" />
                    </figure>
                  </div>
                  <div className="resPicsFirstDiv">
                    <figure className="footerliFig">
                      <img src={workwith4} alt="" />
                    </figure>
                    <figure className="footerliFig">
                      <img src={workwith5} alt="" />
                    </figure>
                    <figure className="footerliFig">
                      <img src={workwith6} alt="" />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {modalA && <BecameAsupplierModel closeModal={setModalA} />}
    </>
  );
};

export default Footer;
