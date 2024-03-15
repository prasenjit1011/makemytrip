import React, { useEffect } from 'react'
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import 'react-calendar/dist/Calendar.css';
import { Link, useParams } from 'react-router-dom';
import Activity from '../Home/Activity';
import BannerThings from '../Activities/BannerThings';
import Travel from '../Activities/Travel';
import RecommendedActivities from './RecommendedActivities';
import TopSearchedAttractions from './TopSearchedAttractions';
import ThingstodoNewDelhi from './ThingstodoNewDelhi';
import CitiesIndia from './CitiesIndia';
import PeoplesayingParis from '../ActivityParis/PeoplesayingParis';
import Peoplesayingsearchpageparis from './Peoplesayingsearchpageparis';
import '../SearchPage/Search.css';
import bookingPicOne from '../../../src/assets/Images/bookingPicOne.png';
import searchImg from '../../assets/Images/searchImg.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import DiscoverModal from '../../components/Modal/DiscoverModal';
import SearchBox from '../Activities/SearchBox';
import { useHome } from '../../Context/HomeContext';
import { useGlobalDataCtx } from '../../Context/GlobalDataProvider';
import TopActivies from './TopActivies';
import HomeService from '../../Service/HomeService';
import MainLoader from '../../components/Loaders/MainLoader';
import TopSites from './TopSites';
import AllActivity from './AllActivity';
import Questions from './Questions';
import PopularGuide from './PopularGuide';
import { toast } from 'react-hot-toast';

