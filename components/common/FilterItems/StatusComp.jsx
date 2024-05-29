import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAdvanceFilter } from "@/redux/action/myteam/advanceFilterAction";

function StatusComp() {
  const dispatch = useDispatch();
  const advanceFilter = useSelector((state) => state.advanceFilter);
  console.log("advanceFilter..............", advanceFilter);

  const handleClick = (buttonName) => {
    dispatch(getAdvanceFilter({ status: buttonName }));
  };

  return (
    <div>
      <Button
        variant={advanceFilter.status === "To-do" ? "dark" : "outline-dark"}
        className="mrr"
        onClick={() => handleClick("To-do")}
      >
        To-do
      </Button>
      <Button
        variant={advanceFilter.status === "In Progress" ? "dark" : "outline-dark"}
        className="mrr"
        onClick={() => handleClick("In Progress")}
      >
        In Progress
      </Button>
      <Button
        variant={advanceFilter.status === "Ready For QA" ? "dark" : "outline-dark"}
        className="mrr"
        onClick={() => handleClick("Ready For QA")}
      >
        Ready For QA
      </Button>
      <Button
        variant={advanceFilter.status === "Done" ? "dark" : "outline-dark"}
        className="mrr"
        onClick={() => handleClick("Done")}
      >
        Done
      </Button>
      <Button
        variant={advanceFilter.status === "All" ? "dark" : "outline-dark"}
        className="mrr"
        onClick={() => handleClick("All")}
      >
        All
      </Button>
    </div>
  );
}

export default StatusComp;
