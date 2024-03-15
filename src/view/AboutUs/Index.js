import { useState, useEffect } from 'react';
import '../../view/AboutUs/About.css';
import b from '../../assets/Images/About_Banner.png';
import c from '../../assets/Images/Crownimg.png';
import a from '../../assets/Images/About_card1.png';
import e from '../../assets/Images/About_card2.png';
import f from '../../assets/Images/AboutBigimg.png';
import fourManAbout from '../../assets/Images/fourManAbout.jpg';
import { getAboutUsPageDetails } from '../../API_HELPERS/apiHelpers';
import { toast } from 'react-hot-toast';
import MainLoader from '../../components/Loaders/MainLoader';
import { Link } from 'react-router-dom';

export default function Index() {
  const [aboutUsData, setAboutUsData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  console.log("aboutUsDatafg", aboutUsData)

  const fetchAboutUsData = async () => {
    try {
      setIsLoading(true);
      const res = await getAboutUsPageDetails();
      if (res && res?.status) {
        setAboutUsData(res?.data);
        console.log('ABOUT US DETAILS', res?.data);
      } else {
        toast.error(res?.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error?.message || 'Something went wrong');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAboutUsData();
  }, []);

  return (
    <>
      <MainLoader isLoading={isLoading} />
      {/* Banner part */}
      <section id="about_banner" style={{ backgroundImage: `url('${b}')`, position: 'relative' }}>
        <div className="container-fluid">
          <div className="about_bannerimg">
            <h1 className="aboutbanner_head">ABOUT US</h1>
          </div>
        </div>
      </section>

      {/* About body */}
      <section className="aboutBodyMainSection">
        <section id="about_para1">
          <div className="container-fluid">
            <div className="parabody">
              <h3 className="parahead">{aboutUsData?.topic}</h3>
              <p className="para_p">
                {aboutUsData?.description}
                {/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque, ducimus! Officia nostrum odio rem,
                blanditiis in eos voluptate similique, qui distinctio ratione ipsa consequuntur nisi! Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Quas nesciunt ipsam adipisci veniam praesentium nulla. */}
              </p>
            </div>
          </div>
        </section>

        {
          aboutUsData?.subTopic?.map((item, i) => {
            return (
              <section id="about_para2">
                <div className="container-fluid">
                  <div className="parabody">
                    <h3 className="parahead">{item?.title}</h3>
                    <p className="para_p">{item.description}</p>
                  </div>
                </div>

                <div id="about">
                  <figure className="aboutPageFig">
                    <img src={aboutUsData?.subTopic?.[0]?.image} alt="img" />
                  </figure>
                </div>
              </section>
            )
          })
        }
      </section>

      <section className="tripNeedSection">
        <div className="aboutBodyMainSection">
          <div className="triBrockDiv">
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="15">
              <path
                fill="#FD5037"
                d="M31.46 15l-3.3-5.21-6.64 3.48-4.04-6.38-6.64 3.48L6.8 3.99 1.38 6.83 0 4.11 7.86 0l4.04 6.37 6.64-3.47 4.04 6.38 6.64-3.48L34 13.35 31.46 15z"
              ></path>
            </svg>
          </div>
          <p className="parahead">Your trip, your way</p>
          <p className="findAbPara">Find the best things to do wherever you're going.</p>
          <div className="startPlanMainDiv">
            <div className="startPlanDiv">
              <Link to="/?lan=eng&currentTab=64d3a05d05edf815fbfb46a5" className="startPlanAn">
                Start planning
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="aboutBodyMainSection">
        <p className="parahead mb-2">Our journey so far</p>
        <p className="para_p mb-4">
          Opening the world to everyone is at the heart of GetYourGuide. Founded by classmates Johannes, Tao, Martin,
          and Tobias in 2009, a travel mix-up sparked a revolutionary approach to tourism. When Johannes landed a day
          early in Beijing, he spent his time wandering the streets, not knowing where to go or what to do. It wasn’t
          until Tao arrived on the scene to act as a local guide that the duo were able to fully experience their
          destination.Back in Zurich, with a defined vision for the future, our founders decided to change the world of
          travel. The result? A platform that gathers the best activities across the globe, all in one place.
        </p>
        <figure className="aboutPageFig">
          <img src={fourManAbout} alt="img" />
        </figure>
        <p className="para_p">
          From humble beginnings in a small student room to becoming the industry leader, a lot has changed at
          GetYourGuide. What hasn’t is our commitment to creating amazing experiences and ensuring that you love where
          you’re going.
        </p>
      </section> */}
      <section className="needHelpSection">
        <div className="aboutBodyMainSection">
          <div className="triBrockDiv">
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="15">
              <path
                fill="#FD5037"
                d="M31.46 15l-3.3-5.21-6.64 3.48-4.04-6.38-6.64 3.48L6.8 3.99 1.38 6.83 0 4.11 7.86 0l4.04 6.37 6.64-3.47 4.04 6.38 6.64-3.48L34 13.35 31.46 15z"
              ></path>
            </svg>
          </div>
          <p className="parahead">Need help?</p>
          <p className="findAbPara">Whatever you need, we’re here to chat.</p>
          <div className="startPlanMainDiv">
            <div className="startPlanDiv">
              <Link to="/contact" className="startPlanAn">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
