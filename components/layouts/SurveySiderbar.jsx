import React from "react";
import { IoIosArrowDown } from "react-icons/io";

import Link from "next/link";
import Dashboard2 from "../../public/logo/dashboard.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";

function SurveySidebar(props) {
  const pathname = usePathname();
  const isActive = (path) => {
    return pathname.includes(path);
  };
  const getClassName = (path) => {
    return isActive(path) ? "activeprojectsidebar" : "nonactiveprojectsidebar";
  };
  return (
    <div className="projectsidebar">
      <div className="d-flex align-items-center pdb2">
        <p>Survey</p>
      </div>
      <div className="d-flex align-items-center">
        <p>Enviro App</p>
        <IoIosArrowDown />
      </div>
      <p className="font07">Software Project </p>
      <div className="mrt2">
        <Link
          href="/survey/survey-list"
          className={
            getClassName("survey-list") +
            " d-flex align-items-center pdb text-decoration-none white-color"
        }
        >
          <Image src={Dashboard2} alt="logo" className="mrr12" />
          <p className="sidebar-nav-text">Suvey List</p>
        </Link>
   
      </div>
    </div>
  );
}

export default SurveySidebar;
