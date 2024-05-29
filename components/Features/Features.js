"use client";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import { LuTextQuote } from "react-icons/lu";
import { BsLayoutThreeColumns } from "react-icons/bs";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { MdInsertChartOutlined } from "react-icons/md";
import CustomSwitch from "./CustomSwitch";
import RightArrow from "./RightArrow";

const FeaturesContainer = () => {
  const [search, setSearch] = useState("");
  const searchInput = (event) => {
    setSearch(event.target.value);
  };

  const [data, setData] = useState([
    {
      type: "timeline",
      content:
        "Your timeline is an optimized location to create and manage your epics. To enable and set upthe timeline for a board, visit your board settings.",
    },
    {
      type: "board",
      content:
        "Your timeline is an optimized location to create and manage your epics. To enable and set upthe timeline for a board, visit your board settings.",
    },
    {
      type: "timeline",
      content:
        "Your timeline is an optimized location to create and manage your epics. To enable and set upthe timeline for a board, visit your board settings.",
    },
    {
      type: "backlog",
      content:
        "Your timeline is an optimized location to create and manage your epics. To enable and set upthe timeline for a board, visit your board settings.",
    },
    {
      type: "reports",
      content:
        "Your timeline is an optimized location to create and manage your epics. To enable and set upthe timeline for a board, visit your board settings.",
    },
    {
      type: "timeline",
      content:
        "Your timeline is an optimized location to create and manage your epics. To enable and set upthe timeline for a board, visit your board settings.",
    },
  ]);

  return (
    <div>
      <div className="input-container mb-5">
        <div className="search-icon-container">
          <CiSearch className="people-search-icon" />
        </div>
        <input
          className="people-search features-search"
          type="text"
          placeholder="Search anything here"
          onChange={searchInput}
          value={search}
        />
      </div>

      <div className="feature-container mb-4">
        <div className="features-headlines mb-4">Planning</div>
        <Row>
          {data
            .filter((item) =>
              item.type.toLowerCase().includes(search.toLowerCase())
            )
            .map((item, index) => (
              <Col key={index} sm={4} className="feature-grid-items mb-4">
                <div className="card-feature p-3">
                  <div className="title-feature-card d-flex align-items-center justify-content-between mb-4">
                    <div className="card-icon-container">
                      <div className="icon-box">
                        {item.type === "timeline" ? (
                          <LuTextQuote className="feature-icon" />
                        ) : item.type === "backlog" ? (
                          <HiOutlineBars3BottomLeft className="feature-icon" />
                        ) : item.type === "reports" ? (
                          <MdInsertChartOutlined className="feature-icon" />
                        ) : item.type === "board" ? (
                          <BsLayoutThreeColumns className="feature-icon" />
                        ) : null}
                      </div>
                    </div>
                    <div className="switch-container its-pointer">
                      <CustomSwitch />
                    </div>
                  </div>
                  <div className="feature-description mb-4">
                    <div className="feature-title mb-2">
                      <p className="feature-title-text">Description</p>
                    </div>
                    <div>
                      <p className="feature-description-text">{item.content}</p>
                    </div>
                  </div>
                  <div className="learn-more">
                    <div className="learn-more-text">
                      <span> Learn More About {item.type}</span>
                      <RightArrow />
                    </div>
                  </div>
                </div>
              </Col>
            ))}
        </Row>
      </div>
      <div className="feature-container mb-4">
        <div className="features-headlines mb-4">Planning</div>
        <Row>
          {data
            .filter((item) => item.type.includes(search))
            .map((item, index) => (
              <Col key={index} sm={4} className="feature-grid-items mb-4">
                <div className="card-feature p-3">
                  <div className="title-feature-card d-flex align-items-center justify-content-between mb-4">
                    <div className="card-icon-container">
                      <div className="icon-box">
                        {item.type === "timeline" ? (
                          <LuTextQuote className="feature-icon" />
                        ) : item.type === "backlog" ? (
                          <HiOutlineBars3BottomLeft className="feature-icon" />
                        ) : item.type === "reports" ? (
                          <MdInsertChartOutlined className="feature-icon" />
                        ) : item.type === "board" ? (
                          <BsLayoutThreeColumns className="feature-icon" />
                        ) : null}
                      </div>
                    </div>
                    <div className="switch-container its-pointer">
                      <CustomSwitch />
                    </div>
                  </div>
                  <div className="feature-description mb-4">
                    <div className="feature-title mb-2">
                      <p className="feature-title-text">Description</p>
                    </div>
                    <div>
                      <p className="feature-description-text">{item.content}</p>
                    </div>
                  </div>
                  <div className="learn-more">
                    <div className="learn-more-text">
                      <span> Learn More About {item.type}</span>
                      <RightArrow />
                    </div>
                  </div>
                </div>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
};

export default FeaturesContainer;
