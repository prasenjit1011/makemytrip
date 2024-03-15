import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getCalenderWise } from "../../API_HELPERS/apiHelpers";
import "./Calendar.css";
import RightArrow from "./right-arrow.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const defaultnumberofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function ReactCalender({
  activityId,
  selectedDate,
  onSelectDate,
  calendarShow,
  setCalendarShow,
}) {
  // const {firstmonthdata} = useSelector((state)=>state.User)
  const [isloading, setisloading] = useState(false);

  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();
  const [numberOfDays, setNumberOfDays] = useState(defaultnumberofDays);
  // const [calendarShow, setCalendarShow] = useState(false);
  const [firstMonth, setFirstMonth] = useState(currentMonth + 1);
  const [secondMonth, setSecondMonth] = useState(
    currentMonth === 11 ? 1 : currentMonth + 2
  );
  const [firstMonthYear, setFirstMonthYear] = useState(currentYear);
  const [secondMonthYear, setSecondMonthYear] = useState(
    currentMonth === 11 ? currentYear + 1 : currentYear
  );
  const [availabilitydate, setAvalibilitydate] = useState([]);
  // const [firstMonthDays, setMonthDays] = useState([]);
  // const [secondMonthDays, setSecondMonthDays] = useState([]);
  const [dateArr, setDateArr] = useState([]);
  const [dateArrnext, setDateArrNext] = useState([]);

  let date = new Date().getDay();
  // console.log("todday is", days[date]);

  let currentMonthDays = numberOfDays[currentMonth];

  useEffect(() => {
    if (firstMonthYear % 4 === 0 || secondMonthYear % 4 === 0) {
      let updatedDays = [...numberOfDays];
      updatedDays[1] = 29;
      setNumberOfDays(updatedDays);
    } else {
      setNumberOfDays(defaultnumberofDays);
    }
  }, [firstMonthYear, secondMonthYear]);

  useEffect(() => {
    const nexMonth = firstMonth + 1;
    const nextMonthdata = nexMonth > 12 ? 1 : nexMonth;

    fetchCalenderAvailablity(firstMonthYear, firstMonth, nexMonth);
  }, [currentMonth, firstMonth, secondMonth]);

  //.....................................................................useEffect
  const fetchCalenderAvailablity = async (year, month1, month2) => {
    let data = {
      year: year,
      month1: month1,
      month2: month2,
      id: activityId,
      // id:'64d3a59005edf815fbfb47b9'
    };
    let res = await getCalenderWise(data);
    if (res) {
      setisloading(false);
    }
    if (res.status === 204) {
    }
    if (res && res.status) {
      const dateSet = new Set(res.data?.map((item) => item._id));
      // Loop through the second array and update "str" to "1" if the date matches
      firstMonthDays.forEach((subArray) => {
        subArray.forEach((item) => {
          if (item && item.date) {
            const dateString = `${item.year}-${item.month
              .toString()
              .padStart(2, "0")}-${item.date.toString().padStart(2, "0")}`;
            if (dateSet.has(dateString)) {
              const slotCount = res.data?.filter(
                (item) => item._id == dateString
              );
              item.str = slotCount[0]?.remainingUsers;
              setisloading(false);
            }
          }
        });
      });
      secondMonthDays.forEach((subArray) => {
        subArray.forEach((item) => {
          if (item && item.date) {
            const dateString = `${item.year}-${item.month
              .toString()
              .padStart(2, "0")}-${item.date.toString().padStart(2, "0")}`;
            if (dateSet.has(dateString)) {
              const slotCount = res.data?.filter(
                (item) => item._id == dateString
              );
              item.str = slotCount[0]?.remainingUsers;
              setisloading(false);
            }
          }
        });
      });
    } else {
      setisloading(false);
      // setisloading(false);
    }

  };
  const firstMonthDays = useMemo(() => {
    setisloading(true);
    let arr = [];
    let row = [];
    let startingDate = new Date(firstMonthYear, firstMonth - 1, 1);
    let startingDay = startingDate.getDay();
    const nexMonth = firstMonth + 1;
    let datareq = {
      year: currentYear,
      month1: firstMonth,
      month2: nexMonth,
      id: activityId,
    };
    getCalenderWise(datareq)
      .then((res) => { 
        console.log("kms data =====> ",res)
        setisloading(false);
        if (res && res.status) {
          if (startingDay) {
            for (let index = 1; index <= startingDay; index++) {
              row.push("");
            }
          }
          for (let index = 1; index <= numberOfDays[firstMonth - 1]; index++) {
            let data = {
              str: "0",
              date: index,
              year: firstMonthYear,
              month: firstMonth,
            };

            res?.data?.forEach((element) => {
              let splitdate = element._id.split("-");
              let finddate = splitdate[splitdate.length - 1];
              let findmonth = splitdate[splitdate.length - 2];
              let findyear = splitdate[splitdate.length - 3];
              if (
                finddate == index &&
                findmonth == firstMonth &&
                findyear == firstMonthYear
              ) {
                data.str = element.remainingUsers;
              }
            });
            row.push(data);
            if (row.length === 7) {
              arr.push(row);
              row = [];
            }
            if (index === numberOfDays[firstMonth - 1] && row.length !== 0) {
              arr.push(row);
            }
            setDateArr(arr);
            setisloading(false);
          }
        } else {
          if (startingDay) {
            for (let index = 1; index <= startingDay; index++) {
              row.push("");
            }
          }
          for (let index = 1; index <= numberOfDays[firstMonth - 1]; index++) {
            let data = {
              str: "0",
              date: index,
              year: firstMonthYear,
              month: firstMonth,
            };
            row.push(data);
            if (row.length === 7) {
              arr.push(row);
              row = [];
            }
            if (index === numberOfDays[firstMonth - 1] && row.length !== 0) {
              arr.push(row);
            }
          }
          setDateArr(arr);
          setisloading(false);
        }
      })
      .catch((err) => {
        setisloading(false);
        console.log("error", err);
      });
    return arr;
  }, [firstMonth, firstMonthYear]);
  const secondMonthDays = useMemo(() => {
    setisloading(true);
    let arr = [];
    let row = [];
    let startingDate = new Date(secondMonthYear, secondMonth - 1, 1);
    let startingDay = startingDate.getDay();
    const nexMonth = secondMonth + 1;
    let datareq = {
      year: secondMonthYear,
      month1: secondMonth,
      month2: secondMonth == 12 ? 1 : nexMonth,
      id: activityId,
    };
    getCalenderWise(datareq)
      .then((res) => {
        setisloading(false);
        if (res && res.status) {
          if (startingDay) {
            for (let index = 1; index <= startingDay; index++) {
              row.push("");
            }
          }
          for (let index = 1; index <= numberOfDays[secondMonth - 1]; index++) {
            let data = {
              str: "0",
              date: index,
              year: secondMonthYear,
              month: secondMonth,
            };
            res?.data?.forEach((element) => {
              let splitdate = element._id.split("-");
              let finddate = splitdate[splitdate.length - 1];
              let findmonth = splitdate[splitdate.length - 2];
              let findyear = splitdate[splitdate.length - 3];

              if (
                finddate == index &&
                findmonth == secondMonth &&
                findyear == secondMonthYear
              ) {
                data.str = element.remainingUsers;
              }
            });
            row.push(data);
            if (row.length === 7) {
              arr.push(row);
              row = [];
            }
            if (index === numberOfDays[secondMonth - 1] && row.length !== 0) {
              arr.push(row);
            }
            setDateArrNext(arr);
            // setisloading(false);
          }
        } else {
          if (startingDay) {
            for (let index = 1; index <= startingDay; index++) {
              row.push("");
            }
          }
          for (let index = 1; index <= numberOfDays[secondMonth - 1]; index++) {
            let data = {
              str: "0",
              date: index,
              year: secondMonthYear,
              month: secondMonth,
            };
            row.push(data);
            if (row.length === 7) {
              arr.push(row);
              row = [];
            }
            if (index === numberOfDays[secondMonth - 1] && row.length !== 0) {
              arr.push(row);
            }
          }
          setDateArrNext(arr);
          setisloading(false);
        }
      })
      .catch((err) => {
        setisloading(false);
        console.log(err);
      });

    return arr;
  }, [secondMonth, secondMonthYear]);
  const nextMonth = () => {
    setFirstMonth((prev) => (prev === 12 ? 1 : prev + 1));
    setSecondMonth((prev) => (prev === 12 ? 1 : prev + 1));
    if (firstMonth === 12) {
      setFirstMonthYear((prev) => prev + 1);
    }
    if (secondMonth === 12) {
      setSecondMonthYear((prev) => prev + 1);
    }
  };
  const prevMonth = () => {
    setFirstMonth((prev) => (prev === 1 ? 12 : prev - 1));
    setSecondMonth((prev) => (prev === 1 ? 12 : prev - 1));
    if (firstMonth === 1) {
      setFirstMonthYear((prev) => prev - 1);
    }
    if (secondMonth === 1) {
      setSecondMonthYear((prev) => prev - 1);
    }
  };
  return (
    <div
      className="inputs"
      onClick={(e) => {
        e.stopPropagation();
        setCalendarShow(true);
      }}
    >
      <div className="type1">
        <div className="fields">
          <div
            id="id_startCalendar"
            className="calendar-widget default-today"
            data-next="#id_deadlineCalendar"
            date-min="today"
            tabIndex={-1}
          >
            <div
              className=""
              onClick={(e) => {
                e.stopPropagation();
                setCalendarShow((prev) => !prev);
              }}
            >
              <span className="calSecIcon">
                <i class="fa-solid fa-calendar-days"></i>
              </span>
              <input
                className="date-field"
                id="type1-start"
                type="text"
                placeholder="YYYY/MM/DD"
                readOnly={true}
                value={selectedDate}
              />
              <span className="drpdwn_icon">
                <i className="fa-solid fa-caret-down"></i>
              </span>
            </div>
            {calendarShow && (
              <div className="calendar-wrapper">
                <div className="dual-calendar">
                  <div className="calendar">
                    <div className="calendar-header">
                      <div className="month-text">
                        <p>
                          {months[firstMonth - 1]} {firstMonthYear}
                        </p>
                      </div>
                    </div>
                    <div className="calendar-body">
                      <div className="date-table">
                        <div className="date-table-header">
                          <div className="day sunday">S</div>
                          <div className="day">M</div>
                          <div className="day">T</div>
                          <div className="day">W</div>
                          <div className="day">T</div>
                          <div className="day">F</div>
                          <div className="day saturday">S</div>
                        </div>
                        <div className="date-table-body">
                          {isloading ? (
                            <div
                              style={{
                                marginLeft: "5px",
                                display: "flex",
                                gap: "15px",
                                paddingBottom: "8px",
                              }}
                            >
                              {Array(7)
                                .fill()
                                .map(() => {
                                  return (
                                    <Skeleton
                                      style={{
                                        margin: "8px 0px 0px 0px",
                                      }}
                                      count={6}
                                      height={25}
                                      width={25}
                                    />
                                  );
                                })}
                            </div>
                          ) : (
                            // </div>
                            //   );
                            // })
                            dateArr.map((row, i) => {
                              console.log('firstMonthDays',row)
                              return (
                                <div className="date-table-row" key={i}>
                                  {row?.map((date) => {
                                    return (
                                      <div
                                     
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "center",
                                          // border:'0.5px solid',
                                          // borderColor:'lightgrey'
                                          // boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'
                                        }}
                                        onClick={(e) => {
                                          if (date?.str == "0") {
                                            return false;
                                          }
                                          let choosemonth =
                                            firstMonth < 10
                                              ? "0" + firstMonth
                                              : firstMonth;
                                          let choosedate =
                                            date?.date < 10
                                              ? "0" + date?.date
                                              : date?.date;
                                          let mydate =
                                            firstMonthYear +
                                            "-" +
                                            choosemonth +
                                            "-" +
                                            choosedate;
                                          onSelectDate(mydate);
                                          e.stopPropagation();
                                          setCalendarShow((prev) => !prev);
                                        }}
                                      >
                                        <div
                                          className="date"
                                          style={{
                                            textDecoration:
                                              date?.str == "0"
                                                ? "line-through solid grey 15%"
                                                : "",
                                          }}
                                        >
                                          {date?.date}
                                        </div>
                                        {date?.str == "0" ? null : (
                                          <span
                                            style={{
                                              fontSize: "8px",
                                              color: "green",
                                              fontWeight: "bold",
                                              cursor: "pointer",
                                            }}
                                          >
                                            {date?.str}
                                          </span>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="calendar plus-one">
                    <div className="calendar-header">
                      <div className="month-text">
                        <p>
                          {months[secondMonth - 1]} {secondMonthYear}
                        </p>
                      </div>
                    </div>
                    <div className="calendar-body">
                      <div className="date-table">
                        <div className="date-table-header">
                          <div className="day sunday">S</div>
                          <div className="day">M</div>
                          <div className="day">T</div>
                          <div className="day">W</div>
                          <div className="day">T</div>
                          <div className="day">F</div>
                          <div className="day saturday">S</div>
                        </div>
                        {isloading ? (
                          <div
                            style={{
                              marginLeft: "5px",
                              display: "flex",
                              gap: "15px",
                              paddingBottom: "8px",
                            }}
                          >
                            {Array(7)
                              .fill()
                              .map(() => {
                                return (
                                  <Skeleton
                                    style={{
                                      margin: "8px 0px 0px 0px",
                                    }}
                                    count={6}
                                    height={25}
                                    width={25}
                                  />
                                );
                              })}
                          </div>
                        ) : (
                          dateArrnext.map((row, i) => {
                            return (
                              <div className="date-table-row">
                                {row?.map((date) => {
                                  return (
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        // border:'0.5px solid',
                                        // borderColor:'lightgrey'
                                        // boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'
                                      }}
                                      onClick={(e) => {
                                        if (date?.str == "0") {
                                          return false;
                                        }
                                        let choosemonth =
                                          secondMonth < 10
                                            ? "0" + secondMonth
                                            : secondMonth;
                                        let choosedate =
                                          date?.date < 10
                                            ? "0" + date?.date
                                            : date?.date;

                                        let mydate =
                                          secondMonthYear +
                                          "-" +
                                          choosemonth +
                                          "-" +
                                          choosedate;
                                        onSelectDate(mydate);
                                        e.stopPropagation();
                                        setCalendarShow((prev) => !prev);
                                      }}
                                    >
                                      <div
                                        className="date"
                                        style={{
                                          textDecoration:
                                            date?.str == "0"
                                              ? "line-through solid grey 15%"
                                              : "",
                                        }}
                                      >
                                        {date?.date}
                                      </div>
                                      {date?.str == "0" ? null : (
                                        <span
                                          style={{
                                            fontSize: "8px",
                                            color: "green",
                                            fontWeight: "bold",
                                            cursor: "pointer",
                                          }}
                                        >
                                          {date?.str}
                                        </span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="prev-btn" onClick={prevMonth}>
                    <i className="material-icons">keyboard_arrow_left</i>
                  </div>
                  <div className="next-btn" onClick={nextMonth}>
                    <i className="material-icons"> keyboard_arrow_right</i>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReactCalender;
