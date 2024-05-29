import React from "react";
import FileBox from "./FileBox";

function Files(props) {
  return (
    <div>
      <FileBox
        image={true}
        name="Arun Kumar"
        desc=""
        icon="AR"
        bg={"#A7C8F0"}
      />
      <FileBox image={true} name="Ram Singh" desc="" icon="RS" bg={"#F0A7A7"} />
    </div>
  );
}

export default Files;
