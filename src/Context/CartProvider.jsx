import { useContext, createContext, useState, useEffect } from 'react';
import { addCartData, deleteCartItem, deleteGiftCartItem, getCartData } from '../API_HELPERS/apiHelpers';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContextProvider';
import moment from 'moment';

const cartContext = createContext({});
export const useCartContext = () => useContext(cartContext);

const CartProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [showTimer, setShowTimer] = useState(false);
  // const [cartTimers, setCartTimers] = useState([]);

  const [cart, setCart] = useState([]);
  console.log("bhjhh",cart)
  const { loginStatus } = useAuth();

  // const convertToTimeStamp = timeString => {
  //   const todayDate = moment().format('YYYY-MM-DD');
  //   // const timeString = '11:40:33 AM';
  //   const format = 'YYYY-MM-DD h:mm:ss A';

  //   const combinedDateTimeString = `${todayDate} ${timeString}`;
  //   const timestamp = moment(combinedDateTimeString, format).valueOf();
  //   // console.log('timestamp', timestamp);
  //   return timestamp;
  // };

  const fetchCartData = async () => {
    try {
      setIsLoading(true);
      const res = await getCartData();
      if (res && res?.status) {
        console.log('CART_DATA', res?.data);
        setCart(res?.data);

        // const x = res?.data?.cart_activity?.map(item => {
        //   return {
        //     ...item,
        //     cartTimer: convertToTimeStamp(item?.timeAfter10Mint),
        //   };
        // });
        // setCartTimers(x);
        // console.log('CART_TIMERS', x);

        // setShowTimer(() => {
        //   if (res?.data?.cart_activity.length > 0) return true;
        //   else {
        //     localStorage.removeItem('timer');

        //     return false;
        //   }
        // });
      } else {
        console.log('Error fetching cart data', res);
      }
    } catch (error) {
      console.log('Error fetching cart data', error);
    }
    setIsLoading(false);
  };

  const removeCartItem = async id => {
    console.log('idddcart', id);
    try {
      setIsLoading(true);
      const res = await deleteCartItem(id);
      if (res && res?.status) {
        toast.success('Activity removed from cart successfully');
        fetchCartData();
      } else {
        toast.error(res?.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error?.message || 'Something went wrong');
    }
    setIsLoading(false);
  };

  const removeGiftCartItem = async id => {
    console.log('idddcart', id);
    try {
      setIsLoading(true);
      const res = await deleteGiftCartItem(id);
      if (res && res?.status) {
        toast.success('Gift Card removed successfully');
        fetchCartData();
      } else {
        toast.error(res?.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error?.message || 'Something went wrong');
    }
    setIsLoading(false);
  };

  // const addToCart = async data => {
  //   try {
  //     setIsLoading(true);
  //     const res = await addCartData(data);
  //     if (res && res?.status) {
  //       toast.success('Activity added to Cart');
  //       fetchCartData();
  //     } else {
  //       toast.error(res?.message || 'Something went wrong');
  //     }
  //   } catch (error) {
  //     toast.error(error?.message || 'Something went wrong');
  //   }
  //   setIsLoading(false);
  // };

  useEffect(() => {
    fetchCartData();
  }, [loginStatus]);

  return (
    <cartContext.Provider
      value={{
        cart,
        setCart,
        fetchCartData,
        removeCartItem,
        removeGiftCartItem,
        // addToCart,
        isLoading,
        // showTimer,
        // setShowTimer,
        // cartTimers,
        // setCartTimers,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;
