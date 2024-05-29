import React from "react";

const Tab = ({ height, bg, width }) => {
  return (
    <div
      style={{
        width: width,
        height: height,
        backgroundColor: bg,
        border: "1px solid black",
      }}
    ></div>
  );
};

export default Tab;
