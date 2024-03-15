import * as React from 'react';

import Calendar from 'react-multi-date-picker';
export default function BasicDateRangeCalendar() {
  return (
    <>
      <Calendar ca numberOfMonths={2} disableMonthPicker disableYearPicker />
    </>
  );
}
