import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function SearchBox() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <div className="searchbox">
        <form action="" className="activityHeaderFrom">
          <div className="input-group mb-2 mr-sm-2" style={{ position: 'relative', zIndex: '1' }}>
            <input
              type="text"
              className="form-control"
              id=""
              placeholder="Username"
              style={{
                width: '476px',
                height: '60px',
                borderRadius: '15px',
                padding: '5px 150px 5px 50px',
              }}
            />
            <div className="ActivitySearch border-0">
              <button className="btn">Search</button>
            </div>
            <div
              className=""
              style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translate(0, -50%)',
                width: '20px',
                height: '20px',
                zIndex: '2',
              }}
            >
              <button className="btn">
                <i className="fa-solid fa-magnifying-glass magIcon"></i>
              </button>
            </div>
          </div>

          <div className="Datepicker_wrap">
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
            <button className="calenderbtn">
              <i className="fa-regular fa-calendar-days"></i>
            </button>
            <div className="arrow_">
              <i className="fa-solid fa-angle-down"></i>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SearchBox;
