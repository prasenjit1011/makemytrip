// import React from 'react'

// function ResetPasswordModel() {
//     const INITIAL = {
//         email: "",
//         password: "",
//       };
      
//       const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      
    
//         const [loginData, setLoginData] = useState(
//           JSON.parse(JSON.stringify(INITIAL))
//         );

//   return (
//     <section className="loginSignUPSection">
//     <div className="logParent">
//       {/* close cross */}
//       <span className="crossClass" onClick={() => setShowLoginModal(false)}>
//         <i className="fa-solid fa-xmark" />
//       </span>

//       <h1 className="logHead">Reset Password</h1>
      

//       <form onSubmit={submitHandler}>
//         {/* Email */}
//         <div className="mb-3">
//           <label htmlFor="exampleInputEmail1" className="form-label">
//             Email address
//           </label>
//           <input
//             type="email"
//             name="email"
//             className="form-control"
//             id="exampleInputEmail1"
//             aria-describedby="emailHelp"
//             placeholder="Enter your email"
//             value={loginData?.email}
//             // onChange={changeHandler}
//             required={true}
//           />
//         </div>

//         {/* Password */}
//         {/* <div className="mb-5">
//           <label htmlFor="exampleInputPassword1" className="form-label">
//             Password
//           </label>
//           <div className="" style={{ position: "relative" }}>
//             <input
//               style={{ padding: "5px 45px 5px 10px" }}
//               type={!showPassword ? "password" : "text"}
//               name="password"
//               className="form-control"
//               id="exampleInputPassword1"
//               placeholder="Enter your password"
//               value={loginData?.password}
//               onChange={changeHandler}
//               required={true}
//             />
//             <button
//               className="eyeicon_btn"
//               onClick={(e) => e.preventDefault()}
//             >
//               {!showPassword ? (
//                 <i
//                   class="fa-regular fa-eye"
//                   onClick={() => {
//                     setShowPassword(true);
//                   }}
//                 ></i>
//               ) : (
//                 <i
//                   class="fa-regular fa-eye-slash"
//                   onClick={() => {
//                     setShowPassword(false);
//                   }}
//                 ></i>
//               )}

//             </button>
//           </div>
//         </div> */}

//         {/* login Button */}
//         <div className="creBtn">
//           <button
//             type="submit"
//             style={{ background: "#f95d12", border: "none" }}
//           >
//             {/* {isSubmitting ? "Signing In...." : "Log In"} */}
//           </button>
//         </div>
       
//       </form>

     
     
//     </div>
//   </section>
//   )
// }

// export default ResetPasswordModel