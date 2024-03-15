import React from 'react';
// import loaderImg from '../../assets/ghost.gif';
// import loaderImg from '../../assets/spinner.gif';
// import loaderImg from '../../assets/greenSpinner.gif';
// import loaderImg from '../../assets/purpleSpinner.gif';
// import loaderImg from '../../assets/beanEater.gif';
// import loaderImg from '../../assets/fanSpinner.gif';
// import loaderImg from '../../assets/eclipse.gif';
import LoaderImage from '../../assets/gif/loader.gif'
// Transparent backgroundColor="rgba(248, 249, 250, 0)"

const LoadingScreen = ({ loaderSrc, displayProperty, backgroundColor, userLoaderStyles, userLoadingTextStyles }) => {
  const loaderStyles = {
    height: '200px',
    width: '200px',
    ...userLoaderStyles,
  };
  const loadingTextStyles = {
    color: '#ffa94d',
    fontSize: '20px',
    fontWeight: '700',
    ...userLoadingTextStyles,
  };

  return (
    <span
      style={{
        display: displayProperty || 'none',
        position: 'fixed',
        zIndex: '99999',
        left: '0',
        top: '0',
        right: '0',
        margin: '0 auto',
        background: backgroundColor || 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        height: '100vh',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <img src={LoaderImage} alt="" height={loaderStyles?.height} width={loaderStyles?.width} />
        {/* <p style={loadingTextStyles}>Loading...</p> */}
      </div>
    </span>
  );
};

export default LoadingScreen;
