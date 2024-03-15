import { useEffect, useState } from 'react';
import mainbody_bg from '../../assets/Images/contactBanner.png';
import { contactAdmin, getAllTopics, getSearchedQuestions } from '../../API_HELPERS/apiHelpers';
import MainLoader from '../../components/Loaders/MainLoader';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import Modal from 'react-modal';
import toast from 'react-hot-toast';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function Index() {
  const [fetchedTopics, setFetchedTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSearchData, setShowSearchData] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [remark, setRemark] = useState('')

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  console.log("fetchedTopics", fetchedTopics)

  const fetchAllTopics = async () => {
    try {
      setIsLoading(true);
      const res = await getAllTopics();
      if (res && res?.status) {
        setFetchedTopics(res?.data);
        console.log('topics', res);
      } else {
        console.log('ERROR FETCHING topics', res);
      }
    } catch (error) {
      console.log('ERROR FETCHING topics', error);
    }
    setIsLoading(false);
  };

  const fetchSearchQuestions = async data => {
    try {
      setSearchLoading(true);
      const res = await getSearchedQuestions(data);
      if (res && res?.status) {
        setSearchData(res?.data);
        console.log('SearchData', res);
      } else {
        console.log('ERROR FETCHING SearchData', res);
      }
    } catch (error) {
      console.log('ERROR FETCHING SearchData', error);
    }
    setSearchLoading(false);
  };

  const searchHandler = (e, flag) => {
    if (flag) {
      setShowSearchData(true);
      fetchSearchQuestions(searchKey);
      return;
    }

    setSearchKey(e.target.value);
    if (e.target.value === '') {
      setShowSearchData(false);
      return;
    }

    setShowSearchData(true);
    fetchSearchQuestions(e.target.value);
  };

  useEffect(() => {
    fetchAllTopics();
  }, []);

  const submitContact = async() =>{
    if (email=='' || name =="" || remark=='') {
      return toast.error('Fill all fields')
    }
    let data = {
      email:email,
      name:name,
      remarks:remark
    }
    let res = await contactAdmin(data)
    if (res && res.status) {
      toast.success('Submited Successfully')
      setEmail('')
      setName('')
      setRemark('')
    }else{
      toast.error('something wrong')
    }
  }
  const onClose = () =>{
    setEmail('')
    setName('')
    setRemark('')
  }
  return (
    <>
      <MainLoader isLoading={isLoading} />
      <>
        <section className="banerInformSection" style={{ backgroundImage: `url('${mainbody_bg}')` }}>
          <div className="banerInformDiv">
            <p className="greetingPara">Greetings from the Help Centre</p>
          </div>
        </section>
        <section className="searHeadSection">
          <div className="searDiv">
            <h5 className="searchHead">Search for a topic</h5>
            <div className="serInpDiv">
              <input
                type="search"
                placeholder="Search for a topic"
                className="searInp"
                value={searchKey}
                onChange={searchHandler}
              />
              <div className="conSearchDiv">
                <i
                  className="fa-solid fa-magnifying-glass conSearch"
                  style={{ cursor: 'pointer' }}
                  onClick={() => searchHandler('', true)}
                />
              </div>
            </div>
            <h5 className="searchHead">Or browse by topic</h5>
            <div className="accorConMainDiv">
              {!showSearchData ? (
                <Accordion >
                  {fetchedTopics?.map((item, i) => {
                    return (
                      <AccordionItem key={i}>
                        <AccordionItemHeading>
                          <AccordionItemButton>{item?.topicName}</AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel className="innerAccordionPanel">
                          <Accordion className="innerReactAcc">
                            {item?.questions?.map((que, queNo) => {
                              return (
                                <AccordionItem key={queNo}>
                                  <AccordionItemHeading>
                                    <AccordionItemButton>{que?.questions}</AccordionItemButton>
                                  </AccordionItemHeading>
                                  <AccordionItemPanel>
                                    <p>{que?.answer?.answer}</p>
                                  </AccordionItemPanel>
                                </AccordionItem>
                              );
                            })}
                          </Accordion>
                        </AccordionItemPanel>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              ) : (
                <Accordion>
                  {searchData?.map((item, i) => {
                    return (
                      <AccordionItem key={i}>
                        <AccordionItemHeading>
                          <AccordionItemButton>{item?.questions}</AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>{item?.answer?.answer}</AccordionItemPanel>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              )}
            </div>
          </div>
        </section>
        <section className="areBtnSection">
          <div className="arePBDiv">
            {/* <p className="areYouPara">
              Are you a tour operator or supply partner? Contact us via your{' '}
              <span className="areYouSpan">dedicated help page.</span>
            </p> */}
            <p className="stiiPara">Still need help?</p>
            <div>
              <button
                className="areConBtn"
                type='button'
                data-toggle="modal" 
                data-target="#exampleModal" 
                // onClick={openModal}
              >Contact us</button>
            </div>

             {/* modal contact  */}
              <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Contact Us</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                      onClick={onClose}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="form-group">
                          <label for="recipient-name" className="col-form-label">Email</label>
                          <input type="text" className="form-control" id="recipient-name" 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label for="recipient-name" className="col-form-label">Name</label>
                          <input type="text" className="form-control" id="recipient-name"
                          value={name}
                          onChange={(e)=>setName(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label for="message-text" className="col-form-label">Remarks:</label>
                          <textarea className="form-control" id="message-text"
                          value={remark}
                          onChange={(e)=>setRemark(e.target.value)}
                          ></textarea>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal"
                      onClick={onClose}
                      >Close</button>
                      <button type="button" className="btn btn-primary"
                      onClick={submitContact}
                      >Send</button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </section>
      </>
    </>
  );
}

export default Index;
