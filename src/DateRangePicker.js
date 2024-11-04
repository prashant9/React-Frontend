import React, { useState } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const DateRangePickerComponent = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <DateRangePicker
      startDate={startDate}
      startDateId="start_date_id"
      endDate={endDate}
      endDateId="end_date_id"
      onDatesChange={({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
        const date = new Date(startDate);

// Get parts of the date
const year = date.getFullYear(); // e.g., 2021
const month = date.getMonth() + 1; // Months are 0-based, so add 1
const day = date.getDate(); // e.g., 1

// Format the date as YYYY-MM-DD
const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
console.log(formattedDate); // Outputs: 2021-10-01
        console.log(new Date(startDate) +" : "+new Date(endDate))
      }}
      focusedInput={focusedInput}
      
      onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
    />
  );
};

export default DateRangePickerComponent;
