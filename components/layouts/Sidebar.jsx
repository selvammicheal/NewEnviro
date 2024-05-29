import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import Brand from "../../public/images/agl_logo_white.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Dashboard2 from "../../public/logo/dashboard.svg";

function Sidebar(props) {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    setIsExpanded(props.sidebarOpen);
  }, [props.sidebarOpen]);

  const isActive = (path) => {
    return pathname.startsWith(path);
  };

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isExpanded ? <SlArrowLeft /> : <SlArrowRight />}
      </button>
      <div>
        {isExpanded ? (
          <div>
            <div className="d-flex align-items-center pdb">
              <Image
                src={Brand}
                alt="profile"
                width={40}
                height={40}
                className="nav-profile-img"
                priority={false}
              />
              <div className="pdl13">
                <p className="sidebar-text-login">Last Login:</p>
                <p className="sidebar-text-time">29-03-2024 10:43 AM</p>
              </div>
            </div>
            <Link
              href="/dashboard"
              className={`${
                isActive("/dashboard") ? "activesidebar" : "nonactivesidebar"
              } d-flex align-items-center white-color text-decoration-none`}
            >
              <Image src={Dashboard2} alt="logo" className="mrr12" />
              <p className="sidebar-nav-text">Dashboard</p>
            </Link>
            <Link
              href="/"
              className={`${
                isActive("/attendance") ? "activesidebar" : "nonactivesidebar"
              } d-flex align-items-center white-color text-decoration-none`}
            >
              <Image src={Dashboard2} alt="logo" className="mrr12" />
              <p className="sidebar-nav-text">Attendance</p>
            </Link>
            <Link
              href="/"
              className={`${
                isActive("/timesheet") ? "activesidebar" : "nonactivesidebar"
              } d-flex align-items-center white-color text-decoration-none`}
            >
              <Image src={Dashboard2} alt="logo" className="mrr12" />
              <p className="sidebar-nav-text">Timesheet</p>
            </Link>
            <Link
              href="/"
              className={`${
                isActive("/gurukul") ? "activesidebar" : "nonactivesidebar"
              } d-flex align-items-center white-color text-decoration-none`}
            >
              <Image src={Dashboard2} alt="logo" className="mrr12" />
              <p className="sidebar-nav-text">Gurukul</p>
            </Link>
            <Link
              href="/projectmanagement"
              className={`${
                isActive("/projectmanagement")
                  ? "activesidebar"
                  : "nonactivesidebar"
              } d-flex align-items-center white-color text-decoration-none`}
            >
              <Image src={Dashboard2} alt="logo" className="mrr12" />
              <p className="sidebar-nav-text">Project M</p>
            </Link>
            <Link
              href="survey"
              className={`${
                isActive("/survey")
                  ? "activesidebar"
                  : "nonactivesidebar"
              } d-flex align-items-center white-color text-decoration-none`}
            >
              <Image src={Dashboard2} alt="logo" className="mrr12" />
              <p className="sidebar-nav-text">Survey</p>
            </Link>
          </div>
        ) : (
          <div>
            <div className="pdb">
              <Image src={Brand} alt="profile" width={40} height={40} />
            </div>
            <Link
              href="/dashboard"
              className={`${
                isActive("/dashboard")
                  ? "activesidebarmin"
                  : "nonactivesidebarmin"
              } text-decoration-none text-center d-flex`}
            >
              <Image src={Dashboard2} alt="logo" />
            </Link>
            <Link
              href="/"
              className={`${
                isActive("/attendance")
                  ? "activesidebarmin"
                  : "nonactivesidebarmin"
              } text-decoration-none text-center d-flex`}
            >
              <Image src={Dashboard2} alt="logo" />
            </Link>
            <Link
              href="/"
              className={`${
                isActive("/timesheet")
                  ? "activesidebarmin"
                  : "nonactivesidebarmin"
              } text-decoration-none text-center d-flex`}
            >
              <Image src={Dashboard2} alt="logo" />
            </Link>
            <Link
              href="/"
              className={`${
                isActive("/gurukul")
                  ? "activesidebarmin"
                  : "nonactivesidebarmin"
              } text-decoration-none text-center d-flex`}
            >
              <Image src={Dashboard2} alt="logo" />
            </Link>
            <Link
              href="/projectmanagement"
              className={`${
                isActive("/projectmanagement")
                  ? "activesidebarmin"
                  : "nonactivesidebarmin"
              } text-decoration-none text-center d-flex`}
            >
              <Image src={Dashboard2} alt="logo" />
            </Link>
            <Link
              href="/survey"
              className={`${
                isActive("/survey")
                  ? "activesidebarmin"
                  : "nonactivesidebarmin"
              } text-decoration-none text-center d-flex`}
            >
              <Image src={Dashboard2} alt="logo" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
