import React from "react";

const ExperienceMap = ({ detail }) => {
  const gotomap = (item) => {
    // alert(item.link)
    // window.location.href = item.link
    window.open(item.link, "_blank");
  };
  return (
    <>
      <section className="experienceMapPart" id="expText">
        <div className="container-fluid">
          <div className="row">
            <div className="col experienceMapPartCol1">
              <p className="experienceMainHead">Experience</p>
            </div>
          </div>
          <div className="row">
            <div className="col experienceMapPartCol2">
              {detail?.information.map((item, i) => {
                if (i == 0) {
                  return (
                    <div className="experienceUlPart">
                      <p className="experienceUlPartHead">{item.title}</p>
                      <ul>
                        {item.desc?.map((des) => {
                          return <li>{des}</li>;
                        })}
                      </ul>
                    </div>
                  );
                }
              })}
              <div className="mapInnerPart">
                {/* <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5938.97998374132!2d${'88.363892'}!3d${'22.572645'}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1325890a57d42d3d%3A0x94f9ab23a7eb0!2s00120%20Vatican%20City!5e0!3m2!1sen!2sin!4v1684500591021!5m2!1sen!2sin`}
                  width={600}
                  height={450}
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                /> */}
                {/* <button type="button" class="btn btn-primary"> */}
                {/* <a  href={detail?.meetingPoint?.[0]?.link} target="_blank" rel="noopener noreferrer">
                  View Location Map
                </a> */}
                {/* </button> */}
              </div>
            </div>
          </div>
          {detail?.information?.map((item, i) => {
            if (i != 0)
              return (
                <div className="row sameMarginPart">
                  <div className="col experiencAllParent">
                    <div className="expTextHead">
                      <p className="experienceUlPartHead">{item.title}</p>
                    </div>
                    <div className="expUlPart experienceUlPart">
                      <ul className="highlightUl allCmnUl">
                        {item.desc?.map((des) => {
                          return <li>{des}</li>;
                        })}
                        {/* <li>
                  Discover the city that inspired JK Rowling's famous books
                </li>
                <li>Be sorted into your Hogwarts House</li>
                <li>
                  Text your Harry Potter knowledge and earn points for your
                  house
                </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              );
          })}
          {/* <div className="row sameMarginPart">
            <div className="col experiencAllParent">
              <div className="expTextHead">
                <p className="fullDescHead">Full description</p>
              </div>
              <div className="expUlPart">
                <ul className="fullDescUl allCmnUl">
                  <li>
                    Enjoy a Harry Potter-themed walking tour across Edinburgh.
                    See the city where JK Rowling found inspiration for
                    Hogwarts, her famous characters, and discover the place
                    where she wrote the books. Have your Harry Potter trivia
                    tested with an audio-visual quiz, and earn points for your
                    house.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row sameMarginPart">
            <div className="col experiencAllParent">
              <div className="expTextHead">
                <p className="includesHead">Includes</p>
              </div>
              <div className="expUlPart">
                <ul className="includesUi allCmnUl">
                  <li>Walking tour</li>
                  <li>Guide</li>
                </ul>
              </div>
            </div>
          </div> */}

          {detail?.meetingPoint?.filter((item) => item.desc !== "").length >
            0 && (
            <div className="row sameMarginPart">
              <div className="col experiencAllParent">
                <div className="expTextHead">
                  <p className="meetingHead">Meeting point</p>
                </div>
                <div className="expUlPart">
                  {detail?.meetingPoint.map((item) => {
                    return (
                      <ul className="meetingUi allCmnUl experienceUlPart">
                        <li>{item.desc}</li>
                        {item.link !== "" && (
                          <p className="gmapLink">
                            <h5
                              onClick={() => gotomap(item)}
                              style={{ color: "blue", cursor: "pointer" }}
                            >
                              Open in Google Maps{" "}
                              <i className="fa-solid fa-arrow-right-long" />
                            </h5>
                          </p>
                        )}
                      </ul>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <div className="row sameMarginPart">
            <div className="col experiencAllParent">
              <div className="expTextHead">
                <p className="importantHead">Important information</p>
              </div>
              <div className="expUlPart experienceUlPart">
                <ul className="importantUi allCmnUl">
                  {detail?.importentInfo?.map((item) => {
                    return (
                      <div className="">
                        <li>{item.title}</li>
                        {item.description.map((it) => {
                          return (  <p className="impInfoLiPara">&#8226; {it}</p>);
                        })}
                      </div>
                    );
                  })}
                  {/* <li>Comfortable shoes</li>
                  <li>Passport or ID card for children</li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExperienceMap;
