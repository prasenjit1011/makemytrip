import React from "react";
import mainbody_bg from "../../assets/Images/cardPic4.png"
import { Link } from "react-router-dom";

const ReadMoreAboutParis = () => {
  const aboutParis = [1,2,3,4,5,6];
  return (
    <section className="tour-list my-5 pb-5">
      <div className="container-fluid">
        <div className="list1">
          <h4 className="headingTop">Read more about Paris</h4>

          <div className="row mt-5">
            {aboutParis.map(() => {
              return (
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="aboutPariscard_box" style={{ backgroundImage: `url('${mainbody_bg}')`, }}>
                    <div className="overlay_bg">
                      <div>
                        <div className="title_head">
                          <h4>10 unmissable experiences in Paris</h4>
                        </div>
                        <div className="text">
                          <p>Tick these Paris bucket-list experiences off with our top 10 tours. See the Eiffel Tower, explore the Catacombs, cruise the Seine and enjoy a cabaret.</p>
                        </div>
                        <div className="read_more">
                          <a href="#" className="btn">Read More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="Findmore_btn">
            <button className="btn">Find more travel inspiration</button>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ReadMoreAboutParis;
