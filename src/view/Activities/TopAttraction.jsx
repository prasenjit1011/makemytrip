import React from "react";

const TopAttraction = ({siteDetail}) => {
  return (
    <div>
      <section className="top-attraction">
        <div className="container-fluid">
          <h4>
            Top Attractions in <span> Naples</span>
          </h4>

          <div className="top">
            <a href="#" className="river">
              Seine River
            </a>
            <a href="#" className="sainte">
              Sainte-Chapelle
            </a>
            <a href="#" className="louvre">
              Louvre Museum
            </a>
            <a href="#" className="Paris">
              Paris Catacombs
            </a>
            <a href="#" className="river">
              Seine River
            </a>
          </div>
          <div className="attraction">
            <a href="#" className="one">
              5Pantheon, Paris
            </a>
            <a href="#" className="one">
              6Eiffel Tower
            </a>
            <a href="#" className="one">
              7Musee Rodin
            </a>
            <a href="#" className="one">
              15Theatre BO Saint Martin
            </a>
          </div>
          <div className="in">
            <a href="#" className="one">
              Jardin d'Acclimatation
            </a>
            <a href="#" className="one">
              19FlyView Paris
            </a>
            <a href="#" className="one">
              14Disneyland Paris
            </a>
            <a href="#" className="one">
              7Musee Rodin
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TopAttraction;
