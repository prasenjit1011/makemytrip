import React from 'react';
// import d from '../../assets/Images/newYork.png';
// import e from '../../assets/Images/usa1.png';
// import f from '../../assets/Images/usa2.png';
// import g from '../../assets/Images/italy.png';
// import h from '../../assets/Images/albarello.png';
// import i from '../../assets/Images/uk.png';
// import j from '../../assets/Images/uae.png';
import { useGlobalDataCtx } from '../../Context/GlobalDataProvider';
import { Link } from 'react-router-dom';
const PopularDestinations = () => {
  const { fetchedTopCities } = useGlobalDataCtx();
  return (
    <>
      <section className="popularDestPart">
        <div className="custContain">
          <div className="row">
            <div className="col popularDestHead">
              <p>Check out these popular destinations</p>
            </div>
          </div>
          <div className="row aweImgPart">
            {/* {destData && destData?.map((item, i) =>
              <div className="col-lg-3 col-md-6 col-xl-3 col-12 marginBottomClass">
                <a href="#">
                  <figure>
                    <img src={C} alt="" />
                    <div className="aweInnerImgTextParentPart">
                      <p className="aweInnerImgTextPart">PARIS</p>
                    </div>
                  </figure>
                </a>
              </div>
            )
            } */}

            {fetchedTopCities
              ?.filter(item => item?.tourAndActivity > 0)
              .map((item, i) => {
                return (
                  <div className="col-lg-4 col-md-6 col-xl-3 col-12 marginBottomClass" key={i}>
                    <Link to={`/city/${item?._id}`}>
                      <figure>
                        <img src={item?.picture} alt="" />
                        <div className="aweInnerImgTextParentPart">
                          <p className="aweInnerImgTextPart">{item?.cityName?.toUpperCase()}</p>
                        </div>
                      </figure>
                    </Link>
                  </div>
                );
              })}

            {/* <div className="col-lg-4 col-md-6 col-xl-3 col-12 marginBottomClass">
              <a href="#">
                <figure>
                  <img src={e} alt="" />
                  <div className="aweInnerImgTextParentPart">
                    <p className="aweInnerImgTextPart">USA</p>
                  </div>
                </figure>
              </a>
            </div>
            <div className="col-lg-4 col-md-6 col-xl-3 marginBottomClass">
              <a href="#">
                <figure>
                  <img src={f} alt="" />
                  <div className="aweInnerImgTextParentPart">
                    <p className="aweInnerImgTextPart">USA</p>
                  </div>
                </figure>
              </a>
            </div>
            <div className="col-lg-4 col-md-6 col-xl-3 marginBottomClass">
              <a href="#">
                <figure>
                  <img src={g} alt="" />
                  <div className="aweInnerImgTextParentPart">
                    <p className="aweInnerImgTextPart">ITALY</p>
                  </div>
                </figure>
              </a>
            </div>
            <div className="col-lg-4 col-md-6 col-xl-3 marginBottomClass">
              <a href="#">
                <figure>
                  <img src={h} alt="" />
                  <div className="aweInnerImgTextParentPart">
                    <p className="aweInnerImgTextPart">ALBARELLO</p>
                  </div>
                </figure>
              </a>
            </div>
            <div className="col-lg-4 col-md-6 col-xl-3 marginBottomClass">
              <a href="#">
                <figure>
                  <img src={i} alt="" />
                  <div className="aweInnerImgTextParentPart">
                    <p className="aweInnerImgTextPart">UK</p>
                  </div>
                </figure>
              </a>
            </div>
            <div className="col-lg-4 col-md-6 col-xl-3 marginBottomClass">
              <a href="#">
                <figure>
                  <img src={j} alt="" />
                  <div className="aweInnerImgTextParentPart">
                    <p className="aweInnerImgTextPart">UAE</p>
                  </div>
                </figure>
              </a>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default PopularDestinations;
