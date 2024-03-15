import React, { Component, useEffect, useState } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import '../../view/Blog/Blog.css';
import b from '../../assets/Images/Blogbanner.png';
import c from '../../assets/Images/Inside2.png';
import d from '../../assets/Images/Inside1.png';
import e from '../../assets/Images/Blogslider1.png';
import v from '../../assets/Images/Blogslider4.png';
import p from '../../assets/Images/Blogslider6.png';
import r from '../../assets/Images/Blogslider7.png';
import q from '../../assets/Images/Blogslider8.png';
import f from '../../assets/Images/BlogName.png';
import g from '../../assets/Images/Blogslider2.png';
import i from '../../assets/Images/BlogName.png';
import j from '../../assets/Images/Blogslider3.png';
import k from '../../assets/Images/Uptodate1.png';
import m from '../../assets/Images/Uptodate2.png';
import n from '../../assets/Images/Collection4.png';
import x from '../../assets/Images/Collection3.png';
import y from '../../assets/Images/Collection2.png';
import z from '../../assets/Images/Collection1.png';
import { Link, NavLink } from 'react-router-dom';
import { getAllBlogTypes, getAllBlogs } from '../../API_HELPERS/apiHelpers';
import MainLoader from '../../components/Loaders/MainLoader';
import moment from 'moment';
export default function Index() {
  // var settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   initialSlide: 0,
  //   autoplay: true,
  //   responsive: [
  //     {
  //       breakpoint: 1366,
  //       settings: {
  //         slidesToShow: 4,
  //         slidesToScroll: 4,
  //       },
  //     },
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 3,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // };

  const [isLoading, setIsLoading] = useState(false);
  const [fetchedTypes, setFetchedTypes] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [selectedBlogs, setSelectedBlogs] = useState({});

  const fetchBlogs = async id => {
    try {
      setIsLoading(true);
      const res = await getAllBlogs(id);
      if (res && res?.status) {
        console.log('BLOGS', res?.data);
        setBlogs(res?.data);
      } else {
        console.log(res?.message || 'ERROR FETHCING BLOG CATEGORIES');
      }
    } catch (error) {
      console.log(error?.message || 'ERROR FETHCING BLOG CATEGORIES');
    }
    setIsLoading(false);
  };

  // const fetchSingleBlog = async () => {
  //   try {
  //     setIsLoading(true);
  //     const res = await getAllBlogTypes();
  //     if (res && res?.status) {
  //       console.log('BLOG CATEGORIES', res?.data);
  //       setFetchedTypes(res?.data);
  //     } else {
  //       console.log(res?.message || 'ERROR FETHCING BLOG CATEGORIES');
  //     }
  //   } catch (error) {
  //     console.log(error?.message || 'ERROR FETHCING BLOG CATEGORIES');
  //   }
  //   setIsLoading(false);
  // };

  const fetchAllTypes = async () => {
    try {
      setIsLoading(true);
      const res = await getAllBlogTypes();
      if (res && res?.status) {
        console.log('BLOG CATEGORIES', res?.data);
        setFetchedTypes(res?.data);
        fetchBlogs(res?.data[0]?._id);
      } else {
        console.log(res?.message || 'ERROR FETHCING BLOG CATEGORIES');
      }
    } catch (error) {
      console.log(error?.message || 'ERROR FETHCING BLOG CATEGORIES');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllTypes();
  }, []);

  return (
    <>
      {/* Banner part */}
      <MainLoader isLoading={isLoading} />
      <section id="blog_banner" style={{ backgroundImage: `url('${b}')`, position: 'relative' }}>
        <div className="container-fluid">
          <div className="blog_bannerimg">
            <h1 className="blogbanner_head">BLOG</h1>
          </div>
        </div>
      </section>
      {/* Inside part */}
      <section id="inside">
        <div className="container-fluid">
          {/* <h4 className="insidehead">PRIVACY POLICY</h4> */}
          <div className="inside_body">
            <div className="inside_text">
              <h3 className="inside_heading">
                Inside <br /> Things To Dooo
              </h3>
              <p className="inside_para">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
              </p>
            </div>
            <div className="inside_img">
              <div className="insideimg_wrapper">
                <img src={c} alt="img" id="inside1" />
                <div className="insidewrapper">
                  <img src={d} alt="img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* slider */}
      <section id="first_slider">
        <div className="container-fluid">
          <div className="cat-container m-4">
            <ul className="nav nav-underline">
              <li className="nav-item-cat-heading">
                <Link className="nav-link headNavCat">Categories:</Link>
              </li>
              {fetchedTypes?.map((item, i) => {
                return (
                  <li className="nav-item-cat">
                    <NavLink
                      className="nav-link"
                      onClick={e => {
                        e.preventDefault();
                        fetchBlogs(item?._id);
                      }}
                    >
                      {item?.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="slider_background" />
          <div className="blogslider_parent1">
            {/* <Slider {...settings}> */}

            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              onSlideChange={() => console.log('slide change')}
              onSwiper={swiper => console.log(swiper)}
              breakpoints={{
                640: {
                  slidesPerView: 1.8,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                992: {
                  slidesPerView: 2.5,
                  spaceBetween: 20,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1366: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
            >
              {blogs?.map(item => {
                return (
                  <SwiperSlide>
                    <Link to={`/blogdetail/${item?._id}/${item?.name}`}>
                      <figure className="sliderImgDiv">
                        <div className="sliderImgDiv_wrapper">
                          <img src={item?.blogImage} alt="" />
                        </div>
                        <div className="blogslider_text">
                          <div className="blogtextrow1">
                            <div className="people">
                              <button className="slider_btn">{item?.categoryType}</button>
                            </div>
                            <div className="date">
                              {/* <p>April 20, 2023</p> */}
                              <p>{moment(item?.createdOn).format('MMMM DD, YYYY')}</p>
                            </div>
                          </div>
                          <p className="sliderbigP">{item?.name}</p>
                          <hr />
                          <div className="blog_text">
                            <div className="blog_img">
                              <img src={item?.blogAuthorImage} alt="img" />
                            </div>
                            <div className="blog_name">
                              <p className="slidersmallP1">{item?.blogAuthorName}</p>
                              {/* <p className="slidersmallP2">
                                Senior Destination Manager for Mexico and Latin America1122554
                              </p> */}
                            </div>
                          </div>
                        </div>
                      </figure>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            {/* </Slider> */}
          </div>
        </div>
      </section>

      {/* Collections part */}
      {/* <section id="collection">
        <div className="container-fluid">
          <div className="collection_body">
            <div className="collection_top">
              <h1 className="collection_head">
                Collections to help you on your <br /> journey
              </h1>
            </div>
            <div className="collection_btm">
              <div className="collectionimg" id="collection1">
                <div className="collectionimgwrapper">
                  <img src={z} alt="" />
                </div>
                <div className="collectionText">
                  <p className="collectionPara">
                    Empowering Journeys: Personal Growth at GetYourGuide
                  </p>
                </div>
              </div>
              <div className="collectionimg" id="collection2">
                <div className="collectionimgwrapper">
                  <img src={y} alt="" />
                </div>
                <div className="collectionText">
                  <p className="collectionPara">
                    How I Transitioned from Care to People Operations
                  </p>
                </div>
              </div>
              <div className="collectionimg" id="Collection3">
                <div className="collectionimgwrapper">
                  <img src={x} alt="" />
                </div>
                <div className="collectionText">
                  <p className="collectionPara">
                    Empowering Journeys: Personal Growth at GetYourGuide
                  </p>
                </div>
              </div>
              <div className="collectionimg" id="collection4">
                <div className="collectionimgwrapper">
                  <img src={n} alt="" />
                </div>
                <div className="collectionText">
                  <p className="collectionPara">
                    How I Transitioned from Care to People Operations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* Blog form part */}
      {/* <section id="uptodate">
        <div className="container-fluid">
          <div className="uptodate_body">
            <div className="uptodate_img">
              <div className="formimg_wrapper">
                <img src={m} alt="img" id="uptodate1" />
                <div className="formwrapper">
                  <img src={k} alt="img" />
                </div>
              </div>
            </div>
            <div className="form_part">
              <h3 className="form_heading">Keep up to date with the latest news</h3>
              <form action="">
                <div className="blogform_name">
                  <div id="fname">
                    <input type="text" name="fname" placeholder="First Name" />
                  </div>
                  <div id="lname">
                    <input type="text" name="lname" placeholder="Last Name" />
                  </div>
                </div>
                <div className="blogform_email">
                  <input type="email" name="email" placeholder="Email Address" />
                </div>
                <div className="blog_check">
                  <input type="checkbox" defaultValue="agree" />
                  <span id="checkboxtext">
                    By completing this form, I agree that my personal details will
                    be processed in line with Things To Dooo
                    <span id="privacyword">
                      <Link href="#">privacy notice.</Link>
                    </span>
                  </span>
                </div>
                <div className="blogform_btn">
                  <button className="blogbutton">Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
