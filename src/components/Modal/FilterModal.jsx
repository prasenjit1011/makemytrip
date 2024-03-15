import React, { Fragment, useEffect, useState } from "react";
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

function FilterModal({
  isLoading,
  setIsLoading,
  selectedFilters,
  setSelectedFilters,
  closeModal,
  applyFilter,
  resetFilter,
  ratingsComp,
}) {
  const [fetchedDestinations, setFetchedDestinations] = useState([]);
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [fetchedLanguages, setFetchedLanguages] = useState([]);

  const fetchDestinations = async () => {
    try {
      setIsLoading(true);
      const res = await getAllDestinationsForFilter();

      if (res && res?.status) {
        setFetchedDestinations(res?.data);
        console.log("DESTINATIONS", res?.data);
      } else {
        console.log("ERORR FETCHING DESTINATIONS", res);
      }
    } catch (error) {
      console.log("ERORR FETCHING DESTINATIONS", error);
    }
    setIsLoading(false);
  };

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const res = await getAllCategoriesForFilter();
      if (res && res?.status) {
        setFetchedCategories(res?.data);
        console.log("Categories", res?.data);
      } else {
        console.log("ERORR FETCHING Categories", res);
      }
    } catch (error) {
      console.log("ERORR FETCHING Categories", error);
    }
    setIsLoading(false);
  };

  const fetchLanguages = async () => {
    try {
      setIsLoading(true);
      const res = await getAllLanguagesForFilter();
      if (res && res?.status) {
        setFetchedLanguages(res?.data);
        console.log("Languages", res?.data);
      } else {
        console.log("ERORR FETCHING Languages", res);
      }
    } catch (error) {
      console.log("ERORR FETCHING Languages", error);
    }
    setIsLoading(false);
  };

  const changeHandler = (e, item) => {
    if (e.target.checked) {
      setSelectedFilters((prev) => {
        let update = JSON.parse(JSON.stringify(prev));
        update?.[e.target.name]?.push(item?._id);
        return update;
      });
      return;
    }
    setSelectedFilters((prev) => {
      let update = JSON.parse(JSON.stringify(prev));
      const idx = update?.[e.target.name]?.findIndex((id) => id === item?._id);
      update?.[e.target.name]?.splice(idx, 1);
      return update;
    });
  };

  const changeHandlerForPrice = (e) => {
    setSelectedFilters((prev) => {
      let update = JSON.parse(JSON.stringify(prev));
      update[e.target.name] = +e.target.value;
      return update;
    });
  };

  const changeHandlerForDurationAndTime = (e, item) => {
    if (e.target.checked) {
      setSelectedFilters((prev) => {
        let update = JSON.parse(JSON.stringify(prev));
        console.log("hhjii", update);
        update?.[e.target.name].push(item);
        return update;
      });
      return;
    }
    setSelectedFilters((prev) => {
      let update = JSON.parse(JSON.stringify(prev));
      console.log("hhjii", update);
      const idx = update?.[e.target.name]?.findIndex((el) => el === item);
      update?.[e.target.name]?.splice(idx, 1);
      return update;
    });
  };

  useEffect(() => {
    fetchDestinations();
    fetchCategories();
    fetchLanguages();
  }, []);

  return (
    <>
      <MainLoader isLoading={isLoading} />
      <section className="filterNodalSection">
        <div className="subFilterModal">
          <div className="filCrossDiv">
            <p className="filterHead">Filters</p>
            <button className="closeFilter" onClick={() => closeModal(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="acorFilterDiv">
            <Accordion>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>Destinations</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  {fetchedDestinations?.map((item, i) => {
                    return (
                      <div key={i}>
                        <input
                          type="checkbox"
                          id={`dest${i}`}
                          name="destination"
                          checked={selectedFilters?.destination?.includes(
                            item?._id
                          )}
                          onChange={(e) => changeHandler(e, item)}
                          className="labFillInpType"
                        />
                        <label htmlFor={`dest${i}`} className="labFilInp">
                          {item?.name}
                        </label>
                      </div>
                    );
                  })}
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>Categories</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  {fetchedCategories?.map((item, i) => {
                    return (
                      <div key={i}>
                        <input
                          type="checkbox"
                          id={`cate${i}`}
                          name="catId"
                          checked={selectedFilters?.catId?.includes(item?._id)}
                          onChange={(e) => changeHandler(e, item)}
                        />
                        <label htmlFor={`cate${i}`} className="labFilInp">
                          {item?.categoryName}
                        </label>
                      </div>
                    );
                  })}
                </AccordionItemPanel>
              </AccordionItem>

              {/* <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>Languages</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  {fetchedLanguages?.map((item, i) => {
                    return (
                      <div key={i}>
                        <input
                          type="checkbox"
                          id={`lang${i}`}
                          name="language"
                          checked={selectedFilters?.language?.includes(
                            item?._id
                          )}
                          onChange={(e) => changeHandler(e, item)}
                        />
                        <label htmlFor={`lang${i}`} className="labFilInp">
                          {item?.name}
                        </label>
                      </div>
                    );
                  })}
                </AccordionItemPanel>
              </AccordionItem> */}

              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>Price</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div className="minMaxPri">
                    <div className="labInpFilter">
                      <label htmlFor="" className="priceFilterLabel">
                        Min. price
                      </label>
                      <div className="inpFilterDiv">
                        <input
                          type="number"
                          name="minprice"
                          // value={selectedFilters?.minprice}
                          value={
                            selectedFilters?.minprice &&
                            selectedFilters?.minprice == 0
                              ? ""
                              : selectedFilters?.minprice
                              ? selectedFilters?.minprice
                              : ""
                          }
                          onChange={changeHandlerForPrice}
                        />
                      </div>
                    </div>
                    <div className="labInpFilter">
                      <label htmlFor="" className="priceFilterLabel">
                        Max. price
                      </label>
                      <div className="inpFilterDiv">
                        <input
                          type="number"
                          name="maxprice"
                          value={
                            selectedFilters?.maxprice &&
                            selectedFilters?.maxprice == 0
                              ? ""
                              : selectedFilters?.maxprice
                              ? selectedFilters?.maxprice
                              : ""
                          }
                          onChange={changeHandlerForPrice}
                        />
                      </div>
                    </div>
                  </div>
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>Time</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div>
                    <input
                      type="checkbox"
                      id="mor1"
                      name="time"
                      checked={selectedFilters?.time?.includes("morning")}
                      onChange={(e) =>
                        changeHandlerForDurationAndTime(e, "morning")
                      }
                    />
                    <label htmlFor="mor1" className="labFilInp">
                      In the Morning, 12AM - 12PM
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="mor2"
                      name="time"
                      checked={selectedFilters?.time?.includes("afternoon")}
                      onChange={(e) =>
                        changeHandlerForDurationAndTime(e, "afternoon")
                      }
                    />
                    <label htmlFor="mor2" className="labFilInp">
                      In the Afternoon, 12PM - 5PM
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="mor2"
                      name="time"
                      checked={selectedFilters?.time?.includes("evening")}
                      onChange={(e) =>
                        changeHandlerForDurationAndTime(e, "evening")
                      }
                    />
                    <label htmlFor="mor2" className="labFilInp">
                      In the Evening, 5PM - 12AM
                    </label>
                  </div>
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>Duration</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div>
                    <input
                      type="checkbox"
                      id="dua1"
                      name="duration"
                      onChange={(e) =>
                        changeHandlerForDurationAndTime(e, "0-3 hours")
                      }
                      checked={selectedFilters?.duration?.includes("0-3 hours")}
                    />
                    <label htmlFor="dua1" className="labFilInp">
                      0-3 hours
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="dua2"
                      name="duration"
                      onChange={(e) =>
                        changeHandlerForDurationAndTime(e, "3-5 hours")
                      }
                      checked={selectedFilters?.duration?.includes("3-5 hours")}
                    />
                    <label htmlFor="dua2" className="labFilInp">
                      3-5 hours
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="dua3"
                      name="duration"
                      onChange={(e) =>
                        changeHandlerForDurationAndTime(e, "5-7 hours")
                      }
                      checked={selectedFilters?.duration?.includes("5-7 hours")}
                    />
                    <label htmlFor="dua3" className="labFilInp">
                      5-7 hours
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="dua4"
                      name="duration"
                      onChange={(e) =>
                        changeHandlerForDurationAndTime(e, "fullday")
                      }
                      checked={selectedFilters?.duration?.includes("fullday")}
                    />
                    <label htmlFor="dua4" className="labFilInp">
                      Full day (7+ hours)
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="dua5"
                      name="duration"
                      onChange={(e) =>
                        changeHandlerForDurationAndTime(e, "multiday")
                      }
                      checked={selectedFilters?.duration?.includes("multiday")}
                    />
                    <label htmlFor="dua5" className="labFilInp">
                      Multi-day
                    </label>
                  </div>
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>Ratings</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div className="pl-3 ratAccorDiv">{ratingsComp}</div>
                </AccordionItemPanel>
              </AccordionItem>

              {/* <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>Interests</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div>
                    <input type="checkbox" id="int1" />
                    <label htmlFor="int1" className="labFilInp">
                      City sightseeing
                    </label>
                  </div>
                </AccordionItemPanel>
              </AccordionItem> */}

              {/* <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>Services</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div>
                    <input type="checkbox" id="serv1" />
                    <label htmlFor="serv1" className="labFilInp">
                      Additional health measures
                    </label>
                  </div>
                  <div>
                    <input type="checkbox" id="serv2" />
                    <label htmlFor="serv2" className="labFilInp">
                      Wheelchair accessible
                    </label>
                  </div>
                  <div>
                    <input type="checkbox" id="serv3" />
                    <label htmlFor="serv3" className="labFilInp">
                      Private tour
                    </label>
                  </div>
                  <div>
                    <input type="checkbox" id="serv4" />
                    <label htmlFor="serv4" className="labFilInp">
                      Skip the line
                    </label>
                  </div>
                  <div>
                    <input type="checkbox" id="serv5" />
                    <label htmlFor="serv5" className="labFilInp">
                      Small group
                    </label>
                  </div>
                  <div>
                    <input type="checkbox" id="serv6" />
                    <label htmlFor="serv6" className="labFilInp">
                      Hotel pickup possible
                    </label>
                  </div>
                  <div>
                    <input type="checkbox" id="serv7" />
                    <label htmlFor="serv7" className="labFilInp">
                      GetYourGuide Originals
                    </label>
                  </div>
                </AccordionItemPanel>
              </AccordionItem> */}

              {/* <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>Departs from</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div>
                    <input type="checkbox" id="depart1" />
                    <label htmlFor="depart1" className="labFilInp">
                      New York City
                    </label>
                  </div>
                  <div>
                    <input type="checkbox" id="depart2" />
                    <label htmlFor="depart2" className="labFilInp">
                      Berlin
                    </label>
                  </div>
                  <div>
                    <input type="checkbox" id="depart3" />
                    <label htmlFor="depart3" className="labFilInp">
                      Central Park
                    </label>
                  </div>
                  <div>
                    <input type="checkbox" id="depart4" />
                    <label htmlFor="depart4" className="labFilInp">
                      Hudson River
                    </label>
                  </div>
                  <div>
                    <input type="checkbox" id="depart5" />
                    <label htmlFor="depart5" className="labFilInp">
                      Hudson River Park
                    </label>
                  </div>
                  <div>
                    <input type="checkbox" id="depart6" />
                    <label htmlFor="depart6" className="labFilInp">
                      Boston
                    </label>
                  </div>
                  <div>
                    <input type="checkbox" id="depart7" />
                    <label htmlFor="depart7" className="labFilInp">
                      Washington, DC
                    </label>
                  </div>
                </AccordionItemPanel>
              </AccordionItem> */}

              {/* <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>Star rating</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div>
                    <input type="radio" id="rateST1" name="starR" />
                    <label htmlFor="rateST1" className="labFilInp">
                      3.0+
                    </label>
                  </div>
                  <div>
                    <input type="radio" id="rateST2" name="starR" />
                    <label htmlFor="rateST2" className="labFilInp">
                      3.5+
                    </label>
                  </div>
                  <div>
                    <input type="radio" id="rateST3" name="starR" />
                    <label htmlFor="rateST3" className="labFilInp">
                      4.0+
                    </label>
                  </div>
                  <div>
                    <input type="radio" id="rateST4" name="starR" />
                    <label htmlFor="rateST4" className="labFilInp">
                      4.5+
                    </label>
                  </div>
                  <div className="clrBtnDivFilt">
                    <button className="clrBtnFilt">Clear</button>
                  </div>
                </AccordionItemPanel>
              </AccordionItem> */}

              {/* <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>Things to do in New York City</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div>
                    <input type="radio" id="thingsRed1" name="thingsTONew" />
                    <label htmlFor="thingsRed1" className="labFilInp">
                      Museums in the Big Apple
                    </label>
                  </div>
                  <div>
                    <input type="radio" id="thingsRed2" name="thingsTONew" />
                    <label htmlFor="thingsRed2" className="labFilInp">
                      City skyline cruises
                    </label>
                  </div>
                  <div>
                    <input type="radio" id="thingsRed3" name="thingsTONew" />
                    <label htmlFor="thingsRed3" className="labFilInp">
                      NYC from above
                    </label>
                  </div>
                  <div>
                    <input type="radio" id="thingsRed4" name="thingsTONew" />
                    <label htmlFor="thingsRed4" className="labFilInp">
                      Broadway tickets
                    </label>
                  </div>
                  <div>
                    <input type="radio" id="thingsRed5" name="thingsTONew" />
                    <label htmlFor="thingsRed5" className="labFilInp">
                      NYC on foot
                    </label>
                  </div>
                  <div className="clrBtnDivFilt">
                    <button className="clrBtnFilt">Clear</button>
                  </div>
                </AccordionItemPanel>
              </AccordionItem>  */}
            </Accordion>
          </div>
          <div className="resetShowDiv">
            <button className="restFilterBtn" onClick={resetFilter}>
              Reset all
            </button>
            <button
              className="showRestBtn"
              onClick={(e) => {
                e.preventDefault();

                applyFilter();
              }}
            >
              Show results
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default FilterModal;
