import React from 'react'
import banner_bg from "../../assets/Images/Sightseeing.png";

function SightseeingParis({cityDetail}) {
    return (
        <>
            <section
                className="otherSecPart"
                style={{ backgroundImage: `url('${banner_bg}')`,  }}
            >
                <div className="othInnerDiv">
                    <p className="othTextP">
                        Other Sightseeing Options in <span>{cityDetail?.cityName}</span>
                    </p>
                    <div>
                        <span className="wantText">
                            Want to discover all there is to do in Sansevero Chapel?
                        </span>
                        <a href="#" className="clickAn">
                            Click here for a full list.
                        </a>
                    </div>
                </div>
            </section>

        </>
    )
}

export default SightseeingParis