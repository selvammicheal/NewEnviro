import React from "react";
import { IoIosArrowDown } from "react-icons/io";

import Link from "next/link";
import Dashboard2 from "../../public/logo/dashboard.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";

function ProjectSidebar(props) {
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
        <p>Project M.</p>
      </div>
      <div className="d-flex align-items-center">
        <p>Enviro App</p>
        <IoIosArrowDown />
      </div>
      <p className="font07">Software Project </p>
      <div className="mrt2">
        <Link
          href="/projectmanagement/projects"
          className={
            getClassName("projects") +
            " d-flex align-items-center pdb text-decoration-none white-color"
          }
        >
          <Image src={Dashboard2} alt="logo" className="mrr12" />
          <p className="sidebar-nav-text">All Projects</p>
        </Link>
        <Link
          href="/projectmanagement/myteams"
          className={
            getClassName("myteam") +
            " d-flex align-items-center pdb text-decoration-none white-color"
          }
        >
          <Image src={Dashboard2} alt="logo" className="mrr12" />
          <p className="sidebar-nav-text">My Team</p>
        </Link>
        <Link
          href="/projectmanagement/mywork"
          className={
            getClassName("mywork") +
            " d-flex align-items-center pdb text-decoration-none white-color"
          }
        >
          <Image src={Dashboard2} alt="logo" className="mrr12" />
          <p className="sidebar-nav-text">My Work</p>
        </Link>
        {/* <Link
          href="/projectmanagement/settings"
          className={
            getClassName("settings") +
            " d-flex align-items-center pdb text-decoration-none white-color"
          }
        >
          <Image src={Dashboard2} alt="logo" className="mrr12" />
          <p className="sidebar-nav-text">Setting</p>
        </Link> */}
        <Link
          href="/projectmanagement/people"
          className={
            getClassName("people") +
            " d-flex align-items-center pdb text-decoration-none white-color"
          }
        >
          <Image src={Dashboard2} alt="logo" className="mrr12" />
          <p className="sidebar-nav-text">People</p>
        </Link>
        <Link
          href="/projectmanagement/issues"
          className={
            getClassName("issues") +
            " d-flex align-items-center pdb text-decoration-none white-color"
          }
        >
          <Image src={Dashboard2} alt="logo" className="mrr12" />
          <p className="sidebar-nav-text">Issues</p>
        </Link>
        <Link
          href="/projectmanagement/features"
          className={
            getClassName("features") +
            " d-flex align-items-center pdb text-decoration-none white-color"
          }
        >
          <Image src={Dashboard2} alt="logo" className="mrr12" />
          <p className="sidebar-nav-text">Features</p>
        </Link>
        <Link
          href="/projectmanagement/workflow"
          className={
            getClassName("workflow") +
            " d-flex align-items-center pdb text-decoration-none white-color"
          }
        >
          <Image src={Dashboard2} alt="logo" className="mrr12" />
          <p className="sidebar-nav-text">Workflow</p>
        </Link>
        <Link
          href="/projectmanagement/details"
          className={
            getClassName("details") +
            " d-flex align-items-center pdb text-decoration-none white-color"
          }
        >
          <Image src={Dashboard2} alt="logo" className="mrr12" />
          <p className="sidebar-nav-text">Details</p>
        </Link>
      </div>
    </div>
  );
}

export default ProjectSidebar;
