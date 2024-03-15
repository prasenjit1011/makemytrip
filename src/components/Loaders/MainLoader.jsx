import React from 'react';
import LoadingScreen from './LoadingScreen';
import { createPortal } from 'react-dom';

const MainLoader = ({ isLoading, loaderSrc, backgroundColor, userLoaderStyles, userLoadingTextStyles }) => {
  return (
    <>
      {createPortal(
        <LoadingScreen
          displayProperty={isLoading ? 'flex' : 'none'}
          loaderSrc={loaderSrc}
          backgroundColor={backgroundColor}
          userLoaderStyles={userLoaderStyles}
          userLoadingTextStyles={userLoadingTextStyles}
        />,
        document.getElementById('loaderDiv')
      )}
    </>
  );
};

export default MainLoader;
