import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function ByStatusProject({ clearAll, handleStatus, statusState }) {
  const handleClick = (buttonName) => {
    handleStatus(buttonName);
  };

  return (
    <div>
      <Button
        variant={statusState === "true" ? "dark" : "outline-dark"}
        className="mrr"
        onClick={() => handleClick("true")}
      >
        Active
      </Button>
      <Button
        variant={statusState === "false" ? "dark" : "outline-dark"}
        className="mrr"
        onClick={() => handleClick("false")}
      >
        In Active
      </Button>
      <Button
        variant={statusState === "all" ? "dark" : "outline-dark"}
        className="mrr"
        onClick={() => handleClick("all")}
      >
        All
      </Button>
    </div>
  );
}

export default ByStatusProject;