const SearchSites = ({ activities = [] }) => {
    const [startDate, setStartDate] = useState(new Date());
    const params = useParams();

    const [modalA, setModalA] = useState(false);
    const handleClick = () => {
        setModalA(!modalA);
    };

    const [value, onChange] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [searchData, setSearchData] = useState([]);

    console.log("searchDataSite", searchData);

    const tempData = [
        {
            "_id": "64d246c616b7410c04f21a3a",
            "slug": "natureexperience",
            "activityTitle": "London: Guided Day Trip To Brighton And Seven Sisters",
            "image": [
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/095c79f0-35f1-11ee-91e1-1f21c98eb1b3.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/0b02afe0-35f1-11ee-91e1-1f21c98eb1b3.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/0d38f0d0-35f1-11ee-91e1-1f21c98eb1b3.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/0f900030-35f1-11ee-91e1-1f21c98eb1b3.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/11f73c30-35f1-11ee-91e1-1f21c98eb1b3.jpg"
            ],
            "activityActualPrice": 750,
            "tourDuration": {
                "value": 8,
                "unit": "hours"
            },
            "duration": "Full Day(7+ Hours)",
            "categoryData": {
                "_id": "64d1e86899a6fb29f3922bce",
                "categoryName": "Private Tour"
            },
            "review": 0
        },
        {
            "_id": "64d244d216b7410c04f212d3",
            "slug": "mountainexperience",
            "activityTitle": "London To North Wales (mount Snowden, Conwy Caste,yr Wyddfa)",
            "image": [
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/bff4c750-35ef-11ee-82a3-8b1743cf205a.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/c21b50d0-35ef-11ee-82a3-8b1743cf205a.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/c4fe7390-35ef-11ee-82a3-8b1743cf205a.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/c8df7e50-35ef-11ee-82a3-8b1743cf205a.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/cad55ae0-35ef-11ee-82a3-8b1743cf205a.jpg"
            ],
            "activityActualPrice": 828,
            "tourDuration": {
                "value": 7,
                "unit": "hours"
            },
            "duration": "Full Day(7+ Hours)",
            "categoryData": {
                "_id": "64d0e72ad93f3cfbfaae6b4e",
                "categoryName": "Transfer"
            },
            "review": 0
        },
        {
            "_id": "64d2426e9e0372b11ec28bdf",
            "slug": "#cruiseexperience",
            "activityTitle": "From London: Lake District Tour With Cream Tea & Cruise",
            "image": [
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/7467eac0-35ee-11ee-82a3-8b1743cf205a.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/76263c90-35ee-11ee-82a3-8b1743cf205a.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/77d217d0-35ee-11ee-82a3-8b1743cf205a.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/79d1b860-35ee-11ee-82a3-8b1743cf205a.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/7c160310-35ee-11ee-82a3-8b1743cf205a.jpg"
            ],
            "activityActualPrice": 259,
            "tourDuration": {
                "value": 1,
                "unit": "days"
            },
            "duration": "Full Day(7+ Hours)",
            "categoryData": {
                "_id": "64968b9ce7f4d1c394496e65",
                "categoryName": "Day Trip"
            },
            "review": 0
        },
        {
            "_id": "64d2405f9e0372b11ec27d9b",
            "slug": "#nature #experience",
            "activityTitle": "From London: Seven Sisters And South Downs Full-day Tour",
            "image": [
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/ffb59bb0-35ec-11ee-82a3-8b1743cf205a.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/0195cd60-35ed-11ee-82a3-8b1743cf205a.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/03787010-35ed-11ee-82a3-8b1743cf205a.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/053c8e40-35ed-11ee-82a3-8b1743cf205a.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/075cd630-35ed-11ee-82a3-8b1743cf205a.jpg"
            ],
            "activityActualPrice": 99,
            "tourDuration": {
                "value": 10,
                "unit": "hours"
            },
            "duration": "Full Day(7+ Hours)",
            "categoryData": {
                "_id": "649692cfe7f4d1c394497012",
                "categoryName": "Guided tours"
            },
            "review": 0
        },
        {
            "_id": "64d23dc99e0372b11ec27689",
            "slug": "#beatlesexperience",
            "activityTitle": "London: Beatles In My Life Walking Tour With Richard Porter",
            "image": [
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/a55d83e0-35eb-11ee-82a3-8b1743cf205a.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/a7b1d420-35eb-11ee-82a3-8b1743cf205a.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/a9ae1950-35eb-11ee-82a3-8b1743cf205a.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/ab8152b0-35eb-11ee-82a3-8b1743cf205a.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/ae61dd60-35eb-11ee-82a3-8b1743cf205a.jpg"
            ],
            "activityActualPrice": 15,
            "tourDuration": {
                "value": 2,
                "unit": "hours"
            },
            "duration": "0-3 hours",
            "categoryData": {
                "_id": "649692cfe7f4d1c394497012",
                "categoryName": "Guided tours"
            },
            "review": 0
        },
        {
            "_id": "64d23bd29e0372b11ec26f66",
            "slug": "#experience",
            "activityTitle": "London: David Bowie Walking Tour",
            "image": [
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/81cded80-35ea-11ee-82a3-8b1743cf205a.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/840e1980-35ea-11ee-82a3-8b1743cf205a.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/865104a0-35ea-11ee-82a3-8b1743cf205a.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/88e40b90-35ea-11ee-82a3-8b1743cf205a.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/8b455420-35ea-11ee-82a3-8b1743cf205a.jpg"
            ],
            "activityActualPrice": 15,
            "tourDuration": {
                "value": 3,
                "unit": "hours"
            },
            "duration": "0-3 hours",
            "categoryData": {
                "_id": "649692cfe7f4d1c394497012",
                "categoryName": "Guided tours"
            },
            "review": 0
        },
        {
            "_id": "64d239215538a89f42a95e49",
            "slug": "#trainexperience",
            "activityTitle": "London: Stansted Express Airport Transfer To/from Stratford",
            "image": [
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/cccd5e80-35e8-11ee-b833-87f128ee1bb2.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/cf783330-35e8-11ee-b833-87f128ee1bb2.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/d1aec240-35e8-11ee-b833-87f128ee1bb2.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/d3b2f6b0-35e8-11ee-b833-87f128ee1bb2.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/d607e330-35e8-11ee-b833-87f128ee1bb2.jpg"
            ],
            "activityActualPrice": 21.9,
            "tourDuration": {
                "value": 1,
                "unit": "hours"
            },
            "duration": "0-3 hours",
            "categoryData": {
                "_id": "64d0e72ad93f3cfbfaae6b4e",
                "categoryName": "Transfer"
            },
            "review": 0
        },
        {
            "_id": "64d22afc838256e20f458ee2",
            "slug": "#natureexperience",
            "activityTitle": "Hampton Court Palace And Gardens Entrance Ticket",
            "image": [
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/39db16b0-35e0-11ee-a9bf-cd20c34b2df4.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/3ba43df0-35e0-11ee-a9bf-cd20c34b2df4.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/3e48aa00-35e0-11ee-a9bf-cd20c34b2df4.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/4042f360-35e0-11ee-a9bf-cd20c34b2df4.jpg",
                "https://thingstodos3bkt.s3.eu-west-1.amazonaws.com/activityDetails/image/427033a0-35e0-11ee-a9bf-cd20c34b2df4.jpg"
            ],
            "activityActualPrice": 26.3,
            "tourDuration": {
                "value": 1,
                "unit": "days"
            },
            "duration": "Full Day(7+ Hours)",
            "categoryData": {
                "_id": "649692f5e7f4d1c39449702f",
                "categoryName": "Entry Ticket"
            },
            "review": 0
        }
    ]

    const getSearchData = async () => {
        const sendData = {
            id: params?.id
        }

        setIsLoading(true);
        const res = await HomeService.homePageSearch(sendData);
        console.log("searchResSite", res)
        if (res && res?.status) {
            setIsLoading(false);
            setSearchData(res?.data);
        } else {
            setIsLoading(false);
            toast.error(toast?.message || "Something Went Wrong")
        }
    }

    useEffect(() => {
        getSearchData();
    }, [])


    return (
        <>
            <MainLoader isLoading={isLoading} />
            <section className="tabingPart" style={{ paddingTop: '27px' }}>

                {/* names */}
                <div className='container mt-4'>
                    <p className='thingsSmallHead'>Things to do in</p>
                    <p className='cityNameHead'>{params.city}</p>
                </div>



                {/* <TopActivies tempData={tempData} searchData={searchData} /> */}
                {/* <TopSites searchData={searchData} /> */}
                <AllActivity
                    activities={activities}
                    tempData={tempData}
                    searchData={searchData}
                // heading="C"
                />

                {/* <RecommendedActivities /> */}
                {/* <Questions /> */}
                {/* <TopSearchedAttractions /> */}
                {/* <ThingstodoNewDelhi /> */}
                {/* <CitiesIndia /> */}

                {/* Other Sightseeing Options */}

                {/* <Peoplesayingsearchpageparis /> */}
                {/* <PopularGuide /> */}

            </section>

            {modalA && <DiscoverModal closeModal={setModalA} />}
        </>
    );
};

export default SearchSites;
