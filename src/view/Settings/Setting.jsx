import React, { useEffect, useState } from "react";
import "../Settings/Setting.css";
import { useAuth } from "../../Context/AuthContextProvider";
import moment from "moment";
import {
  changeUserPassword,
  updateProfile,
} from "../../API_HELPERS/apiHelpers";
import { toast } from "react-hot-toast";
import MainLoader from "../../components/Loaders/MainLoader";
import { countrycode } from "../../Data/CountryCode";
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// const INITITAL_USERDATA = {
//   email: 'vcdas@gmail.com',
//   mobileNo: '',
//   dob: '',
//   country: '',
//   dealsStatus: true,
//   bookingStatus: false,
//   reviewStatus: true,
//   firstName: '',
//   lastName: '',
// };
const INITIAL_PASS = {
  oldPassword: "",
  password: "",
};
function Setting() {
  const germenyCountrycode = +49;
  const [editStatus, setEditStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pass, setPass] = useState(INITIAL_PASS);
  const { userData, fetchUser } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState({
    oldpass: false,
    newpass: false,
  });
  const [confirmpass, setconfirmpass] = useState("");
  const [confirmpassflag, setconfirmpassflag] = useState(false);

  console.log("USERDATA", userData);

  const [data, setData] = useState({});
  console.log("jjrk", data);

  const changeHandler = (e) => {
    setData((prev) => {
      let update = JSON.parse(JSON.stringify(prev));
      update[e.target.name] = e.target.value;
      return update;
    });
  };

  useEffect(() => {
    setData({
      ...userData,
      dob: `${moment(userData?.dob).format("YYYY-MM-DD")}`,
    });
  }, [userData]);

  const validator = () => {
    if (data?.firstName === "") {
      toast.error("FirstName is required");
      return false;
    }
    if (data?.lastName === "") {
      toast.error("Last Name is required");
      return false;
    }
    if (data?.email === "") {
      toast.error("Email is required");
      return false;
    }

    if (!emailRegex.test(data?.email)) {
      toast.error("Enter a valid email address");
      return false;
    }

    if (data?.mobileNo === "") {
      toast.error("Mobile No. is required");
      return false;
    }

    return true;
  };

  const updateUserProfile = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    if (!validator()) return;

    try {
      setIsLoading(true);
      const res = await updateProfile(data);
      if (res && res?.status) {
        setEditStatus(false);
        toast.success(res?.message || "Profile Updated Successfully");
        fetchUser();
        setData(userData);
      } else {
        toast.error(res?.message || "Profile Updated Successfully");
      }
    } catch (error) {
      toast.error(error?.message || "Something Went Wrong!");
    }
    setIsLoading(false);
  };

  const changeHandlerForNotifications = async (e) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const res = await updateProfile({
        ...data,
        [e.target.name]: e.target.checked,
      });
      if (res && res?.status) {
        toast.success(res?.message || "Profile Updated Successfully");
        fetchUser();
        setData(userData);
      } else {
        toast.error(res?.message || "Profile Updated Successfully");
      }
    } catch (error) {
      toast.error(error?.message || "Something Went Wrong!");
    }
    setIsLoading(false);
  };

  const changeHandlerForPassword = (e) => {
    setPass((prev) => {
      let update = JSON.parse(JSON.stringify(prev));
      update[e.target.name] = e.target.value;
      return update;
    });
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    if (pass?.password.length < 8) {
      toast.error(
        "Password should be greater than or equal to eight characters"
      );
      return false;
    }
    if (
      confirmpass.toString().length == pass.password.toString().length &&
      confirmpass === pass.password
    ) {
      try {
        setIsLoading(true);
        const res = await changeUserPassword(pass);
        if (res && res?.status) {
          toast.success("User password changed successfully");
          setPass(JSON.parse(JSON.stringify(INITIAL_PASS)));
          setconfirmpass("");
        } else {
          toast.error(res?.message || "Something went Wrong");
        }
      } catch (error) {
        console.log("fajsdj");
        toast.error(error?.message || "Something Went Wrong!");
      }
      setIsLoading(false);
    } else {
      toast.error("Password Should be same as newPassword");
      setIsLoading(false);
      return false;
    }
  };

  return (
    <>
      <MainLoader isLoading={isLoading} />
      <section className="settingPageSection">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4 mb-md-0 mb-4">
              <div className='settingLeft nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical"'>
                <div className="headingSetLeft">
                  <p className="mainHeadName">Settings</p>
                  {/* <p className="accHeading">Settings</p> */}
                </div>
                <div
                  class="nav flex-column nav-pills mySettingTab"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    class="nav-link active"
                    id="v-pills-home-tab"
                    data-toggle="pill"
                    data-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    <i class="fa-solid fa-users"></i>{" "}
                    <span className="subBtnText">Profile</span>
                  </button>
                  <button
                    class="nav-link"
                    id="v-pills-profile-tab"
                    data-toggle="pill"
                    data-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    <i class="fa-regular fa-envelope"></i>{" "}
                    <span className="subBtnText">Notifications</span>
                  </button>
                  <button
                    class="nav-link"
                    id="v-pills-messages-tab"
                    data-toggle="pill"
                    data-target="#v-pills-messages"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-messages"
                    aria-selected="false"
                  >
                    <i class="fa-solid fa-lock"></i>{" "}
                    <span className="subBtnText">Password</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-8">
              <div class="tab-content" id="v-pills-tabContent">
                <div
                  class="tab-pane fade show active firstTab"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  <form action="">
                    <div>
                      <p className="frmFieldHead">Profile Details</p>
                      <div className="frmFieldDivs">
                        <div className="frmSubFieldDivs">
                          <input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            onChange={changeHandler}
                            value={data?.firstName}
                            disabled={!editStatus}
                          />
                        </div>
                        <div className="frmSubFieldDivs">
                          <input
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            onChange={changeHandler}
                            value={data?.lastName}
                            disabled={!editStatus}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="fromAllDivs">
                      <p className="frmFieldHead">Contact Details</p>
                      <div className="frmFieldDivs">
                        <div className="frmSubFieldDivs">
                          <input
                            type="email"
                            placeholder="Email Address"
                            readonly
                            className="readonlyInp"
                            name="email"
                            onChange={changeHandler}
                            value={data?.email}
                            disabled={true}
                          />
                        </div>
                        <div className="frmSubFieldDivs mycountrycode">
                          <select
                            className="form-control"
                            name="countryCode"
                            onChange={changeHandler}
                            // value={data?.countryCode?
                            //   data?countrycode:germenyCountrycode}
                            value={data?.countryCode || germenyCountrycode}
                            disabled={!editStatus}
                            id="exampleFormControlSelect1"
                            style={{ width: "25%" }}
                          >
                            <option value="">0</option>
                            {countrycode.map((ele, id) => {
                              return (
                                <>
                                  <option value={ele.dial_code}>
                                    {ele.dial_code}
                                  </option>
                                </>
                              );
                            })}
                            {/* <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option> */}
                          </select>

                          <input
                            type="number"
                            placeholder="Mobile Number"
                            name="mobileNo"
                            onChange={changeHandler}
                            value={data?.mobileNo}
                            disabled={!editStatus}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="fromAllDivs">
                      <p className="frmFieldHead">Date of birth</p>
                      <div
                        className="frmSubFieldDivs mt-2
                      "
                      >
                        <input
                          type="date"
                          placeholder="Date of birth"
                          name="dob"
                          onChange={changeHandler}
                          value={data?.dob}
                          disabled={!editStatus}
                        />
                      </div>
                    </div>
                    <div className="fromAllDivs">
                      {!editStatus && (
                        <button
                          className="saveSetBtn"
                          onClick={(e) => {
                            e.preventDefault();
                            setEditStatus(true);
                          }}
                        >
                          Edit
                        </button>
                      )}
                      {editStatus && (
                        <>
                          <button
                            className="saveSetBtn"
                            onClick={updateUserProfile}
                          >
                            Save
                          </button>
                          <button
                            className="saveSetBtn ml-3"
                            onClick={(e) => {
                              e.preventDefault();
                              setEditStatus(false);
                              setData(userData);
                            }}
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </form>
                </div>
                <div
                  class="tab-pane fade"
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                >
                  <form className="notiMainDiv" action="">
                    <div className="notificationDiv">
                      <div className="mt-3">
                        <p className="notiMainHead">Booking</p>
                        {/* <p className="getImpoText">
                          Get important updates about your bookings, your account, and our privacy policies. You'll
                          always get these updates over email.
                        </p> */}
                        <div className="chkSpanDiv">
                          <span className="spnText">Email</span>
                          <div class="custom-control custom-switch">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="chk1"
                              name="bookingStatus"
                              checked={data?.bookingStatus}
                              onChange={changeHandlerForNotifications}
                              style={{ backgroundColor: "red" }}
                              disabled={true}
                            />
                            <label class="custom-control-label" htmlFor="chk1">
                              {data?.bookingStatus ? "ON" : "OFF"}
                            </label>
                          </div>
                        </div>
                        {/* <div className="chkSpanDiv">
                          <span className="spnText">App notifications</span>
                          <div class="custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id="chk2" />
                            <label class="custom-control-label" htmlFor="chk2">
                              Off
                            </label>
                          </div>
                        </div> */}
                      </div>
                      <div className="mt-4">
                        <p className="notiMainHead">Reviews</p>
                        <p className="getImpoText">
                          Get reminders to write a review for activities you
                          have done recently.
                        </p>
                        <div className="chkSpanDiv">
                          <span className="spnText">Email</span>
                          <div class="custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input "
                              id="chk3"
                              name="reviewStatus"
                              checked={data?.reviewStatus}
                              onChange={changeHandlerForNotifications}
                              // style={{backgroundColor:'green',borderColor:'green'}}
                            />
                            <label class="custom-control-label" htmlFor="chk3">
                              {data?.reviewStatus ? "ON" : "OFF"}
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="notiMainHead">Deals</p>
                        <p className="getImpoText">
                          Exclusive travel deals, latest promotions and special
                          rewards.
                        </p>
                        <div className="chkSpanDiv">
                          <span className="spnText">Email</span>
                          <div class="custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="chk4"
                              name="dealsStatus"
                              checked={data?.dealsStatus}
                              onChange={changeHandlerForNotifications}
                            />
                            <label class="custom-control-label" htmlFor="chk4">
                              {data?.dealsStatus ? "ON" : "OFF"}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="notificationDiv">
                      <div className="mt-3">
                        <p className="notiMainHead">Contact Information</p>
                        <p className="notMailPara notMailFirstPara">Your notifications are sent to:</p>
                        <p className="notMailPara">swarnenduchatterjee733@gmail.com</p>
                      </div>
                    </div> */}
                  </form>
                </div>
                <div
                  class="tab-pane fade"
                  id="v-pills-messages"
                  role="tabpanel"
                  aria-labelledby="v-pills-messages-tab"
                >
                  <p className="resetHead">Reset Password</p>
                  {/* <p className="resetText">
                    Enter the email address associated with your account and we'll send you a link to reset your
                    password.
                  </p> */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    {/* <div className="frmFieldDivs"> */}
                    <div
                      style={{ width: "25.4rem" }}
                      className="frmSubFieldDivs"
                    >
                      <label htmlFor="oldPassword">Old Password</label>
                      <div className="innerdiv">
                        <input
                          style={{ border: "none", textDecoration: "" }}
                          // type="password"
                          type={passwordVisible?.oldpass ? "text" : "password"}
                          className="passfield"
                          value={pass?.oldPassword}
                          name="oldPassword"
                          onChange={changeHandlerForPassword}
                        />
                        <i
                          className={`fa ${
                            passwordVisible.oldpass ? "fa-eye-slash" : "fa-eye"
                          }`}
                          style={{ fontSize: "1.5rem", cursor: "pointer" }}
                          onClick={() =>
                            setPasswordVisible({
                              oldpass: !passwordVisible.oldpass,
                              newpass: false,
                            })
                          }
                        ></i>
                      </div>
                    </div>
                    {/* </div> */}
                    {/* <div className="frmFieldDivs"> */}
                    <div
                      className="frmSubFieldDivs"
                      style={{ width: "25.4rem" }}
                    >
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
                      <div
                        className="frmSubFieldDivs"
                        style={{ width: "25.4rem" }}
                      >
                        <label htmlFor="password">Confirm Password</label>
                        <div className="innerdiv">
                          <input
                            style={{ border: "none", textDecoration: "" }}
                            // type="password"
                            type={confirmpassflag ? "text" : "password"}
                            className=""
                            value={confirmpass}
                            name="password"
                            onChange={(e) => {
                              setconfirmpass(e.target.value);
                            }}
                          />
                          <i
                            className={`fa ${
                              confirmpassflag ? "fa-eye-slash" : "fa-eye"
                            }`}
                            style={{ fontSize: "1.5rem", cursor: "pointer" }}
                            onClick={() => {
                              console.log(
                                "setconfirmpassflag",
                                confirmpassflag
                              );
                              setconfirmpassflag(!confirmpassflag);
                            }}
                          ></i>
                        </div>
                      </div>
                    </div>
                    <div className="fromAllDivs">
                      <button className="saveSetBtn" onClick={changePassword}>
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Setting;
