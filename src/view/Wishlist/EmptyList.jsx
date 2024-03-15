import React from 'react';
import { TabPanel } from 'react-tabs';
import wishlistEmpty from '../../../src/assets/Images/wishlistEmpty.svg';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContextProvider';

const EmptyList = props => {
  const { fetchedActivityTypes } = useAuth();
  return (
    <>
      <div className="wishEmpFigTeDiv">
        <div className="wishEmpFig">
          <img src={wishlistEmpty} alt="" />
        </div>
        <div className="emptyTextDiv">
          <p className="yoWishPara">{props?.title || 'Your wishlist is empty'}</p>
          <p className="saveActPara">Save activities to your wishlist by clicking on the heart icon.</p>
          <div className="findThinsDiv mt-2">
            <Link to={`/?lan=eng&currentTab=${fetchedActivityTypes?.[0]?._id}`} className="findThAN">
              Find things to do
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyList;
