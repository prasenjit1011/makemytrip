import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './custom.css';
import App from './App';
import { Toaster } from 'react-hot-toast';
import AuthContextProvider from './Context/AuthContextProvider';
import CartProvider from './Context/CartProvider';
import GlobalDataProvider from './Context/GlobalDataProvider';
import HomeContext from './Context/HomeContext'; 
// import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Toaster position="top-center" reverseOrder={false} />
    <AuthContextProvider>
      <GlobalDataProvider>
        <HomeContext>
        <CartProvider> 
        
          <App /> 
      
        </CartProvider>
        </HomeContext>
      </GlobalDataProvider>
    </AuthContextProvider>
  </>
);
