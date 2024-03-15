import React, { useState } from "react";
import AuthService from "../../Service/AuthService";
import toast from "react-hot-toast";
import { countrycode } from "../../Data/CountryCode";

const INITIAL = {
  firstName: "",
  lastName: "",
  email: "",
  mobileNo: "",
  dob: "",
  password: "",
  country: "",
  countryCode: "",
};

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function CreateAccountModal({ setShowSignUpModal, setShowLoginModal }) {
  const [signUpData, setSignUpData] = useState(
    JSON.parse(JSON.stringify(INITIAL))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    // Remove non-numeric characters
    const numericValue = e.target.value.replace(/[^0-9]/g, "");

    // Limit the input to 10 characters
    if (numericValue.length <= 15) {
      setSignUpData((prev) => {
        let update = JSON.parse(JSON.stringify(prev));
        console.log(update);
        update.mobileNo = e.target.value;
        return { ...update };
      });
    }
  };
  const changeHandler = (e) => {
    console.log("WORKED", e.target.value, typeof e.target.value);
    if (String(e.target.value).includes("+")) {
      console.log("WORKED");
    }
    // if (e.target.name === 'mobileNo') {
    //   console.log('clicked');
    //   setSignUpData(prev => {
    //     let update = JSON.parse(JSON.stringify(prev));
    //     update[e.target.name] = '';
    //     return { ...update };
    //   });
    //   return;
    // }

    setSignUpData((prev) => {
      let update = JSON.parse(JSON.stringify(prev));
      update[e.target.name] = e.target.value;
      return { ...update };
    });
  };

  const validator = ({
    firstName,
    lastName,
    email,
    mobileNo,
    dob,
    password,
    country,
  }) => {
    if (firstName?.trim().length < 3) {
      toast.error("First Name length must contain more than two characters");
      return false;
    }

    if (lastName?.trim().length < 3) {
      toast.error("Last Name length must contain more than two characters");
      return false;
    }

    if (mobileNo?.trim().length > 15 || mobileNo?.trim().length < 10) {
      toast.error(
        "Mobile Number must contain minimum 10 and maximum 15 characters"
      );
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address");
      return false;
    }
    if (password.length < 8) {
      toast.error("Password should be greater or equal than eight characters");
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validator(signUpData)) return;
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      if (signUpData?.countryCode) {
        const res = await AuthService.register(signUpData);
        console.log("REGISTER", res);

        if (res && res?.status) {
          setSignUpData(JSON.parse(JSON.stringify(INITIAL)));
          setShowSignUpModal(false);
          setShowLoginModal(true);
          toast.success("Account created successfully");
        } else {
          toast.error(res?.message || "Something went wrong");
        }
      } else {
        let signUpData1 = { ...signUpData, countryCode: "+49" };
        const res = await AuthService.register(signUpData1);
        console.log("REGISTER", res);

        if (res && res?.status) {
          setSignUpData(JSON.parse(JSON.stringify(INITIAL)));
          setShowSignUpModal(false);
          setShowLoginModal(true);
          toast.success("Account created successfully");
        } else {
          toast.error(res?.message || "Something went wrong");
        }
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <section className="createAccSection">
        <div className="creParent">
          <h1
            style={{
              color: "#343a40",
              textAlign: "center",
              fontSize: "25px",
              marginBottom: "20px",
            }}
          >
            Create an account
          </h1>

          <form action="" className="creForm" onSubmit={submitHandler}>
            <div className="row">
              <div className="col-md-6 col-12 mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  id="firstName"
                  aria-describedby="emailHelp"
                  value={signUpData?.firstName}
                  onChange={changeHandler}
                  required={true}
                  placeholder="First Name"
                />
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  id="lastName"
                  aria-describedby="emailHelp"
                  value={signUpData?.lastName}
                  onChange={changeHandler}
                  required={true}
                  placeholder="Last Name"
                />
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label htmlFor="mobileNo" className="form-label">
                  Mobile Number
                </label>
                <div
                  className="d-flex"
                  style={{
                    border: "1px solid #ced4da",
                    borderRadius: "0.25rem",
                  }}
                >
                  <select
                    className="form-control"
                    name="countryCode"
                    onChange={changeHandler}
                    value={signUpData?.countryCode}
                    id="exampleFormControlSelect1"
                    style={{
                      width: "48%",
                      border: "0",
                      borderRight: "1px solid #ced4da",
                      borderRadius: "0",
                    }}
                  >
                    <option value="+49">+49</option>
                    {countrycode.map((ele, id) => {
                      return (
                        <>
                          <option value={ele.dial_code}>{ele.dial_code}</option>
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
                    style={{ border: "0" }}
                    type="text"
                    name="mobileNo"
                    className="form-control"
                    id="mobileNo"
                    // aria-describedby="emailHelp"
                    value={signUpData?.mobileNo}
                    onChange={handleChange}
                    required={true}
                    placeholder="Mobile Number"
                  />
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label htmlFor="dob" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  id="dob"
                  aria-describedby="emailHelp"
                  value={signUpData?.dob}
                  onChange={changeHandler}
                  required={true}
                />
              </div>
              <div className="col-md-12 col-12 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={signUpData?.email}
                  onChange={changeHandler}
                  required={true}
                  placeholder="Email address"
                />
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  className="form-control"
                  id="country"
                  aria-describedby="emailHelp"
                  value={signUpData?.country}
                  onChange={changeHandler}
                  required={true}
                  placeholder="Country"
                />
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <input
                    type={!showPassword ? "password" : "text"}
                    name="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={signUpData?.password}
                    onChange={changeHandler}
                    required={true}
                    placeholder="Password"
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      {!showPassword ? (
                        <i
                          style={{ cursor: "pointer" }}
                          className="fa-regular fa-eye"
                          onClick={() => {
                            setShowPassword(true);
                          }}
                        ></i>
                      ) : (
                        <i
                          style={{ cursor: "pointer" }}
                          className="fa-regular fa-eye-slash"
                          onClick={() => {
                            setShowPassword(false);
                          }}
                        ></i>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="creBtn">
              <button
                type="submit"
                style={{ background: "#f95d12", border: "none" }}
              >
                {isSubmitting ? "Creating..." : "Create an account"}
              </button>
              <p
                style={{
                  color: "#f76707",
                  cursor: "pointer",
                  fontWeight: "500",
                  textAlign: "center",
                  // textDecoration: 'underline',
                }}
                onClick={() => {
                  setShowSignUpModal(false);
                  setShowLoginModal(true);
                }}
              >
                Already Have an Account! Login
              </p>
              <p>
                By creating an account, you agree to our{" "}
                <span>Terms of Service</span> and{" "}
                <span>Privacy Statement.</span>
              </p>
            </div>
          </form>

          <span className="creaCross" onClick={() => setShowSignUpModal(false)}>
            <i className="fa-solid fa-xmark" />
          </span>
        </div>
      </section>
    </>
  );
}

export default CreateAccountModal;
