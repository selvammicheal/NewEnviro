import React, { useEffect, useRef, useState } from "react";
import { IoMdMore } from "react-icons/io";
import Checkbox from "@mui/material/Checkbox";
import { MdLibraryBooks } from "react-icons/md";
import Assignee from "./Assignee";
import TableDoneItem from "./Done";
import PriorityItem from "./PriorityItem";
import Dropdown from "react-bootstrap/Dropdown";
import { MdOutlineDragIndicator } from "react-icons/md";
import DatePicker from "./DatePicker";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { formatDate } from "@/utils/Project";

const SubtaskRow = (props) => {
  return (
    <tr>
      <td className="p-0 bg-transparent">
        <div className="d-flex justify-content-start">
          <Checkbox />
          <div className="vertical-line"></div>
          <div className="pdl">
            <MdOutlineLibraryBooks className="mrt mrr mrl icon-react-cus " />
          </div>
          <p className="fontsize-08 white-nowrap mrt">{props.item.title}</p>
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="dropdown-toggle-backlog"
            >
              <IoMdMore color="disabled" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item >View</Dropdown.Item>
              <Dropdown.Item >Edit</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </td>

      <td className="text-center">
        <Assignee ownername={props.item.assignee_name} jid={props.item._id} />
      </td>

      <td>
      <TableDoneItem status={props.item.status} jid={props.item._id}/>
      </td>

      <td>
        <div className="d-flex align-items-center justify-content-center pda03 font08">

        <DatePicker dueDate={formatDate(props.item.due_date)} jid={props.item._id}/>

        </div>
      </td>

      <td>
      <PriorityItem priority={props.item.priority}  jid={props.item._id}/>
      </td>
      <td>
        <p className="timeline-data-cell-backlog">
          {props.item.timeline === null ? "NIL" : formatDate(props.item.timeline)}
        </p>

      </td>
      <td>
        <div className="d-flex align-items-center justify-content-center mrt04 font08">
          {formatDate(props.item.updated_at)}
        </div>
      </td>
      <td className=" font08" style={{ textAlign: "center" }}>null</td>
    </tr>
  );
};

export default SubtaskRow;
