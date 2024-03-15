import { useState, useEffect } from 'react';
import '../../view/Legal/Legal.css';
import b from '../../assets/Images/LegalNoticeBanner.png';
import { getLegalNotice } from '../../API_HELPERS/apiHelpers';
export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  const fetchLegalData = async () => {
    try {
      const res = await getLegalNotice();
      if (res && res?.status) {
        setData(res?.data[0]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchLegalData();
  }, []);

  return (
    <>
      <>
        {/* Banner part */}
        <section id="legal_banner" style={{ backgroundImage: `url('${b}')`, position: 'relative' }}>
          <div className="container-fluid">
            <div className="legal_bannerimg">
              <h1 className="legal_bannerhead">LEGAL NOTICE</h1>
            </div>
          </div>
        </section>
        {/* Body part */}
        <section id="legal_body">
          <div className="container-fluid">
            <div className="legal_bodymain">
              <div className="legal_top">
                <h3 className="legal_head">LEGAL NOTICE</h3>
              </div>
              <div className="legal_bottom">
                <div className="legal_row">
                  <h6 className="legal_rowhead">Website Host:</h6>
                  {/* <p className="legal_rowpara">
                    144, Remount Rd, opp. to Toni and Guy Salon, Majherhat, Alipore, Kolkata, West Bengal 700027, India
                  </p> */}
                  <p className="legal_rowpara">{data?.address}</p>
                </div>
                <div className="legal_row">
                  <h6 className="legal_rowhead">Management:</h6>
                  {/* <p className="legal_rowpara">Vương Duyên Duyên &amp; Mahesh Kumar</p> */}
                  <p className="legal_rowpara">{data?.managmentPersonName}</p>
                </div>
                <div className="legal_row">
                  <h6 className="legal_rowhead">Contact Information:</h6>
                  {/* <p className="legal_rowpara legal_contact">Contact</p> */}
                  <p className="legal_rowpara legal_contact">{data?.contactInformation}</p>
                </div>
                <div className="legal_row">
                  <h6 className="legal_rowhead">Company Registration:</h6>
                  {/* <p className="legal_rowpara">Lorem Ipsum is simply dummy text of the printing</p> */}
                  <p className="legal_rowpara">{data?.comapnyRegistration}</p>
                </div>
                <div className="legal_row">
                  <h6 className="legal_rowhead">VAT Reg No:</h6>
                  {/* <p className="legal_rowpara">133QYTE759SD000</p> */}
                  <p className="legal_rowpara">{data?.VATRegistrationNo}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </>
  );
}
