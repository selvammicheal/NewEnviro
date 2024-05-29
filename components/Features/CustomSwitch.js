"use state";
import React, { useState } from "react";

const CustomSwitch = () => {
  const [isOn, setOn] = useState(false);

  return (
    <div
      className={`switch-outside d-flex justify-content-center align-items-center ${
        isOn ? "active" : ""
      }`}
      onClick={() => setOn(!isOn)}
    >
      <div className="switch-inside"></div>
    </div>
  );
};

export default CustomSwitch;
