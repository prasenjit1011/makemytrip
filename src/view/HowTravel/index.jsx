import React from 'react'
import travelKids from '../../assets/Images/travelKids.png'
import travelKids2 from '../../assets/Images/travelKids2.png'

function index() {
    return (
        <>
            <section>
                <figure className="travFig">
                    <img src={travelKids} alt="travel kids" />
                </figure>
                <div className="nineItsDiv">
                    <h1 className="nineAdvHead">9 aventuras salvajes en África</h1>
                    <p className="itIsPara">
                        It is a long established fact that a reader will be distracted by the
                        readable content of a page when looking at its layout. The point of using
                        Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                        as opposed to using 'Content here, content here', making it look like
                        readable English. Many desktop publishing packages and web page editors
                        now use Lorem Ipsum as their default model text, and a search for 'lorem
                        ipsum' will uncover many web sites still in their infancy. Various
                        versions have evolved over the years, sometimes by accident, sometimes on
                        purpose (injected humour and the like).
                    </p>
                </div>
                <figure className="travFig2">
                    <img
                        src={travelKids2}
                        alt=" travel kids two"
                    />
                </figure>
                <div className="nineItsDiv">
                    <h1 className="nineAdvHead">9 aventuras salvajes en África</h1>
                    <p className="itIsPara">
                        It is a long established fact that a reader will be distracted by the
                        readable content of a page when looking at its layout. The point of using
                        Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                        as opposed to using 'Content here, content here', making it look like
                        readable English. Many desktop publishing packages and web page editors
                        now use Lorem Ipsum as their default model text, and a search for 'lorem
                        ipsum' will uncover many web sites still in their infancy. Various
                        versions have evolved over the years, sometimes by accident, sometimes on
                        purpose (injected humour and the like).
                    </p>
                    <p className="itIsPara">
                        It is a long established fact that a reader will be distracted by the
                        readable content of a page when looking at its layout. The point of using
                        Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                        as opposed to using 'Content here, content here', making it look like
                        readable English. Many desktop publishing packages and web page editors
                        now use Lorem Ipsum as their default model text, and a search for 'lorem
                        ipsum' will uncover many web sites still in their infancy. Various
                        versions have evolved over the years, sometimes by accident, sometimes on
                        purpose (injected humour and the like).
                    </p>
                </div>
            </section>
        </>

    )
}

export default index