import React from "react";
import HistoryBox from "./HistoryBox";

function History(props) {
  return (
    <div>
      <HistoryBox
        icon="AR"
        name="Arun Kumar"
        time="12 April 2023 at 12:23 AM"
        task="Updated The Link"
        bg={"#A7C8F0"}
      />
      <HistoryBox
        icon="BB"
        name="Bhashit Bhardwaj"
        time="1 April 2023 at 2:23 AM"
        task="Attached The File"
        bg={"#F0A7A7"}
      />
      <HistoryBox
        icon="RS"
        name="Ram Singh"
        time="2 April 2023 at 11:03 AM"
        task="Updated the comment"
        bg={"#A7C8F0"}
      />
      <HistoryBox
        icon="MD"
        name="Mike Deo"
        time="3 April 2023 at 07:43 AM"
        task="Pinned his comment"
        bg={"#F0A7A7"}
      />
      <HistoryBox
        icon="LD"
        name="Leam Kin"
        time="7 April 2023 at 10:23 PM"
        task="Updated the Task"
        bg={"#A7C8F0"}
      />
    </div>
  );
}

export default History;
