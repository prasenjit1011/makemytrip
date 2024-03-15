import React from "react";

const PlanningToParis = () => {
  return (
    <div style={{ padding: "0 3%" }}>
      <h4 className="headingTop">Planning your trip to Paris</h4>
      <div className="row pb-5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.9185124463!2d2.347035!3d48.85885484999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2sin!4v1685016609257!5m2!1sen!2sin"
          width="600"
          height="450"
          allowfullscreen=""
          loading="eager"
          referrerpolicy="no-referrer-when-downgrade"
          style={{border: 0}}
          className="col-lg-5"
        ></iframe>
        <div className="col-lg-7 itinerary mt-lg-0 mt-4">
           <div>
                <h2 className="text-uppercase itineraryText">Itinerary</h2>
                <p className="itineraryDesc">48 Hours in Paris</p>
                <p className="text-muted itineraryTime">5 min read</p>
                <p className="itineraryMainText">France’s capital city is densely packed with history, art, food, and fashion, and all the romanticism that has earned it its reputation as the City of Love. With our 48-hour itinerary, the legwork is already done for you so that you can explore Paris’ renowned museums, eat at its famed restaurants, visit some of the most recognizable monuments in the world, and still take in a show</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningToParis;
