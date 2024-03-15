import React, { useEffect, useState } from 'react'
import '../../view/Press/Press.css';
import b from "../../assets/Images/PressBanner.png"
import b1 from "../../assets/Images/Pressnews1.png"
import b2 from "../../assets/Images/Pressnews2.png"
import b3 from "../../assets/Images/Pressnews3.png"
import b4 from "../../assets/Images/Pressnews4.png"
import b5 from "../../assets/Images/Pressnews5.png"
import b6 from "../../assets/Images/Pressnews6.png"
import b7 from "../../assets/Images/PressFollow.png"
import b8 from "../../assets/Images/PressFormImg.png"
import b9 from "../../assets/Images/PressImgdesign.png"
import { AllPress } from '../../API_HELPERS/apiHelpers';
import { useNavigate } from "react-router-dom";
export default function Index() {
    const navigate = useNavigate()
    const [allpress, setAllPress] = useState([]);
    console.log("allpress", allpress)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await AllPress();

                setAllPress(res?.data);
                console.log("vdghfv", res);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    return (
        <>


            {/* Banner part */}
            <section
                id="press_banner"
                style={{ backgroundImage: `url('${b}')`, position: 'relative' }}

            >
                <div className="container-fluid">
                    <div className="press_bannerimg">
                        <h1 className="press_head">Welcome to the</h1>
                        <h1 className="press_head">Things To Dooo Media Center</h1>
                    </div>
                </div>
            </section>
            {/* Press news part */}
            <section id="press_news">
                <div className="container-fluid">
                    <div className="press_newsbody">
                        <div className="press_newstop">
                            <h3 className="press_newshead">LATEST NEWS BY THINGS TO DOOO</h3>
                        </div>
                        <div className="press_newsbtm">
                            <div className="press_row">

                                {allpress?.map((ele, id) => {
                                    console.log("lbjhhghu", ele)
                                    return (
                                        <div className="presscard" onClick={() => {
                                            window.scrollTo(0, 0)
                                            navigate("/pressDetails", { state: { key: ele } });
                                        }}  >
                                            <div className="pressimg_wrap">
                                                <img src={ele?.image} alt="img" />
                                            </div>
                                            <div className="press_text">
                                                <p>
                                                    {ele?.description}
                                                </p>
                                            </div>
                                        </div>

                                    )

                                })}
                            </div>

                        </div>

                        {/* <div className="pressbtn_div">
                            <button className="press_newsbtn">Show more</button>
                        </div> */}
                    </div>
                </div>
            </section>
            {/* Follow us section */}
            {/* <section id="follow_us">
                <div className="container-fluid">
                    <div className="followbody">
                        <div className="follow_left">
                            <h3 className="follow_head">
                                FOLLOW US ON <span className="social">SOCIAL</span> MEDIA
                            </h3>
                            <p>
                                Follow us to discover how today's travelers explore the world and
                                what impact experiences have on the future of travel.
                            </p>
                            <button className="followus_btn">
                                LET'S GET IN TOUCH ON LINKEDIN
                            </button>
                        </div>
                        <div className="follow_right">
                            <div className="card followCard">
                                <div className="cardimg-wrapper">
                                    <img
                                        src={b7}
                                        className="card-img-top"
                                        alt="img"
                                    />
                                </div>
                                <div className="card-body followCard-body">
                                    <div className="card-head">
                                        <a href="#" className="linkedin_icon">
                                            <i className="fa-brands fa-linkedin" />
                                        </a>
                                        <span>@Things To Dooo</span>
                                    </div>
                                    <p className="card-text followcard-text">
                                        2022 was special! ❤️ Challenging, unexpected, unforeseeable, but
                                        also unforgettable. Travel is back stronger than ever, and so
                                        are we!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            {/* Press form part */}
            {/* <section id="pressform_main">
                <div className="container-fluid">
                    <div className="passform_body">
                        <div className="pressform_left">
                            <div className="pressform_img">
                                <div id="pressform_img1">
                                    <img src={b8} alt="img" />
                                </div>
                                <div id="pressform_img2">
                                    <img src={b9} alt="img" />
                                </div>
                            </div>
                        </div>
                        <div className="pressform_right">
                            <h3 className="pressform_head">
                                STAY UP TO DATE WITH THE LATEST NEWS FROM OUR PRESS TEAM
                            </h3>
                            <form>
                                <div className="pressform_input pressinput_name">
                                    <input
                                        type="text"
                                        name="fname"
                                        placeholder="First name"
                                        id="fname"
                                    />
                                    <input
                                        type="text"
                                        name="lname"
                                        placeholder="Last name"
                                        id="lname"
                                    />
                                </div>
                                <div className="pressform_input pressinput_email">
                                    <input type="email" name="email" placeholder="Email Address" />
                                </div>
                                <div className="pressform_input press_checkbox">
                                    <input type="checkbox" name="checkbox" />
                                    <span className="checkbox_text">
                                        By completing this form, I agree that my personal details will
                                        be processed in line withThings To Dooo privacy notice.
                                    </span>
                                </div>
                                <div className="pressform_input pressform_btndiv">
                                    <button className="pressform_btn">SIGN UP</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section> */}


        </>
    )
}
