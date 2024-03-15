import React from 'react'

import image1 from "../../assets/Images/activities/1st.png";
import image2 from "../../assets/Images/activities/2nd.png";
import image3 from "../../assets/Images/activities/3rd.png";
import image4 from "../../assets/Images/activities/4th.png";
import image5 from "../../assets/Images/activities/5th.png";
import image6 from "../../assets/Images/activities/6th.png";

const recomTours = [
    {
        id: 1,
        image: image1,
        head: '1. Drinking "The New Paris" Walking Tour with Lindsey Tramuta',
        desc: "Join Paris-based journalist Lindsey Tramuta on a guided walk through the neighborhoods of East Paris. Through tastings at three different",
    },
    {
        id: 2,
        image: image2,
        head: '1. Drinking "The New Paris" Walking Tour with Lindsey Tramuta',
        desc: "Join Paris-based journalist Lindsey Tramuta on a guided walk through the neighborhoods of East Paris. Through tastings at three different",
    },
    {
        id: 3,
        image: image3,
        head: '1. Drinking "The New Paris" Walking Tour with Lindsey Tramuta',
        desc: "Join Paris-based journalist Lindsey Tramuta on a guided walk through the neighborhoods of East Paris. Through tastings at three different",
    },
    {
        id: 4,
        image: image4,
        head: '1. Drinking "The New Paris" Walking Tour with Lindsey Tramuta',
        desc: "Join Paris-based journalist Lindsey Tramuta on a guided walk through the neighborhoods of East Paris. Through tastings at three different",
    },
    {
        id: 5,
        image: image5,
        head: '1. Drinking "The New Paris" Walking Tour with Lindsey Tramuta',
        desc: "Join Paris-based journalist Lindsey Tramuta on a guided walk through the neighborhoods of East Paris. Through tastings at three different",
    },
    {
        id: 6,
        image: image6,
        head: '1. Drinking "The New Paris" Walking Tour with Lindsey Tramuta',
        desc: "Join Paris-based journalist Lindsey Tramuta on a guided walk through the neighborhoods of East Paris. Through tastings at three different",
    },
];
const RecommendedActivities = () => {
    return (
        <div className="mt-5">
            <section className="activities searchPageActivity">
                <div className="container">
                    <p className="topActHead">Our most recommended things to do in New Delhi</p>
                    <div className="paris-tour text-center">
                        <div className="row">
                            {recomTours.map((elem) => {

                                const { id, image, head, desc } = elem;

                                return (
                                    <div className="col-xl-6 col-12 mb-4 mb-md-0" key={id}>
                                        <div className="row">
                                            <div className="col-md-4 col-12">
                                                <img src={image} alt="" className="img-fluid" />
                                            </div>

                                            <div className="col-md-8 col-12 mt-3 mt-md-0">
                                                <div className="paris">
                                                    <h4>
                                                        {head}
                                                    </h4>
                                                    <p>
                                                        {desc}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="read">
                                                <a href="">Read more</a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default RecommendedActivities