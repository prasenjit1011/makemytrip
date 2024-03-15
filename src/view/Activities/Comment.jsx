import React from 'react'

const Comment = () => {
  return (
    <div>
         <section className="comment">
        <div className="container-fluid">
          <div className="STAR">
            <div className="review">
              <div className="date">
                <div className="icon">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <p>13/05/2023</p>
              </div>
              <p>
                Bruno was Amazing. Very friendly, knowledgeable and outgoing !
              </p>
            </div>
            <div className="Review-sara">
              <p>
                Review <span> Sara </span>
              </p>
              <span>
                From Paris: Versailles Skip-the-Line Tour & Gardens Access
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Comment