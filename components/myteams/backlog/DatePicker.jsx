import { updateJobById } from "@/services/MyTeam";
import React, { forwardRef, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";

function DatePicker(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [convertedDate, setConvertedDate] = useState(props.dueDate);

  useEffect(() => {
  }, [convertedDate]);

  function formatDateForBackend(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleDatePicker = async (date) => {
    const converted = formatDate(date)
    setConvertedDate(converted)
    formatDateForBackend(date)
    const data = {
      "due_date": formatDateForBackend(date)
    }
    try {
      const response = await updateJobById(props.jid, data);
      if (response.status === true) {
        console.log("Job has been updated")
      }
      else if (response.status === false) {
        console.log("Job has not been updated")
      }

    } catch (error) {
      console.error('Error creating project:', error);
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
    let daySuffix;
    if (day === 1 || day === 21 || day === 31) {
      daySuffix = "st";
    } else if (day === 2 || day === 22) {
      daySuffix = "nd";
    } else if (day === 3 || day === 23) {
      daySuffix = "rd";
    } else {
      daySuffix = "th";
    }
    return `${day}${daySuffix} ${months[monthIndex]} ${year}`;

  }
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="example-custom-input bg-transparent p-0 mrlh border-0"
      onClick={onClick}
      ref={ref}
    >
      <FaRegCalendarAlt />
    </button>
  ));

  return (
    <div className="datepickter-cus">
      <p className="no-line-break">{convertedDate}</p>
      <ReactDatePicker
        selected={startDate}
        onChange={(date) => handleDatePicker(date)}
        customInput={<ExampleCustomInput />}
      />
    </div>
  );
}

export default DatePicker;
