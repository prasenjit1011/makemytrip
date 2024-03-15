import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import emptyImg from "../../assets/Images/emptyImg.png";
// import wishlistImage from '../../assets/Images/wishlistImage.png';
import {
  addToWishlist,
  // getPastWishlistActivities,
  // deleteWishlistFolder,
  getUserWishList,
  // getUserWishlistFolders,
} from "../../API_HELPERS/apiHelpers";
import MainLoader from "../../components/Loaders/MainLoader";
import { toast } from "react-hot-toast";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
// import thPic3 from '../../../src/assets/Images/thPic3.png';
// import wishlistEmpty from '../../../src/assets/Images/wishlistEmpty.svg';
import EmptyList from "./EmptyList";
import { useAuth } from "../../Context/AuthContextProvider";
import CreateFolderModal from "./CreateFolderModal";
import { createPortal } from "react-dom";
import { useGlobalDataCtx } from "../../Context/GlobalDataProvider";

const Wishlist = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // const [folders, setFolders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState({});
  const [showPastWishlist, setShowPastWishlist] = useState(false);
  const [createFolderModal, setCreateFolderModal] = useState(false);
  const { loginStatus } = useAuth();
  const { fetchWishListFolders, folders, fetchedPastWishlist } =
    useGlobalDataCtx();

  const fetchWishList = async (id) => {
    try {
      setIsLoading(true);
      // setFolderId(id);

      const res = await getUserWishList(id);
      if (res && res?.status) {
        setWishlist(res?.data?.wishlist); 
        console.log("cart data ",res?.data)
      } else {
        console.log("Error fetching WISHLIST", res);
      }
    } catch (error) {
      console.log("Error fetching WISHLIST", error);
    }
    setIsLoading(false);
  };

  const deleteWishlistActivities = async (activityId) => {
    // console.log({ activityId, folderId });
    // return;
    try {
      setIsLoading(true);
      const res = await addToWishlist({
        activityId,
        folderId: selectedFolder?._id,
      });
      if (res && res?.status) {
        // toast.success(res?.message || 'Activity removed from Wishlist');
        fetchWishList(selectedFolder?._id);
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  const folderList = (
    <>
      {folders?.length > 0 ? (
        folders?.map((item, i) => {
          return (
            <div
              className="col-xl-3 col-lg-4 col-md-6 col-12 mb-3"
              key={i}
              onClick={(e) => {
                e.preventDefault();
                fetchWishList(item?._id);
                setShowWishlist(true);
                setSelectedFolder(item);
              }}
            >
              <Link onClick={(e) => e.preventDefault()} className="wishListAn">
                <div className="wishListCard">
                  <figure className="wishListFig">
                    <img src={item?.image || emptyImg} alt="" />
                  </figure>
                  <div>
                    <p className="wishCustName">
                      {item?.folderName?.toUpperCase()}
                    </p>
                    <p className="wishActivity">
                      <span>{item?.totalActivity}</span>{" "}
                      {item?.totalActivity < 2 ? "activity" : "activities"}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })
      ) : (
        <EmptyList />
      )}
    </>
  );

  const wishlistActivitiesList = (
    <div>
      <div className="folderBackDiv">
        <button
          type="button"
          className="edinParagraph backFoldBtn"
          style={{ fontWeight: "700" }}
          onClick={(e) => {
            e.preventDefault();
            setShowWishlist(false);
            setWishlist([]);
            fetchWishListFolders();
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
        >
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <button className="edinParagraph foldTextBtn">
          {selectedFolder?.folderName?.toUpperCase()}
        </button>
      </div>
      {wishlist?.length !== 0 ? (
        wishlist?.map((item, i) => {
          return (
            <>
              <div className="wishlistItems" key={i}>
                <div className="wishCardRow">
                  <div className="wishCardFig">
                    <img
                      onClick={() => {
                        navigate(
                          `/activity/${item?.activity_details?._id}/${item?.activity_details?.slug}`
                        );
                      }}
                      src={item?.activity_details?.image}
                      alt="wishlistImage"
                    />
                  </div>

                  <div className="wishlistRight">
                    <div className="entryWishStar">
                      <h5 className="titleStyle">Entry Ticket</h5>
                      <div>
                        <div className="rateWishStar">
                          <span className="rateWishSpan">
                            {item?.activity_details?.reviewRating?.toFixed(1)}
                          </span>
                          <div className="rateWishStarDiv">
                            {/* <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i> */}
                            <i
                              data-star={item?.activity_details?.reviewRating?.toFixed(
                                1
                              )}
                              style={{ fontSize: "20px" }}
                            ></i>
                          </div>
                        </div>
                        <p className="numReview">
                          ({item?.activity_details?.totalReview} reviews)
                        </p>
                      </div>
                    </div>
                    <p
                      className="mainTitle"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate(
                          `/activity/${item?.activity_details?._id}/${item?.activity_details?.slug}`
                        );
                      }}
                    >
                      {item?.activity_details?.activityTitle}
                    </p>
                    <div className="timePriceDiv">
                      <p className="timeWishPara">
                        {item?.activity_details?.tourDuration?.value}{" "}
                        {item?.activity_details?.tourDuration?.unit}
                      </p>
                      <div>
                        <p className="fromPriceText">From</p>
                        <div className="perWishText">
                          <span
                            style={{
                              fontWeight: 700,
                              fontSize: 25,
                              fontFamily: "Josefin Sans",
                            }}
                          >
                            {" "}
                            {item?.activity_details?.currency?.symbol}
                            {item?.activity_details?.activityAdultPrice}{" "}
                          </span>{" "}
                          <p>per person</p>
                        </div>
                      </div>
                    </div>
                    <Link
                      className="btn btn-sm btn-danger text-light edinParagraph rmvLnkBtn"
                      style={{ fontWeight: "700" }}
                      onClick={async (e) => {
                        e.preventDefault();
                        // deleteFolder(item?._id);
                        await deleteWishlistActivities(
                          item?.activity_details?._id
                        );
                        if (wishlist?.length === 1) {
                          fetchWishListFolders();
                          window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                          });
                          setShowWishlist(false);
                        }
                      }}
                    >
                      Remove
                    </Link>
                  </div>
                </div>
              </div>
            </>
          );
        })
      ) : (
        <EmptyList />
      )}
    </div>
  );

  const pastWishlistActivityList = (
    <div>
      {fetchedPastWishlist?.length !== 0 ? (
        fetchedPastWishlist?.map((item, i) => {
          return (
            <>
              <div className="wishlistItems" key={i}>
                <div className="wishCardRow">
                  <div className="wishCardFig">
                    <img
                      onClick={() => {
                        navigate(
                          `/activity/${item?.activity_details?._id}/${item?.activity_details?.slug}`
                        );
                      }}
                      src={item?.activity_details?.image}
                      alt="wishlistImage"
                    />
                  </div>

                  <div className="wishlistRight">
                    <div className="entryWishStar">
                      <h5 className="titleStyle">Entry Ticket</h5>
                      <div>
                        <div className="rateWishStar">
                          <span className="rateWishSpan">
                            {item?.activity_details?.reviewRating?.toFixed(1)}
                          </span>
                          <div className="rateWishStarDiv">
                            {/* <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i> */}
                            <i
                              data-star={item?.activity_details?.reviewRating?.toFixed(
                                1
                              )}
                              style={{ fontSize: "20px" }}
                            ></i>
                          </div>
                        </div>
                        <p className="numReview">
                          ({item?.activity_details?.totalReview} reviews)
                        </p>
                      </div>
                    </div>
                    <p
                      className="mainTitle"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate(
                          `/activity/${item?.activity_details?._id}/${item?.activity_details?.slug}`
                        );
                      }}
                    >
                      {item?.activity_details?.activityTitle}
                    </p>
                    <div className="timePriceDiv">
                      <p className="timeWishPara">
                        {item?.activity_details?.tourDuration?.value}{" "}
                        {item?.activity_details?.tourDuration?.unit}
                      </p>
                      <div>
                        <p className="fromPriceText">From</p>
                        <div className="perWishText">
                          <span
                            style={{
                              fontWeight: 700,
                              fontSize: 25,
                              fontFamily: "Josefin Sans",
                            }}
                          >
                            {" "}
                            {item?.activity_details?.currency?.symbol}
                            {item?.activity_details?.activityActualPrice}{" "}
                          </span>{" "}
                          <p>per person</p>
                        </div>
                      </div>
                    </div>
                    <Link
                      className="btn btn-sm btn-danger text-light edinParagraph rmvLnkBtn"
                      style={{ fontWeight: "700" }}
                      onClick={async (e) => {
                        e.preventDefault();
                        // deleteFolder(item?._id);
                        await deleteWishlistActivities(
                          item?.activity_details?._id
                        );
                        if (wishlist?.length === 1) {
                          fetchWishListFolders();
                          window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                          });
                          setShowWishlist(false);
                        }
                      }}
                    >
                      Remove
                    </Link>
                  </div>
                </div>
              </div>
            </>
          );
        })
      ) : (
        <EmptyList />
      )}
    </div>
  );

  const wishlistAndFolder = !showWishlist ? folderList : wishlistActivitiesList;

  return (
    <>
      {createFolderModal &&
        createPortal(
          <CreateFolderModal
            createFolderModal={createFolderModal}
            setCreateFolderModal={setCreateFolderModal}
            fetchWishListFolders={fetchWishListFolders}
          />,
          document.getElementById("createFolderModalOverlay")
        )}

      <MainLoader isLoading={isLoading} />
      <div style={{ padding: "0 4%" }}>
        <div className="wishListHeadDiv">
          <h1 className="wishlistHeading">Your Wishlist</h1>
          <button
            className="cretNewList"
            onClick={(e) => {
              e.preventDefault();
              setCreateFolderModal(true);
            }}
          >
            <span>
              <i class="fa-solid fa-plus"></i>
            </span>{" "}
            Create a new list
          </button>
        </div>
        <div className="wishTabDiv">
          <Tabs>
            <TabList>
              <Tab
                onClick={() => {
                  setShowPastWishlist(false);
                }}
              >
                Upcoming
              </Tab>
              <Tab
                onClick={() => {
                  setShowPastWishlist(true);
                }}
              >
                Past
              </Tab>
            </TabList>
            {loginStatus ? (
              <>
                <TabPanel>
                  <div>
                    <div className="row wishTabRow">
                      {!showPastWishlist && wishlistAndFolder}
                    </div>
                  </div>
                </TabPanel>
                {showPastWishlist && pastWishlistActivityList}
              </>
            ) : (
              <EmptyList />
            )}
          </Tabs>
        </div>

        {/* {!showWishlist ? (
          <div
            style={{
              display: 'flex',
              gap: '5px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {folders?.length > 0 ? (
              folders?.map((item, i) => {
                return (
                  <div className="card" style={{ width: '15rem' }} key={i}>
                    <img src={item?.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title text-primary" style={{ borderBottom: '1.5px solid #868e96' }}>
                        {item?.folderName?.toUpperCase()}
                      </h5>
                      <Link
                        // className="btn btn-warning"
                        className="btn btn-sm btn-dark text-light edinParagraph"
                        style={{ fontWeight: '700' }}
                        onClick={e => {
                          e.preventDefault();
                          fetchWishList(item?._id);
                          setShowWishlist(true);
                          setSelectedFolder(item);
                        }}
                      >
                        View &nbsp;
                        <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                      <Link
                        className="btn btn-warning ml-3"
                        // style={{ fontWeight: '700', letterSpacing: '3px' }}
                        onClick={e => {
                          e.preventDefault();
                          deleteFolder(item?._id);
                        }}
                      >
                        <i className="fa-solid fa-xmark" style={{ color: '#e21212' }} />
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                className="mt-5"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <img src={emptyBox} alt="" height="100px" width="100px" className="fade-in" />
                <h5
                  style={{
                    textAlign: 'center',
                    color: 'red',
                    padding: '20px',
                    fontSize: '25px',
                  }}
                  className="tracking-in-expand"
                >
                  {'No Folders Found'}
                </h5>
              </div>
            )}
          </div>
        ) : (
          <div>
            <button className="btn btn-sm btn-dark text-light edinParagraph">
              Folder Name : {selectedFolder?.folderName?.toUpperCase()}
            </button>
            <div className="mb-3 mt-3">
              <button
                type="button"
                className="btn btn-sm btn-dark text-light edinParagraph"
                style={{ fontWeight: '700' }}
                onClick={e => {
                  e.preventDefault();
                  setShowWishlist(false);
                  setWishlist([]);
                  fetchWishListFolders();
                  window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                  });
                }}
              >
                Go Back &nbsp;
                <i className="fa-solid fa-arrow-right fa-rotate-180"></i>
              </button>
            </div>
            {wishlist?.length !== 0 ? (
              wishlist?.map((item, i) => {
                return (
                  <>
                    <div className="wishlistItems" key={i}>
                      <div className="wishCardRow">
                        <div className="wishCardFig">
                          <img
                            onClick={() => {
                              navigate(`/activity/${item?.activity_details?._id}/${item?.activity_details?.slug}`);
                            }}
                            src={item?.activity_details?.image}
                            alt="wishlistImage"
                          />
                        </div>

                        <div className="wishlistRight">
                          <div className="entryWishStar">
                            <h5 className="titleStyle">Entry Ticket</h5>
                            <div>
                              <div className="rateWishStar">
                                <span className="rateWishSpan">4.9</span>
                                <div className="rateWishStarDiv">
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                </div>
                              </div>
                              <p className="numReview">(279 reviews)</p>
                            </div>
                          </div>
                          <p
                            className="mainTitle"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              navigate(`/activity/${item?.activity_details?._id}/${item?.activity_details?.slug}`);
                            }}
                          >
                            {item?.activity_details?.activityTitle}
                          </p>
                          <div className="timePriceDiv">
                            <p className="timeWishPara">6.5 hours</p>
                            <div>
                              <p className="fromPriceText">From</p>
                              <div className="perWishText">
                                <span
                                  style={{
                                    fontWeight: 700,
                                    fontSize: 25,
                                    fontFamily: 'Josefin Sans',
                                  }}
                                >
                                  {' '}
                                  {item?.activity_details?.currency?.symbol}
                                  {item?.activity_details?.activityActualPrice}{' '}
                                </span>{' '}
                                <p>per person</p>
                              </div>
                            </div>
                          </div>
                          <Link
                            className="btn btn-sm btn-danger text-light edinParagraph rmvLnkBtn"
                            style={{ fontWeight: '700' }}
                            onClick={e => {
                              e.preventDefault();
                              // deleteFolder(item?._id);
                              deleteWishlistActivities(item?.activity_details?._id);
                            }}
                          >
                            Remove
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <img src={emptyBox} alt="" height="100px" width="100px" className="fade-in" />
                <h5
                  style={{
                    textAlign: 'center',
                    color: 'red',
                    padding: '20px',
                    fontSize: '25px',
                  }}
                >
                  {!isLoading && 'Your Wishlist Folder Is Currently Empty'}
                </h5>
              </div>
            )}
          </div>
        )} */}
      </div>
    </>
  );
};

export default Wishlist;
