import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import {
  getAllCategoriesForFilter,
  getAllDestinationsForFilter,
  getAllLanguagesForFilter,
} from "../../API_HELPERS/apiHelpers";
import MainLoader from "../Loaders/MainLoader";

function BecameAsupplierModel({
  isLoading,

  closeModal,
}) {
    const navigate = useNavigate()

  return (
    <>
      <MainLoader isLoading={isLoading} />
      <section className="filterNodalSection" >
        <div className="subFilterModal" >
          <div className="filCrossDiv">
            {/* <p className="filterHead">Filters</p> */}
            <button className="closeFilter" onClick={() => closeModal(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="acorFilterDiv" >
            <Accordion  >
              <AccordionItem style={{height:"50vh",alignItems:"center",justifyContent:"center",display:"flex",gap:"1rem",flexDirection:"column"}}>
              <h3>Are you Above 18 years old?</h3>
              <div style={{display:"flex",gap:"3rem" ,alignItems:"center",}}>
                <button onClick={()=>{
                    window.scrollTo(0,0)
                    navigate("/merchantsupplierfrom")
                closeModal(false)}} 
                 className="showRestBtn">yes</button>
               <button onClick={() => closeModal(false)}  className="showRestBtn">No</button></div>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}

export default BecameAsupplierModel;
