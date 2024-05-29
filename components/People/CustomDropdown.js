import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoIosArrowDown } from "react-icons/io";

const CustomDropdown = ({ selected, updateData, id }) => {
  const [current, setCurrent] = useState(selected);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    updateData(id, event.targ);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // useEffect(()=>{},[current])

  const changeRole = async (role) => {
    const result = await updateData(id, role);

    if (result) {
      setCurrent(role);
      handleClose();
    } else {
      handleClose();
    }
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<IoIosArrowDown />}
        className="people-table-dropdown-button"
      >
        {current}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => {
            changeRole("Developer");
          }}
          className="font09"
        >
          Developer
        </MenuItem>
        <MenuItem
          onClick={() => {
            changeRole("Solution Architect");
          }}
          className="font09"
        >
          Solution Architect
        </MenuItem>
        <MenuItem
          onClick={() => {
            changeRole("Product Owner");
          }}
          className="font09"
        >
          Product Owner
        </MenuItem>
        <MenuItem
          onClick={() => {
            changeRole("Project Manager");
          }}
          className="font09"
        >
          Project Manager
        </MenuItem>
        <MenuItem
          onClick={() => {
            changeRole("Business Analyst");
          }}
          className="font09"
        >
          Business Analyst
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CustomDropdown;
