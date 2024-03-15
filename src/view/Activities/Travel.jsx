import React from "react";

import img14 from '../../assets/Images/activities/img14.png'

const Travel = (props) => {
  return (
    <div>
      <section className="travel" style={{padding: "0 3%"}}>
        <div className="container-fluid">
          <div className="journey">
            <div className="row">
              <div className="col-lg-4 col-md-12 col-12">
                <div style={{ overflow: "hidden", margin: "10px", borderRadius: "5px" }}>
                  <img src={img14} alt="" className="img-fluid" />
                </div>
              </div>
              <div className="col-lg-8 col-md-12 col-12">
                <div className="Travel-journey">
                  <h4>
                    {props.title} <span style={{color: '#00A3FF'}}> {props.colorText}</span>
                  </h4>
                  <p>
                    Receive a curated 48-hour itinerary featuring the most
                    iconic experiences
                    <br />
                    in Paris, straight to your inbox.
                  </p>
                  <div className="search mb-3">
                    <div className="search-container ">
                      <form action=" " className="position-relative">
                        <input
                          type="text"
                          placeholder="nandipijush2016@gmail.in"
                          name="search"
                          className=""
                        />
                        <button type="submit" className="position-absolute top-0 right-0">Sign up</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p>
            By signing up, you agree to receive promotional emails on activities
            and insider tips. You can unsubscribe or withdraw your consent at
            any time with future effect. For more information, read our <br />
            <span>Privacy statement .</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Travel;
