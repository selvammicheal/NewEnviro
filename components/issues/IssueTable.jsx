import React, { useState } from "react";
import { FaSort } from "react-icons/fa";

function IssueTable({ data }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [checkList, setCheckList] = useState([]);
  const [isAllChecked, setAllChecked] = useState(false);

  const handleSort = (key) => {
    let direction = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      let valueA = a[sortConfig.key];
      let valueB = b[sortConfig.key];

      // Convert to dates if the key is a date field
      if (["dueDate", "createdDate"].includes(sortConfig.key)) {
        valueA = new Date(valueA);
        valueB = new Date(valueB);
      } else if (typeof valueA === "string" && typeof valueB === "string") {
        // If the values are strings, convert them to lowercase for case-insensitive sorting
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      // Compare values
      if (valueA < valueB) {
        return sortConfig.direction === "asc" ? -1 : 1;
      } else if (valueA > valueB) {
        return sortConfig.direction === "asc" ? 1 : -1;
      } else {
        return 0;
      }
    });
  };

  const singleChecker = (index) => {
    let arr = [...checkList];
    if (!arr.includes(index)) {
      arr.push(index);
    } else {
      arr = arr.filter((el) => el != index);
    }
    if (arr.length < data.length) {
      setAllChecked(false);
    }
    if (arr.length >= data.length) {
      setAllChecked(true);
    }
    setCheckList(arr);
  };

  const allChecker = () => {
    let arr = [...checkList];
    if (!isAllChecked) {
      setCheckList(data.map((el, ind) => el.id));
      setAllChecked(true);
    } else {
      arr = [];
      setCheckList(arr);
      setAllChecked(false);
    }
  };

  return (
    <div className="table-responsive">
      <div className="issue-inner-parent people-table-container">
        <table className="wid-full">
          <thead className="issue-heading">
            <tr className="table-row issue-heading-row">
              <th scope="col" className="issue-head-check">
                <input
                  className="form-check-input-people form-check-input"
                  type="checkbox"
                  checked={isAllChecked}
                  onChange={allChecker}
                />
              </th>
              <th
                scope="col"
                className="projectdatatable-header-text issue-heading-name"
              >
                Project
                <FaSort
                  className="pdl03 its-pointer"
                  onClick={() => handleSort("projectName")}
                />
              </th>
              <th
                scope="col"
                className="projectdatatable-header-text issue-heading-type"
              >
                Type
              </th>
              <th
                scope="col"
                className="projectdatatable-header-text issue-heading-type-1"
              >
                Epic Name
                <FaSort
                  className="pdl03 its-pointer"
                  onClick={() => handleSort("epicName")}
                />
              </th>
              <th
                scope="col"
                className="projectdatatable-header-text issue-heading-type-1"
              >
                Total Assignee
                <FaSort
                  className="pdl03 its-pointer"
                  onClick={() => handleSort("totalAssignee")}
                />
              </th>
              <th
                scope="col"
                className="projectdatatable-header-text issue-heading-type-1"
              >
                Resolution
              </th>
              <th
                scope="col"
                className="projectdatatable-header-text issue-heading-duedate"
              >
                Due Date
                <FaSort
                  className="pdl03 its-pointer"
                  onClick={() => handleSort("dueDate")}
                />
              </th>
              <th
                scope="col"
                className="projectdatatable-header-text issue-heading-created"
              >
                Created Date
                <FaSort
                  className="pdl03 its-pointer"
                  onClick={() => handleSort("createdDate")}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData().map((item, index) => (
              <tr key={index} className="table-row">
                <td scope="row" className="pdt pdl pdr pdb">
                  <input
                    className="form-check-input-people form-check-input"
                    type="checkbox"
                    checked={checkList.includes(item.id)}
                    onChange={() => singleChecker(item.id)}
                  />
                </td>
                <td className="issue-data-type-1">
                  <p>{item.projectName}</p>
                </td>
                <td className="issue-data-type">{item.type}</td>
                <td className="issue-data-type-1">{item.epicName}</td>
                <td className="issue-data-type-1">{item.totalAssignee}</td>
                <td className="issue-data-type-1">{item.resolution}</td>
                <td className="issue-data-duedate">{item.dueDate}</td>
                <td className="issue-data-created">{item.createdDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IssueTable;
