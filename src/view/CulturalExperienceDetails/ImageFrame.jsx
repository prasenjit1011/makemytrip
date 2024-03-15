import * as React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
// import Frame1 from '../../assets/Images/detailsFrame1.png';
// import Frame2 from '../../assets/Images/detailsFrame2.png';
// import Frame3 from '../../assets/Images/detailsFrame3.png';
// import Frame4 from '../../assets/Images/detailsFrame4.png';
// import Frame5 from '../../assets/Images/detailsFrame5.png';
// import { useAuth } from '../../Context/AuthContextProvider';
import WishListComp from '../../components/WishListComp';

const ImageFrame = ({ detail, fetchActivity }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <section className="imageFramePart py-4 fade-in">
        <div className="container-fluid imageFrameContainerPart">
          <div className="row imageFrameParent">
            <div className="col-lg-4 col-md-5 imageFrameSubParent imageFrameSubParentLeft">
              <figure className="imageFrameMainPart" onClick={() => setOpen(true)}>
                <img src={detail?.image[1]} alt="" className="img-fluid" />
              </figure>
            </div>

            <div className="col-lg-4 col-md-5 imageFrameSubParent">
              <figure className="detailFrame2Parent imageFrameMainPart">
                <img src={detail?.image[2]} alt="" className="img-fluid" onClick={() => setOpen(true)} />

                <WishListComp
                  item={detail}
                  fetchActivity={fetchActivity}
                  showEmptyHeart={detail?.Iswishlist}
                  folderId={detail?.wishlist?.[0]?.folderId}
                />
              </figure>
            </div>
          </div>

          <div className="row imageFrameParent">
            <div className="col-lg-4 col-md-5 imageFrameSubParent imageFrameSubParentLeft">
              <figure className="imageFrameMainPart" onClick={() => setOpen(true)}>
                <img src={detail?.image[3]} alt="" className="img-fluid" />
              </figure>
            </div>

            <div className="col-lg-4 col-md-5 imageFrameSubParent">
              <figure className="detailFrame4Parent imageFrameMainPart" onClick={() => setOpen(true)}>
                <img src={detail?.image[4]} alt="" className="img-fluid" />
                <a href="#" className="viewImagesPart">
                  View all {detail?.image.length} images <i className="fa-regular fa-images" />
                </a>
              </figure>
            </div>
          </div>

          <figure className="overImg d-none d-lg-block" onClick={() => setOpen(true)}>
            <img src={detail?.image?.[0]} alt="" className="img-fluid" />
          </figure>
        </div>

        {/**** */}
        {/* <button type="button" onClick={() => setOpen(true)}>
        Open Lightbox
      </button> */}
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={detail?.image.map(item => {
            return { src: item };
          })}
        />
      </section>
    </>
  );
};

export default ImageFrame;
