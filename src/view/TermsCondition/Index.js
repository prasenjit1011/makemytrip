import React, { useEffect, useState } from 'react';
import '../../view/TermsCondition/Terms.css';
import b from '../../assets/Images/LegalNoticeBanner.png';
import { getTermsAndConditions } from '../../API_HELPERS/apiHelpers';
import MainLoader from '../../components/Loaders/MainLoader';

export default function Index() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogData = async () => {
    try {
      setIsLoading(true);
      const res = await getTermsAndConditions();
      if (res && res?.status) {
        setData(res?.data);
        console.log('TERMS AND CONDITIONS', res?.data);
      } else {
        console.log('ERROR FETCHING TERMS AND CONDITIONS', res);
      }
    } catch (error) {
      console.log('ERROR FETCHING TERMS AND CONDITIONS', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return (
    <>
      <MainLoader isLoading={isLoading} />
      <>
        {/* Banner part */}
        <section id="tnc_banner" style={{ backgroundImage: `url('${b}')`, position: 'relative' }}>
          <div className="container-fluid">
            <div className="tnc_bannerimg">
              <h1 className="tnc_bannerhead">GENERAL TERMS AND</h1>
              <h1 className="tnc_bannerhead">CONDITIONS</h1>
            </div>
          </div>
        </section>
        {/* Body part */}
        <section id="tnc_body">
          {data?.map((item, i) => {
            return <div key={i} dangerouslySetInnerHTML={{ __html: item?.topic }}></div>;
          })}

          {/* <div className="container-fluid">
            <div className="tnc_bodymain">
              <div className="tnc_top">
                <h3 className="tnc_head">GENERAL TERMS AND CONDITIONS</h3>
                <p className="tnc_para">Version 01/12/2022</p>
                <p className="tnc_rowparatop">
                  The GYG Platform is available to users worldwide. Certain portions of these TTD will apply to you only
                  if you reside in a specific country or region.
                </p>
                <p className="tnc_rowparatop">
                  All Countries (Except the <span style={{ fontWeight: 400 }}>Dublin Ireland</span>): If you reside
                  anywhere in the world except for the United State of America, Appendix A applies to you.
                </p>
              </div>
              <div className="tnc_bottom">
                <div className="tnc_row">
                  <h6 className="tnc_rowhead">1. About us</h6>
                  <p className="tnc_rowpara">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                    leap into electronic typesetting, remaining essentially unchanged.
                  </p>
                </div>
                <div className="tnc_row">
                  <h6 className="tnc_rowhead">2. Scope</h6>
                  <p className="tnc_rowpara">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                    leap into electronic typesetting, remaining essentially unchanged.
                  </p>
                  <p className="tnc_rowpara">
                    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem
                    Ipsum.
                  </p>
                </div>
                <div className="tnc_row">
                  <h6 className="tnc_rowhead">3. What we do</h6>
                  <p className="tnc_rowpara">
                    It is a long established fact that a reader will be distracted by the readable content of a page
                    when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                    distribution of letters, as opposed to using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
                    default model text, and a search for 'lorem ipsum' will uncover many web sites still in their
                    infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose
                  </p>
                </div>
                <div className="tnc_row">
                  <h6 className="tnc_rowhead">4. Registration and TTD account</h6>
                  <p className="tnc_rowpara">
                    It is a long established fact that a reader will be distracted by the readable content of a page
                    when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                    distribution of letters, as opposed to using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
                    default model text, and a search for 'lorem ipsum' will uncover many web sites still in their
                    infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose
                  </p>
                  <p className="tnc_rowpara">
                    It is a long established fact that a reader will be distracted by the readable content of a page
                    when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                    distribution of letters, as opposed to using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
                    default model text, and a search for 'lorem ipsum' will uncover many web sites still in their
                    infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose
                  </p>
                  <p className="tnc_rowpara">
                    It is a long established fact that a reader will be distracted by the readable content of a page
                    when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                    distribution of letters, as opposed to using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
                    default model text, and a search for 'lorem ipsum' will uncover many web sites still in their
                    infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose
                  </p>
                </div>
                <div className="tnc_row">
                  <h6 className="tnc_rowhead">5. TTD Apps</h6>
                  <p className="tnc_rowpara">
                    It is a long established fact that a reader will be distracted by the readable content of a page
                    when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                    distribution of letters, as opposed to using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
                    default model text, and a search for 'lorem ipsum' will uncover many web sites still in their
                    infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose
                  </p>
                </div>
                <div className="tnc_row">
                  <h6 className="tnc_rowhead">6. Conclusion of contract withThings To Dooo- User Agreement</h6>
                  <p className="tnc_rowpara">
                    It is a long established fact that a reader will be distracted by the readable content of a page
                    when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                    distribution of letters, as opposed to using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
                    default model text, and a search for 'lorem ipsum' will uncover many web sites still in their
                    infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </section>
      </>
    </>
  );
}
