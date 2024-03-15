import React from 'react'

const ReviewRating = ({ rating, totalReview }) => {
    return (
        <div>
            <div>
                {Array.from({ length: +Math.trunc(rating) }, () => 2)?.map((item, i) => {
                    return <i key={i + 1} className="fa-solid fa-star starRatingPart"></i>;
                })}
                {Array.from(
                    {
                        length: String(rating).includes('.') ? 1 : 0,
                    },
                    () => 2
                )?.map((item, i) => {
                    return <i key={i + 1} className="fa-regular fa-star-half-stroke starRatingPart"></i>;
                })}
                {Array.from(
                    {
                        length: String(rating).includes('.')
                            ? 5 - (Math.trunc(rating) + 1)
                            : 5 - Math.trunc(rating),
                    },
                    () => 2
                )?.map((item, i) => {
                    return <i key={i + 1} className="fa-regular fa-star starRatingPart"></i>;
                })}

                <span className="reviewText">{" " + rating?.toFixed(1) + " "}</span>
                {/* <span className="numberOfReviews">({totalReview} Reviews)</span> */}
            </div>
        </div>
    )
}

export default ReviewRating
