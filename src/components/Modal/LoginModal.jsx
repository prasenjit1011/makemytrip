import React, { useState } from "react";
import toast from "react-hot-toast";
import AuthService from "../../Service/AuthService";
import { useAuth } from "../../Context/AuthContextProvider";
import aa from "../../assets/Images/googleIcon.png";
import bb from "../../assets/Images/facebookIcon.png";
import cc from "../../assets/Images/appleIcon.png";
// import ResetPasswordModel from "./ResetPasswordModel";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import "../../firebase/FireBase";
import MainLoader from "../Loaders/MainLoader";

const INITIAL = {
  email: "",
  password: "",
};

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function LoginModal({ setShowLoginModal, setShowSignUpModal }) {
  const [loginData, setLoginData] = useState(
    JSON.parse(JSON.stringify(INITIAL))
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setLoginStatus } = useAuth();

  //...........................................change pass & forget password
  const [resetPassFlag, setResetPassFlag] = useState(false);
  const [loaderflag, setloaderflag] = useState(false);
  const[pass_view_flag,setpass_view_flag]=useState({passflag:false,
    confirmpassflag:false})

  const [isSendOTP, setisSendOTP] = useState(false);
  const [isVerifyOTP, setisVerifyOTP] = useState(false);
  const [passemail, setpassemail] = useState("");
  const [apiOTP, setapiotp] = useState("");
  const [newpass, setnewpass] = useState("");
  const [otp, setotp] = useState("");

  const [userid, setuserid] = useState("");
  console.log("userid", userid);

 

  const changeHandler = (e) => {
    setLoginData((prev) => {
      let update = JSON.parse(JSON.stringify(prev));
      update[e.target.name] = e.target.value;
      return { ...update };
    });
  };
  const sendotpdata = async () => {
    setloaderflag(true);

    if (!emailRegex.test(passemail)) {
      setloaderflag(false);
      toast.error("Enter a valid email address");
      return 
    }else{
    const data = { email: passemail };

    try {
      const res = await AuthService.SendOTP_inMail(data);
      console.log("useridres", res);
      if (res && res.status) {
        toast.success(res?.message);
        setloaderflag(false);
        setisSendOTP(true);
        setuserid(res.id);
        setapiotp(res.otp);
        setpassemail("");
      } else {
        toast.error("Enter a valid Email ID");
        setloaderflag(false);
      }
    } catch (err) {
      setloaderflag(false);
      console.log(err);
    }
  }
  };
  const OTPchacker = (value) => {
    if (value === otp) {
      setisVerifyOTP(true);
      toast.success("OTP Verified Successfully");
    } else {
      toast.error("Enter a Valid OTP");
    }
  };

  const SendNewPassword = async () => {
    setloaderflag(true);
   
    if (newpass.toString().length >=8) {
      const data = {
        id: userid,
        newPassword: newpass,
      };

      try {
        const res = await AuthService.UpdatePassword(data);
        if (res && res.status) {
          setShowLoginModal(false)
          toast.success(res?.message);
          setloaderflag(false);
          setnewpass("")

        } else {
          toast.error("Enter a valid Email ID");
          setloaderflag(false);
        }
      } catch (err) {
        setloaderflag(false);
        console.log(err);
      }
    } else {
      setloaderflag(false);
      toast.error("Enter atlist 8 digit");
    }
  };

  //.....................login section

  const validator = ({ email, password }) => {
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address");
      return false;
    }

    // if (password.length < 8) {
    //   toast.error('Password should be greater or equal than eight characters');
    //   return false;
    // }
    return true;
  };

  // submit
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validator(loginData)) return;
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const res = await AuthService.login(loginData);
      console.log("LOGIN", res);

      if (res && res?.status) {
        setShowLoginModal(false);
        setLoginStatus(true);
        setLoginData(JSON.parse(JSON.stringify(INITIAL)));
        toast.success("Logged In Successfully");

        localStorage.setItem("token", res?.result?.token);
        localStorage.setItem("login", true);
        localStorage.setItem("userData", JSON.stringify(res?.result));
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
    setIsSubmitting(false);
  };

  // register  for sicial media
  const fetchGoogleSignUp = async (user) => {
    const data = {
      firstName: user?.displayName?.split(" ")?.[0]
        ? user.displayName?.split(" ")?.[0]
        : "",
      lastName: user?.displayName?.split(" ")?.[1]
        ? user.displayName?.split(" ")?.[1]
        : "",
      email: user?.email,
      googleId: user?.uid,
    };
    console.log("userregdf", data);
    setIsSubmitting(true);
    const res = await AuthService.registerWithGoogle(data);
    console.log("resSignggin", res);
    if (res && res?.status) {
      setShowSignUpModal(false);
      setShowLoginModal(true);
      setIsSubmitting(false);
      toast.success("Account created successfully");

      fetchGooglelogin(user);
    } else {
      toast.error(res?.message || "Something went wrong");
    }
  };

  // login for sicial media
  const fetchGooglelogin = async (user) => {
    const data = {
      email: user?.email,
      googleId: user?.uid,
    };
    setIsSubmitting(true);
    const res = await AuthService.loginWithGoogle(data);
    console.log("resGGldf", res);
    if (res && res?.status) {
      setShowLoginModal(false);
      setLoginStatus(true);
      toast.success("Logged In Successfully");

      localStorage.setItem("token", res?.result?.token);
      localStorage.setItem("login", true);
      localStorage.setItem("userData", JSON.stringify(res?.result));
    } else {
      fetchGoogleSignUp(user);
    }
  };

  // google log in
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        fetchGooglelogin(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  // facebook Login
  const facebookLogin = () => {
    const provider = new FacebookAuthProvider();

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log("userFb", user);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };

  //.............................ResetPassword section...........

  if (resetPassFlag) {
    if (isSendOTP) {
      if (isVerifyOTP) {
        return (
          <section className="loginSignUPSection">
            <MainLoader isLoading={loaderflag} />
            <div className="logParent">
              {/* close cross */}
              <span
                className="crossClass"
                onClick={() => setShowLoginModal(false)}
              >
                <i className="fa-solid fa-xmark" />
              </span>

              <h1 className="logHead">Reset Password</h1>
           
              <div className="mb-5">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <div className="" style={{ position: "relative" }}>
                  <input
                    style={{ padding: "5px 45px 5px 10px" }}
                    type={!showPassword ? "password" : "text"}
                    name="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter new password"
                    value={newpass}
                    onChange={(e) => setnewpass(e.target.value)}
                    required={true}
                  />
                  {/* <button
                      className="eyeicon_btn"
                      onClick={(e) => e.preventDefault()}
                    >
                      {!showPassword ? (
                        <i
                          class="fa-regular fa-eye"
                          onClick={() => {
                            setShowPassword(true);
                          }}
                        ></i>
                      ) : (
                        <i
                          class="fa-regular fa-eye-slash"
                          onClick={() => {
                            setShowPassword(false);
                          }}
                        ></i>
                      )}
                    </button> */}
                </div>
              </div>

{/* <div className="frmSubFieldDivs" style={{width:"25.4rem"}}>
                      <label htmlFor="password">New Password</label>
                      <div className="innerdiv">
                        <input
                          style={{ border: "none", textDecoration: "" }}
                          // type="password"
                          type={passwordVisible?.newpass ? "text" : "password"}
                          className=""
                          value={pass?.password}
                          name="password"
                          onChange={changeHandlerForPassword}
                        />
                        <i
                          className={`fa ${
                            passwordVisible.newpass ? "fa-eye-slash" : "fa-eye"
                          }`}
                          style={{ fontSize: "1.5rem", cursor: "pointer" }}
                          onClick={() =>
                            setPasswordVisible({
                              oldpass: false,
                              newpass: !passwordVisible?.newpass,
                            })
                          }
                        ></i>
                      </div>
                    {/* </div> */}
                    {/* <div className="frmSubFieldDivs">
                      <label htmlFor="password">Confirm Password</label>
                      <div className="innerdiv">
                        <input
                          style={{ border: "none", textDecoration: "" }}
                          // type="password"
                          type={pass? "text" : "password"}
                          className=""
                          value={confirmpass}
                          name="password"
                          onChange={(e)=>{setconfirmpass(e.target.value)}}
                        />
                        <i
                          className={`fa ${
                            pass_view_flag?.confirmpassflag ? "fa-eye-slash" : "fa-eye"
                          }`}
                          style={{ fontSize: "1.5rem", cursor: "pointer" }}
                          onClick={() =>{
                            setconfirmpassflag(!confirmpassflag)
                          }
                          }
                        ></i>
                      </div>
                    </div> */}
                  {/* </div>  */}




              {/* Reset Password Button */}
              <div className="creBtn">
                <button
                  onClick={() => {
                    // setisVerifyOTP(true);

                    SendNewPassword();
                  }}
                  type="submit"
                  style={{ background: "#f95d12", border: "none" }}
                >
                  Reset
                </button>
              </div>
              {/* </form> */}
            </div>
          </section>
        );
      } else
        return (
          <section className="loginSignUPSection">
            <MainLoader isLoading={loaderflag} />
            <div className="logParent">
              {/* close cross */}
              <span
                className="crossClass"
                onClick={() => setShowLoginModal(false)}
              >
                <i className="fa-solid fa-xmark" />
              </span>

              <h1 className="logHead">Reset Password</h1>
              {/* onSubmit={submitHandler} */}
              {/* <form> */}
              <div className="mb-5">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Enter OTP
                </label>
                <div className="" style={{ position: "relative" }}>
                  <input
                    style={{ padding: "5px 45px 5px 10px" }}
                    type={"text"}
                    name="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter your password"
                    value={otp}
                    onChange={(e) => setotp(e.target.value)}
                    required={true}
                  />
                </div>
              </div>

              {/* Reset Password Button */}
              <div className="creBtn">
                <button
                  onClick={() => {
                    // setisVerifyOTP(true);
                    OTPchacker(otp);
                  }}
                  type="submit"
                  style={{ background: "#f95d12", border: "none" }}
                >
                  Next &gt;
                </button>
              </div>
              {/* </form> */}
            </div>
          </section>
        );
    } else {
      return (
        <section className="loginSignUPSection">
          <MainLoader isLoading={loaderflag} />
          <div className="logParent">
            {/* close cross */}
            <span
              className="crossClass"
              onClick={() => setShowLoginModal(false)}
            >
              <i className="fa-solid fa-xmark" />
            </span>

            <h1 className="logHead">Reset Password</h1>
            {/* onSubmit={submitHandler} */}
            {/* <form> */}
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter your email"
                value={passemail}
                onChange={(e) => {
                  setpassemail(e.target.value);
                }}
                // onChange={changeHandler}
                required={true}
              />
            </div>

            {/* Reset Password Button */}
            <div className="creBtn">
              <button
                onClick={() => {
                  sendotpdata();
                }}
                type="button"
                style={{ background: "#f95d12", border: "none" }}
              >
                Send OTP
              </button>
            </div>
            {/* </form> */}
          </div>
        </section>
      );
    }
  }
  //.............................Login section...........
  else
    return (
      <>
        <section className="loginSignUPSection">
          <div className="logParent">
            {/* close cross */}
            <span
              className="crossClass"
              onClick={() => setShowLoginModal(false)}
            >
              <i className="fa-solid fa-xmark" />
            </span>

            <h1 className="logHead">Sign In</h1>
            <p className="checkPara">
              Check out more easily and access your tickets on any device with
              your Things to do account.
            </p>

            <form onSubmit={submitHandler}>
              {/* Email */}
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter your email"
                  value={loginData?.email}
                  onChange={changeHandler}
                  required={true}
                />
              </div>

              {/* Password */}
              <div className="mb-5">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <div className="" style={{ position: "relative" }}>
                  <input
                    style={{ padding: "5px 45px 5px 10px" }}
                    type={!showPassword ? "password" : "text"}
                    name="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter your password"
                    value={loginData?.password}
                    onChange={changeHandler}
                    required={true}
                  />
                  <button
                    className="eyeicon_btn"
                    onClick={(e) => e.preventDefault()}
                  >
                    {!showPassword ? (
                      <i
                        class="fa-regular fa-eye"
                        onClick={() => {
                          setShowPassword(true);
                        }}
                      ></i>
                    ) : (
                      <i
                        class="fa-regular fa-eye-slash"
                        onClick={() => {
                          setShowPassword(false);
                        }}
                      ></i>
                    )}

                    {/* <i class="fa-solid fa-eye-slash"></i> */}
                  </button>
                </div>
              </div>

              {/* login Button */}
              <div className="creBtn">
                <button
                  type="submit"
                  style={{ background: "#f95d12", border: "none" }}
                >
                  {isSubmitting ? "Signing In...." : "Log In"}
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                }}
              >
                <p
                  style={{
                    color: "#f76707",
                    cursor: "pointer",
                    fontWeight: "500",
                    textAlign: "center",
                    // textDecoration: 'underline',
                  }}
                  onClick={() => {
                    setShowLoginModal(false);
                    setShowSignUpModal(true);
                  }}
                >
                  Don't Have an account ? SignUp
                </p>

                <p
                  style={{
                    color: "#f76707",
                    cursor: "pointer",
                    fontWeight: "500",
                    textAlign: "center",
                    textDecoration: "underline",
                  }}
                  onClick={() => {
                    // setShowLoginModal(false);
                    // setShowSignUpModal(true);
                    setResetPassFlag(true);
                  }}
                >
                  Forgot Password
                </p>
              </div>
            </form>

            {/* social media section */}
            <div className="socialMediaImages">
              <figure onClick={() => handleGoogleLogin()}>
                <img src={aa} alt="google" />
              </figure>

              <figure onClick={() => facebookLogin()}>
                <img src={bb} alt="facebook" />
              </figure>

              <figure>
                <img src={cc} alt="apple" />
              </figure>
            </div>
          </div>
        </section>
      </>
    );
}

export default LoginModal;
