import React, { useEffect, useState } from "react";
import ActivityTopInfo from "./ActivityTopInfo";
import ImageFrame from "./ImageFrame";
import AboutActivity from "./AboutActivity";
import ExperienceMap from "./ExperienceMap";
import YouMight from "./YouMight";
import CustomerReview from "./CustomerReview";
import TravelType from "./TravelType";
import { useParams } from "react-router-dom";
import ActivityService from "../../Service/ActivityService";
// import { getYouMightLike } from '../../API_HELPERS/apiHelpers';
import MainLoader from "../../components/Loaders/MainLoader";
import { useAuth } from "../../Context/AuthContextProvider";
import useRatings from "../../Hooks/Ratings/useRatings";

const Index = () => {
  const { id, slug } = useParams();
  const [activityDetail, setActivityDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { loginStatus } = useAuth();
  const { setFilledStarLength, ratingsComp, setHalfStarLength, resetter } =
    useRatings({
      disableClick: true,
      totalStars: 5,
    });
  // const [numPersons, setNumPersons] = useState({
  //   adult: 0,
  //   children: 0,
  // });

  // console.log("numPersonsyyfg",activityDetail?.participentType?.length>0)
  const [numPersons, setNumPersons] = useState([]);
  const [calendarShow, setCalendarShow] = useState(false);

  // console.log("numPersonsyy", numPersons);

  const [page, setPage] = useState(1);
  const fetchActivity = async () => {
    setIsLoading(true);
    let res;

    if (loginStatus) {
      res = await ActivityService.getSingleActivityDetail(id, slug, page);
    } else {
      res = await ActivityService.getActivityDetail(id, slug, page);
    }
    // console.log(`FETCHED SINGLE ACTIVITY with login status ${loginStatus}`, res?.data);

    if (res && res.status && res.data.length > 0) {
      console.log("hjkhkh", res);
      setActivityDetail(res.data[0]);
      console.log("activittt", res.data[0]);
      resetter();
      if (String(res?.data[0]?.avgRating).includes(".")) {
        setHalfStarLength(1);
      }
      setFilledStarLength(Math.trunc(res?.data[0]?.avgRating));
    } else {
      console.log(
        `ERROR FETCHING SINGLE ACTIVITY with login status ${loginStatus}`,
        res
      );
    }

    setIsLoading(false);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    fetchActivity();
  }, [id, slug, loginStatus]);

  useEffect(() => {
    // setNumPersons((()=>{
    //   return{
    //     adult:0,
    //     children:0
    //   }
    // })())
  }, [id, slug]);

  useEffect(() => {
    let persons = [];
    if (activityDetail?.participentType?.length > 0) {
      persons = activityDetail?.participentType?.map((ele, id) => {
        return {
          partyname: ele?.pertype,
          count: 0,
          price: ele?.price,
          age: ele?.age,
          discountPrice: ele?.discountPrice,
          _id: ele?._id,
        };
      });
    }

    setNumPersons(persons);
  }, [activityDetail]);
  // console.log("person1234", numPersons);

  return (
    <div onClick={() => setCalendarShow(false)}>
      <MainLoader isLoading={isLoading} />
      <ActivityTopInfo detail={activityDetail} ratingsComp={ratingsComp} />
      <ImageFrame detail={activityDetail} fetchActivity={fetchActivity} />
      <AboutActivity
        calendarShow={calendarShow}
        setCalendarShow={setCalendarShow}
        detail={activityDetail}
        id={id}
        slug={slug}
        setNumPersons={setNumPersons}
        numPersons={numPersons}
      />
      <ExperienceMap detail={activityDetail} />
      <CustomerReview
        detail={activityDetail}
        ratingsComp={ratingsComp}
        id={id}
      />
      <TravelType detail={activityDetail} setPage={setPage} />

      <YouMight detail={activityDetail} />
    </div>
  );
};

export default Index;
