import { useAuth } from '../Context/AuthContextProvider';
import { Navigate, Outlet, useLoaderData } from 'react-router-dom';
import HttpClient from '../utils/HttpClient';

const CheckRoutes = () => {
  const { loginStatus } = useAuth();
  const data = useLoaderData();

  return loginStatus ? <Outlet /> : <Navigate to={`/?lan=eng&currentTab=${data?.[0]?._id}`} />;
};

export default CheckRoutes;

export const activityTypesLoader = async () => {
  try {
    let res = await HttpClient.requestData('v1/user/viewActivityType');
    if (res && res.status) {
      console.log('TEST', res?.data?.[0]?._id);
      return res?.data;
    } else {
      console.log('ERROR LOADING ACTIVITY TYPES', res);
      return res;
    }
  } catch (error) {
    console.log('ERROR LOADING ACTIVITY TYPES', error);
    return error;
  }
};
