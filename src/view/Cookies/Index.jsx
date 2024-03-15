import React, { useEffect, useState } from 'react';
import mainbody_bg from '../../assets/Images/cookieBanner.png';
import { getCookies } from '../../API_HELPERS/apiHelpers';
import { toast } from 'react-hot-toast';
import MainLoader from '../../components/Loaders/MainLoader';

function Index() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [descData, setDescData] = useState("");

  const fetchAboutUsData = async () => {
    try {
      setIsLoading(true);
      const res = await getCookies();
      if (res && res?.status) {
        setData(res?.data);
        setDescData(res?.data?.[0]?.description)
      } else {
        toast.error(res?.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error?.message || 'Something went wrong');
    }
    setIsLoading(false);
  };

  const customClass = (str) => {
    return str?.str?.split(" ")?.join("-");
  }

  useEffect(() => {
    fetchAboutUsData();
  }, []);

  return (
    <>
      <MainLoader isLoading={isLoading} />
      <section className="banerInformSection" style={{ backgroundImage: `url('${mainbody_bg}')` }}>
        <div className="banerInformDiv">
          <p className="cookiePara">Cookies and Marketing Preferences</p>
        </div>
      </section>
      <section className="privacySection">
        <h1 className="privacyHead">Privacy Preference Center</h1>
        <div className="container">
          <div className="row">
            {/* buttons tab */}
            <div className="col-lg-4 col-5 tabSecCol">
              <div className="nav nav-pills my-nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                {data && data?.map((item, i) => {
                  console.log("ttkkr", item?.title?.split(" ")?.join("-"))
                  return (
                    <button
                      className={`nav-link ${i === 0 && "active"}`}
                      id={`v-pills-${customClass(item?.title)}-tab`}
                      data-toggle="pill"
                      data-target={`#v-pills-${customClass(item?.title)}`}
                      type="button"
                      role="tab"
                      aria-controls={`v-pills-${customClass(item?.title)}`}
                      aria-selected="true"
                      onClick={() => setDescData(item?.description)}
                    >
                      {item?.title}
                    </button>
                  )
                })
                }

                {/* <button
                  className="nav-link"
                  id="v-pills-profile-tab"
                  data-toggle="pill"
                  data-target="#v-pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-profile"
                  aria-selected="false"
                >
                  Strictly necessary Technologies
                </button> */}

                {/* <button
                  className="nav-link"
                  id="v-pills-messages-tab"
                  data-toggle="pill"
                  data-target="#v-pills-messages"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  Analytical Technologies
                </button> */}
              </div>
            </div>

            {/* tab panels */}
            <div className="col-lg-8 col-7">
              <div className="tab-content" id="v-pills-tabContent">
                {data && data?.map((item, i) => {
                  // console.log("ttkkr", item?.title?.split(" ")?.join("-"))
                  return (
                    <div
                      key={i}
                      className={`tab-pane fade ${i === 0 && "show active"} horActiveText`}
                      id={`v-pills-${customClass(item?.title)}`}
                      role="tabpanel"
                      aria-labelledby={`v-pills-${customClass(item?.title)}-tab`}
                    >
                      {/* {item?.description} */}
                      {descData}
                    </div>
                  )
                })
                }

                {/* <div
                  className="tab-pane fade horActiveText"
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat non pariatur commodi hic distinctio
                  numquam voluptates aliquid ducimus optio enim at molestias, fugit modi iusto magnam! Aperiam
                  consequatur accusamus dolore officiis asperiores fuga! Ad rerum quas fuga? Quisquam quos quo illo
                  repellendus eum alias voluptate doloribus praesentium dolor mollitia. Minima.
                </div> */}
                {/* <div
                  className="tab-pane fade horActiveText"
                  id="v-pills-messages"
                  role="tabpanel"
                  aria-labelledby="v-pills-messages-tab"
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat non pariatur commodi hic distinctio
                  numquam voluptates aliquid ducimus optio enim at molestias, fugit modi iusto magnam! Aperiam
                  consequatur accusamus dolore officiis asperiores fuga! Ad rerum quas fuga? Quisquam quos quo illo
                  repellendus eum alias voluptate doloribus praesentium dolor mollitia. Minima.
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Index;
