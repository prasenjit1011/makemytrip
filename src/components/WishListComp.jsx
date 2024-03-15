import React, { useState } from 'react';
import WishlistModal from './Modal/WishlistModal';
import { useAuth } from '../Context/AuthContextProvider';
import { addToWishlist } from '../API_HELPERS/apiHelpers';
import { toast } from 'react-hot-toast';
import MainLoader from './Loaders/MainLoader';
import NewWishListModal from './Modal/NewWishListModal';
import { createPortal } from 'react-dom';
import { useGlobalDataCtx } from '../Context/GlobalDataProvider';

const WishListComp = ({ item, fetchActivity, showEmptyHeart, folderId }) => {
  const { loginStatus, setShowLoginModal } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const { fetchWishListFolders } = useGlobalDataCtx();

  const wishlistHandler = async (activityId, folderId) => {
    console.log("activityId", activityId, folderId)
    try {
      setIsLoading(true);
      const res = await addToWishlist({ activityId, folderId });
      if (res && res?.status) {
        if (fetchActivity) fetchActivity();
        setShowWishlistModal(false);
        fetchWishListFolders();
      } else {
        toast.error(res?.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error?.message || 'Something went wrong');
    }
    setIsLoading(false);
  };

  const filledHeart = (
    <>
      <i
        className="fa-solid fa-heart"
        style={{ cursor: 'pointer', color: '#f95d12' }}
        onClick={() => {
          wishlistHandler(item?._id, folderId);
        }}
      ></i>
    </>
  );

  const emptyHeart = (
    <i
      className="fa-regular fa-heart"
      style={{ cursor: 'pointer', color: '#f95d12' }}
      onClick={() => {
        if (!loginStatus) {
          return setShowLoginModal(true);
        }
        setShowWishlistModal(true);
      }}
    />
  );
  // console.log('WISHIST', loginStatus, showEmptyHeart);
  // return (
  //   <>
  //     <MainLoader isLoading={isLoading} />
  //     {loginStatus && showEmptyHeart ? filledHeart : emptyHeart}
  //     {loginStatus && showWishlistModal && (
  //       <WishlistModal
  //         setShowWishlistModal={setShowWishlistModal}
  //         wishlistHandler={wishlistHandler.bind(null, item?._id)}
  //       />
  //     )}
  //   </>
  // );
  return (
    <>
      <MainLoader isLoading={isLoading} />
      {loginStatus && showEmptyHeart ? filledHeart : emptyHeart}
      {loginStatus &&
        showWishlistModal &&
        createPortal(
          <NewWishListModal
            setShowWishlistModal={setShowWishlistModal}
            wishlistHandler={wishlistHandler.bind(null, item?._id)}
          />,
          document.getElementById('wishlistOverlay')
        )}
    </>
  );
};

export default WishListComp;
