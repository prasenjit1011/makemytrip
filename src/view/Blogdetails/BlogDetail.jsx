import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../Blogdetails/BlogDetail.css";
import blogLady from "../../assets/Images/blogLady.jpg";
import blogDetailBanner from "../../assets/Images/blogDetailBanner.jpg";
import { getSingleBlogs } from "../../API_HELPERS/apiHelpers";
import moment from "moment";
import MainLoader from "../../components/Loaders/MainLoader";
import { useLocation } from "react-router-dom";
function BlogDetail() {
  //..........................PressPage
  const location = useLocation();
  const passedData = location.state?.key;

  console.log("passedData", passedData);

  const [isLoading, setIsLoading] = useState(false);
  const { id, catName } = useParams();
  const [blogData, setBlogData] = useState({});

  const fetchBlogData = async () => {
    try {
      setIsLoading(true);
      let res;
      if (id) {
        res = await getSingleBlogs(id);
      } else {
        setBlogData(passedData);
      }

      if (res && res?.status) {
        setBlogData(res?.data);
        console.log("Blog Data", res?.data);
      } else {
        console.log("Blog Data", res);
      }
    } catch (error) {
      console.log("Blog Data", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return (
    <>
      <MainLoader isLoading={isLoading} />
      <section className="blogDetailSection">
        <div className="custContain">
          <div className="bDetailHeadDiv">
            <div className="marBtnDiv">
              <div style={{ display: passedData ? "none" : "block" }}>
                <button className="markBtn">{catName || ""}</button>
              </div>
              <div className="bDateDiv">
                {/* <p className="bDetDate">Aug 11, 2023</p> */}
                <p className="bDetDate">
                  {moment(blogData?.updatedOn).format("MMMM DD, YYYY")}
                </p>
              </div>
            </div>
            <div className="makeMemPDiv">
              <p className="makeMemP">{blogData?.title || blogData?.topic}</p>
            </div>
            <div className="bLadyMainDiv">
              <div
                style={{ display: passedData ? "none" : "block" }}
                className="bLadyFigDiv"
              >
                <figure className="bLadyFig">
                  <img src={blogData?.authorImage} alt="" />
                </figure>
              </div>
              <div className="bLadyNameDiv">
                <p className="bLadyName">{blogData?.authorName}</p>
              </div>
            </div>
          </div>
          <div className="bDetailDivBanner">
            <figure className="bDetailBanner">
              <img src={blogData?.image} alt="" />
            </figure>
          </div>
          <div>
            <p className="bDetailFirstPara">
              <Link to="/" className="bDetailParaAn">
                {blogData?.authorName}
              </Link>
              {/* , Creative Lead, shares how GetYourGuide's in-house Creative Studio made our biggest brand campaign to
              date. */}
            </p>
            <p className="bDetailPara">
              {/* In GetYourGuide’s Creative Studio, making innovative and impactful brand campaigns is all in a day’s work.
              Our team of expert writers, designers, imagery, and operational specialists is continually exploring new
              ways to market our unforgettable experiences to new customers around the globe. But when we were tasked
              with creating GetYourGuide’s biggest-ever brand campaign in late 2022, we knew that a big challenge lay
              ahead. */}

              <div
                dangerouslySetInnerHTML={{ __html: blogData?.description }}
              ></div>
              {/* {blogData?.description} */}
            </p>
            {/* <p className="bDetailPara">
              This project would require us to think bigger, work smarter, and push ourselves further than we’d ever
              done before. With this daunting task ahead, there was only one question on everyone’s mind – how soon can
              we get started?
            </p>
          </div>
          <div className="findParaDiv">
            <p className="findingHead">Finding the “big idea”</p>
            <p className="bDetailPara">
              The journey of creating an advertising campaign begins by making the most important decision of the entire
              process – what’s the story we’re going to tell to our customers? The outcome of this decision serves as
              the north star for everything that comes next.
            </p>
            <p className="bDetailPara">
              While you might imagine Mad Men’s Don Draper lounging on a sofa pondering the answers to these kinds of
              questions, these days, our approach is much more data-driven and methodical. We rely on a mix of customer
              research and insights, testing and analysis of previous work, clear business objectives and KPIs, and a
              sprinkle of creative flair to make the call.
            </p>
            <div className="findInnerDiv">
              <p className="leftDouCoat">&ldquo;</p>
              <p>
                With all this information, we committed to creating a campaign that spoke to our customers on an
                emotional level. Looking at the very core of why we travel in the first place. We don’t visit a museum
                or hike a mountain just to tick it off a list. Deep down, each of us has the desire to experience
                something that we don’t feel every day and make memories that stay with us for a lifetime. And so, our
                North Star was born: Make Memories with GetYourGuide.
              </p>
              <p className="rightDouCoat">&rdquo;</p>
            </div>
          </div>
          <div className="assemDiv">
            <p className="findingHead">Assembling the dream team</p>
            <p className="bDetailPara">
              With the idea taking shape, it was time to find a talented team to bring the concept to life. While many
              companies rely on external creative agencies to take on this kind of task, we believe an in-house team
              like our Creative Studio can deliver the most powerful results. Why?
            </p>
            <ul className="assembleUL">
              <li>We can be more agile and constantly test and iterate throughout the creative process.</li>
              <li>
                We know our brand and customer better than anyone, having spent countless hours examining what makes
                them tick.
              </li>
              <li>We have an expert team with decades of combined agency and in-house experience.</li>
              <li>We’re able to be more cost-efficient.</li>
            </ul>
            <p className="bDetailPara">
              However, for a project this scale, we knew we’d need the support of some incredible partners. We enlisted
              Hamburg-based production partner DigitalSinn, and the award-winning talent of LA-based director Anderson
              Wright to help make our vision a reality.
            </p>
          </div>
          <div className="assemDiv">
            <p className="findingHead">Planning the production</p>
            <p className="bDetailPara">
              With the team in place, we started to turn an idea into a very concrete reality. It begins with making
              scripts and storyboards that show second by second what the ad will look like. Write a draft, get
              feedback, and repeat until our team and our stakeholders are fully confident about the film and
              photography we’re about to create.
            </p>
            <p className="bDetailPara">
              Then the pre-production wheels start turning, organizing all the logistics of making an ad. This includes
              choosing the location, finding the talent and crew, wardrobe and set design, and getting permissions and
              permits. This process can take several weeks, making sure everyone and everything is as prepared as
              possible before the film and photo shoot begins.
            </p>
          </div>
          <div className="assemDiv">
            <p className="findingHead">Lights, camera, action</p>
            <p className="bDetailPara">
              We decided to film and photograph our campaign in two locations – Thailand and Barcelona. This combination
              allowed us to make the most of a few elements: great weather (very important for a travel ad), a wide
              range of recognizable and unforgettable experiences to showcase, and competitive production costs. So at
              the end of Feb 2023, our team boarded a plane to make the campaign.
            </p>
            <p className="bDetailPara">
              Filming and photographing a campaign comes with many creative, technical, and logistical challenges that
              require out-of-the-box thinking to solve.
            </p>
            <p className="bDetailPara">
              Creatively, we’re looking at bringing out the best in our actors and showcasing our experiences in the
              best possible light. For example, we discussed how to capture a wide range of emotions from our skydiving
              actors while they are freefalling from a plane. Our solution was to pick veteran skydivers who are used to
              the experience and would have better control of their facial expressions.
            </p>
            <p className="bDetailPara">
              Technically, we’re thinking about lighting, camera movements, and adapting to the environment. For
              example, how do you capture a scene in the middle of a lake with shots required from underwater? The
              answer involves lots of walkie-talkies, a special camera boat, and a camera person who isn’t afraid to
              (literally) dive in.{' '}
            </p>
            <p className="bDetailPara">
              Logistically, we want to figure out how to make the impossible possible. How do you get an overhead shot
              of a market where drone access is restricted? Our approach involved working closely with a local
              restaurant to put a camera and a crane on their roof.
            </p>
          </div>
          <div className="assemDiv">
            <p className="findingHead">‍Polishing to perfection</p>
            <p className="bDetailPara">
              Once the footage and images are captured, it’s back home to turn raw footage into a beautiful campaign
              through editing, color grading, sound mixing, and more. For our film, we knew we needed music that would
              be just as epic as the experiences we were showing – Africa by Toto. We worked with composers to develop a
              classical rendition of the song and enlisted members of the Prague Film Orchestra to record it live for an
              extra dose of magic.
            </p>
            <div className="thingVideoDiv">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/r1ESzDq--OE?si=K9miZRAchQwbqvGa"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div className="happenNextDiv">
            <p className="findingHead">What happens next?</p>
            <p className="bDetailPara">
              Once the campaign is finished, it’s time to share it with the world – but a creative’s work is never done.
              We continually test and iterate on our work after the launch date to make sure it performs as well as it
              possibly can. This might involve making new edits or experimenting with CTAs. Over the next few months,
              we’ll analyze the response and process the learnings to improve our work for next time when we begin the
              exciting process all over again.
            </p>
            <div className="svgJoinDiv">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="143" height="256" viewBox="0 0 143 256" fill="none">
                  <path
                    d="M14.832 387.312C83.3264 417.582 124.247 370.858 139.063 324.061C153.879 277.264 129.893 213.702 69.5392 220.342C9.1853 226.982 -16.4154 153.141 36.9378 108.65"
                    stroke="#FF5533"
                    stroke-width="9"
                    stroke-linecap="square"
                    stroke-dasharray="8 18"
                  />
                  <path
                    d="M88.3386 41.6967C88.3386 62.9733 50.3386 103.171 50.3386 103.171C50.3386 103.171 12.3386 62.9733 12.3386 41.6967C12.3386 31.479 16.3422 21.6797 23.4686 14.4547C30.5949 7.22969 40.2604 3.17072 50.3386 3.17072C60.4169 3.17072 70.0823 7.22969 77.2087 14.4547C84.3351 21.6797 88.3386 31.479 88.3386 41.6967Z"
                    fill="#FF5533"
                  />
                  <path
                    d="M36.3618 45.1631V48.925C36.3618 56.1169 41.6275 61.4141 48.121 61.4141C52.1726 61.4141 55.7468 59.3395 57.8203 56.1861V60.8332H63.2771V45.1631H48.6394V50.5432H54.6691C54.0961 53.3923 51.5588 55.536 48.5712 55.536C45.2017 55.536 42.4324 52.8806 42.4324 48.925V45.1631H36.3618ZM39.3903 43.2406C41.2046 43.2406 42.6507 41.8161 42.6507 39.9351C42.6507 38.0541 41.2046 36.6296 39.3903 36.6296C37.5759 36.6296 36.1299 38.0541 36.1299 39.9351C36.1299 41.8161 37.5759 43.2406 39.3903 43.2406ZM49.7444 22.2181C42.2005 22.2181 36.3618 27.2939 36.3618 34.7071H42.4324C42.4324 30.8622 45.5836 28.0961 49.7171 28.0961C53.8506 28.0961 57.0018 30.8622 57.0018 34.7071H63.0724C63.0452 27.2939 57.2474 22.2181 49.7444 22.2181Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div>
                <p className="joinHead">Join the journey.</p>
                <p className="ourPara">
                  Our 750+ strong team is changing the way millions experience the world, and you can help.
                </p>
                <div className="openRoleDiv">
                  <Link to="/" className="openRoleBtn">
                    Open roles
                  </Link>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogDetail;
