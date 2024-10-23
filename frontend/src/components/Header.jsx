import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../style/Header.css";

export default function Header({ onDateChange, onLanguageChange }) {
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    // Set the default date to yesterda
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    setSelectedDate(yesterday);
    onDateChange(yesterday.toISOString().split('T')[0]);
    // const defaultLanguage = "en";
    // setSelectedLanguage(defaultLanguage);
    // onLanguageChange("en");
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = date.toISOString().split('T')[0]; // Format date to "YYYY-MM-DD"
      console.log(formattedDate);
      onDateChange(formattedDate);
    } else {
      onDateChange(null); // Handle case when date is cleared
    }
  };

  return (
    <div className="header">
      <div><h1>NewsFusion</h1></div>
      <div className="container2">
        <div>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            maxDate={new Date()}
            placeholderText="Select a date"
            isClearable
            className="custom-date-picker" // Custom class for the date picker
          />
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
}
