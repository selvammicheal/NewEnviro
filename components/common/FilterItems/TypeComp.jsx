import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAdvanceFilter } from "@/redux/action/myteam/advanceFilterAction";

function TypeComp() {
  const dispatch = useDispatch();
  const advanceFilter = useSelector((state) => state.advanceFilter);
  console.log("advanceFilter..............", advanceFilter);

  const handleClick = (buttonName) => {
    dispatch(getAdvanceFilter({ jobtype: buttonName }));
  };

  return (
    <div>
      <Button
        variant={advanceFilter.jobtype === "Task" ? "dark" : "outline-dark"}
        className="mrr"
        onClick={() => handleClick("Task")}
      >
        Task
      </Button>
      <Button
        variant={advanceFilter.jobtype  === "Feedback" ? "dark" : "outline-dark"}
        className="mrr"
        onClick={() => handleClick("Feedback")}
      >
        Feedback
      </Button>
      <Button
        variant={advanceFilter.jobtype  === "Correction" ? "dark" : "outline-dark"}
        className="mrr"
        onClick={() => handleClick("Correction")}
      >
        Correction
      </Button>
      <Button
        variant={advanceFilter.jobtype  === "all" ? "dark" : "outline-dark"}
        className="mrr"
        onClick={() => handleClick("all")}
      >
        All
      </Button>
    </div>
  );
}

export default TypeComp;
