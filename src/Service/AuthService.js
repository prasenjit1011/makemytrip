import HttpClient from '../utils/HttpClient';
import axios from 'axios';



async function login(data) {
  let endPoint = 'v1/user/login';
  return HttpClient.post(endPoint, data);
}

async function register(data) {
  let endPoint = 'v1/user/register';
  return HttpClient.post(endPoint, data);
}
async function getProfile(data) {
  let endPoint = 'v1/user/getProfile';
  return HttpClient.get(endPoint);
}
async function loginWithGoogle(data) {
  let endPoint = 'v1/user/loginWithGoogle';
  return HttpClient.post(endPoint, data);
}

async function registerWithGoogle(data) {
  let endPoint = 'v1/user/registerWithGoogle';
  return HttpClient.post(endPoint, data);
}

//....................Reset Password Section........

async function SendOTP_inMail(data) {
  let endPoint = 'v1/user/otp-send-to-email';
  return HttpClient.post(endPoint, data);
}

async function UpdatePassword(data) {
  
  let endPoint = 'v1/user/change-password-without-token';
  return HttpClient.put(endPoint, data);
}

// async function UpdatePassword(data) {
//   let endPoint = 'v1/user/change-password-without-token';
//   // const res = await axios.post(endPoint, data);
//   return axios.post(endPoint, data);
// }





export default {
  login,
  register,
  getProfile,
  loginWithGoogle,
  registerWithGoogle,
  SendOTP_inMail,
  UpdatePassword

};
