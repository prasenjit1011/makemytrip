import React, { useState } from "react";
import "./Merchent.css";
import { createMerchant } from "../../API_HELPERS/apiHelpers";
import toast from "react-hot-toast";
import { countrycode } from "../../Data/CountryCode";
import { useNavigate } from "react-router-dom";
// import {createMerchant}from "../../Service/HomeService"
function MerchantSupplierForm() {
  const initial = {
    firstname: "",
    lastname: "",
    email: "",
    pnno: "",
    country: "",
    city: "",
    zip: "",
    weblink: "",
    facebooklink: "",
    countrycode: "",
  };

  const [data, setdata] = useState(initial);
  const Navigate = useNavigate();

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({ ...prev, [name]: value }));
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    // let data1 = {};
    // if (data?.countrycode) {
    //   data1 = { ...data, countrycode: "+49" };
    // }

    const senddata = {
      country: data.country,
      city: data.city,
      zip: data.zip,
      email: data.email,
      countryCode: data.countrycode ? data.countrycode : "+49",
      firstName: data.firstname,
      lastName: data.lastname,
      mobile: data.pnno,
      websitelink: data.weblink,
      facebookPage: data.facebooklink,
    };
    try {
      if (
        data.firstname &&
        data.lastname &&
        data.email &&
        data.pnno &&
        data.country &&
        data.city &&
        data.zip
        // data.weblink &&
        // data.facebooklink &&
      ) {
        console.log("jgdjkj", senddata);
        const res = await createMerchant(senddata);
        console.log("resrr", res);
        if (res && res?.status) {
          toast.success("Data submited sucsessfully");

          setdata(initial);
          Navigate("/", { state: { flag: true } });
        } else {
          toast.error(res.message);
        }
      } else {
        if (!data.email) {
          toast.error("please enter Email");
        }
        if (!data.firstname) {
          toast.error("please enter Firstname");
        }
        if (!data.lastname) {
          toast.error("please enter Lastname");
        }
        if (!data.pnno) {
          toast.error("please enter Phone no");
        }
        if (!data.country) {
          toast.error("please enter Country");
        }
        if (!data.city) {
          toast.error("please enter City");
        }
        if (!data.zip) {
          toast.error("please enter Zip");
        }
        // if (!data.facebooklink) {
        //   toast.error("please enter Facebooklink");
        // }
        // if (!data.weblink) {
        //   toast.error("please enter Weblink");
        // }
        if (!data.countrycode) {
          toast.error("please enter countrycode");
        }
      }
    } catch (error) {
      console.log("ERORR FETCHING DESTINATIONS", error);
    }
  };
  return (
    <>
      <div className="frmmrchnt">
        <form
        //   style={{
        //     display: "flex",
        //     flexDirection: "column",
        //     gap: "1rem",
        //     alignItems: "center",
        //     justifyContent: "center",
        //     height: "50vh",

        //     border: "2px solid red",
        //   }}
        >
          <div className="row">
            <div className=" col-lg-6  mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                First Name{" "}
                <span style={{ color: "red", fontSize: "20px" }}>*</span>
              </label>
              <input
                type="text"
                name="firstname"
                className="form-control"
                value={data.firstname}
                onChange={(e) => {
                  HandleChange(e);
                }}
                required={true}
              />
            </div>
            <div className=" col-lg-6  mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Last Name{" "}
                <span style={{ color: "red", fontSize: "20px" }}>*</span>
              </label>
              <input
                type="text"
                name="lastname"
                className="form-control"
                value={data.lastname}
                onChange={(e) => HandleChange(e)}
                required={true}
              />
            </div>
            <div className=" col-lg-6  mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
                <span style={{ color: "red", fontSize: "20px" }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter your email"
                value={data.email}
                onChange={(e) => HandleChange(e)}
                required={true}
              />
            </div>

            <div className=" col-lg-6 mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Mobile Number
                <span style={{ color: "red", fontSize: "20px" }}>*</span>
              </label>
              <div className="frmSubFieldDivs mycountrycode w-100">
                <select
                  className="form-control"
                  name="countrycode"
                  value={data.countrycode}
                  onChange={(e) => HandleChange(e)}
                  id="exampleFormControlSelect1"
                  style={{ width: "15%" }}
                >
                  <option value="+49">+49</option>
                  {countrycode.map((ele, id) => {
                    return (
                      <>
                        <option value={ele.dial_code}>{ele.dial_code}</option>
                      </>
                    );
                  })}
                </select>

                <input
                  type="number"
                  placeholder="Enter Mobile Number"
                  name="pnno"
                  value={data.pnno}
                  onChange={(e) => HandleChange(e)}
                  style={{ paddingLeft: "17%" }}
                />
              </div>
            </div>

            {/* <div className=" col-lg-6 mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Phone No<span style={{color:"red",fontSize:"20px"}}>*</span>
              </label>
              <input
                type="number"
                name="pnno"
                className="form-control"
                value={data.pnno}
                onChange={(e) => HandleChange(e)}
                required={true}
              />
            </div> */}

            <div className=" col-lg-6 mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Country<span style={{ color: "red", fontSize: "20px" }}>*</span>
              </label>
              <input
                type="text"
                name="country"
                className="form-control"
                value={data.country}
                onChange={(e) => HandleChange(e)}
                required={true}
              />
            </div>
            <div className=" col-lg-6  mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                City<span style={{ color: "red", fontSize: "20px" }}>*</span>
              </label>
              <input
                type="text"
                name="city"
                className="form-control"
                value={data.city}
                onChange={(e) => HandleChange(e)}
                required={true}
              />
            </div>

            <div className=" col-lg-6  mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Zip<span style={{ color: "red", fontSize: "20px" }}>*</span>
              </label>
              <input
                type="number"
                name="zip"
                className="form-control"
                value={data.zip}
                onChange={(e) => HandleChange(e)}
                required={true}
              />
            </div>
            <div className=" col-lg-6 mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Website Link
                {/* <span style={{ color: "red", fontSize: "20px" }}>*</span> */}
              </label>
              <input
                type="text"
                name="weblink"
                className="form-control"
                value={data.weblink}
                onChange={(e) => HandleChange(e)}
                required={true}
              />
            </div>
            <div className=" col-lg-6 mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Facebook Page
                {/* <span style={{ color: "red", fontSize: "20px" }}>*</span> */}
              </label>
              <input
                type="text"
                name="facebooklink"
                className="form-control"
                value={data.facebooklink}
                onChange={(e) => HandleChange(e)}
                required={true}
              />
            </div>

            <div
              className=" col-lg-6 "
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "2rem",
              }}
            >
              <p
                style={{ cursor: "pointer" }}
                className="showRestBtn"
                onClick={(e) => {
                  handlesubmit(e);
                }}
              >
                Submit
              </p>
              <p
                className="showRestBtn"
                style={{
                  cursor: "pointer",
                  // display: "flex",
                  // justifyContent: "flex-end",
                }}
                onClick={() => {
                  Navigate("/", { state: { flag: true } });
                }}
              >
                Back
              </p>
            </div>
          </div>
        </form>

        {/* <div>
          <p
            className="showRestBtn"
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
            onClick={() => {
              Navigate("/", { state: { flag: true } });
            }}
          >
            Back
          </p>
        </div> */}
      </div>
    </>
  );
}

export default MerchantSupplierForm;
