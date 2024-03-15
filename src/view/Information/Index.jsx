import React, { useEffect, useState } from 'react';
import mainbody_bg from '../../assets/Images/informBanner.png';
import { getInformation } from '../../API_HELPERS/apiHelpers';
import MainLoader from '../../components/Loaders/MainLoader';

function Index() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchInformation = async () => {
    setIsLoading(true);
    try {
      const res = await getInformation();
      console.log('INFORMATION', res);
      if (res && res?.status) {
        setData(res?.data);
        console.log('FETCHED INFORMATION', res?.data);
      } else {
        console.log('ERROR FETCHING INFORMATION', res);
      }
    } catch (error) {
      console.log('ERROR FETCHING INFORMATION', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchInformation();
  }, []);

  return (
    <>
      <MainLoader isLoading={isLoading} />
      <section className="banerInformSection" style={{ backgroundImage: `url('${mainbody_bg}')` }}>
        <div className="banerInformDiv">
          <p className="infrmPara">Information according to the Digital Services Act</p>
        </div>
      </section>
      <section className="bannerTextInformSection">
        <p className="infrmSecPara">
          Information according to the Digital Services Act (Regulation (TD) 2022/2050, TTD)
        </p>
        <p className="infrmSecPara">{data?.topic}</p>
        <p className="contrayPara">
          {data?.desc}
          {/* Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
          College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
          and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem
          Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" */}
        </p>
      </section>
    </>
  );
}

export default Index;
