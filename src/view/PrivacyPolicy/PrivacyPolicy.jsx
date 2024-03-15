import { useEffect, useState } from 'react';
import mainbody_bg from '../../assets/Images/privacyBanner.png';
import { getPrivacyPolicy } from '../../API_HELPERS/apiHelpers';
import MainLoader from '../../components/Loaders/MainLoader';

const PrivacyPolicy = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchLegalData = async () => {
    setIsLoading(true);
    try {
      const res = await getPrivacyPolicy();
      if (res && res?.status) {
        setData(res?.data);
      } else {
        console.log('ERROR FETCHING PRIVACY POLICY', res);
      }
    } catch (error) {
      console.log('ERROR FETCHING PRIVACY POLICY', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLegalData();
  }, []);
  return (
    <>
      <MainLoader isLoading={isLoading} />
      <section className="banerInformSection" style={{ backgroundImage: `url('${mainbody_bg}')` }}>
        <div className="banerInformDiv">
          <p className="privacyPara">Privacy Policy</p>
        </div>
      </section>
      <section className="privacyTextSection" style={{ padding: '2rem', margin: '20px' }}>
        {data?.map((item, i) => {
          return <div key={i} dangerouslySetInnerHTML={{ __html: item?.topic }}></div>;
        })}

        {/* <h2 className="priHeadSec">Privacy Policy</h2>
        <div className="priZeroDiv">
          <p className="thProPara">
            The protection of your personal data is important to us. With this privacy policy, we would like to explain
            to you in more detail what personal data we collect and for what purposes this data is processed.
          </p>
        </div>
        <div className="priFirstDiv">
          <h6 className="privacySubHead">1. Controller and contact</h6>
          <p className="thProPara">The controller for purposes of processing your personal data is:</p>
          <p className="remOneFour">
            144, Remount Rd, opp. to Toni and Guy Salon, Majherhat, Alipore, Kolkata, West Bengal 700027, India
          </p>
          <p className="thProPara">
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using 'Content here, content here', making it look like readable English. Many
            desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a
            search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved
            over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          </p>
        </div>
        <div className="priFirstDiv">
          <h6 className="privacySubHead">2. Subject of data protection</h6>
          <p className="loSubPara">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged.
          </p>
        </div>
        <div className="priFirstDiv">
          <h6 className="privacySubHead">3. Automated data collection</h6>
          <ul className="autoUl">
            <li className="autoLi">URL of the page accessed</li>
            <li className="autoLi">Date and time</li>
            <li className="autoLi">
              for load balancing, i.e. to distribute access to our website across several devices and to be able to
              offer you the fastest possible loading times;
            </li>
            <li className="autoLi">
              to ensure the security of our IT systems, e.g. to defend against specific attacks on our systems and to
              recognise attack patterns
            </li>
            <li className="autoLi">
              to ensure the proper operation of our IT systems, e.g. if errors occur that we can only rectify by storing
              the IP address
            </li>
            <li className="autoLi">
              to enable criminal prosecution, averting of danger or legal prosecution in the event of specific
              indications of criminal offences.
            </li>
          </ul>
        </div>
        <div className="priFirstDiv">
          <h6 className="privacySubHead">4. Things To Dooo account</h6>
          <ul className="thimgsUl">
            <li className="thingsLi">Registration</li>
            <li className="thingsLi">Surname/first name</li>
            <li className="thingsLi">E-mail address</li>
            <li className="thingsLi">Passwords</li>
          </ul>
          <p className="thProPara">
            Alternatively, you can log in with your Facebook, Google or Apple account. In this case, we receive the
            following personal data from Facebook or Google or Apple in order to create a user account for you:
          </p>
          <ul className="thimgsUl">
            <li className="thingsLi">Name</li>
            <li className="thingsLi">E-mail address</li>
            <li className="thingsLi">Photo (Facebook only)</li>
            <li className="thingsLi">an authentication token</li>
          </ul>
          <p className="thProPara">
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using 'Content here, content here', making it look like readable English. Many
            desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a
            search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved
            over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          </p>
        </div>
        <div className="priFirstDiv">
          <h6 className="privacySubHead">5. Reviews and ratings</h6>
          <p className="loSubPara">
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using 'Content here, content here', making it look like readable English. Many
            desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a
            search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved
            over the years, sometimes by accident, sometimes on purpose
          </p>
        </div> */}
      </section>
    </>
  );
};

export default PrivacyPolicy;
