import React, { useState } from "react";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { MdChatBubbleOutline } from "react-icons/md";
import { MdOutlineMoreVert } from "react-icons/md";
import Image from "next/image";
import WorkImg from "../../../public/images/work.png";
import { IoDiamondOutline } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import { FaRegMap } from "react-icons/fa6";
import { MdAttachFile } from "react-icons/md";
import { Modal } from "react-bootstrap";

function KanbanCard(props) {
  const { item } = props;
  const [showModalImg, setShowModalImg] = useState(false);

  const DueDateCount = (data) => {
    const givenDate = new Date(data);
    const currentDate = new Date();
    const timeDifference = currentDate - givenDate;
    const dueDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return dueDays
  }

  function getFirstTwoUppercase(str) {
    const firstTwoChars = str.slice(0, 2);
    const result = firstTwoChars.toUpperCase();
    return result;
}

  const handleImageClick = () => {
    setShowModalImg(true);
  };
  const handleCloseModal = () => {
    setShowModalImg(false);
  };

  const handleCardClick = () => {
    props.handleShowModalForAll(true);
  };
  return (
    <div className="kcard-parent">
      <div className="d-flex justify-content-between pdbh">
        <div
          className="d-flex justify-content-between"
          onClick={handleCardClick}
        >
          <MdOutlineAssignmentInd className="assignment-outline-icon" />
          <p className="kcard-title">{item.title}</p>
        </div>
        <div className="d-flex justify-content-between">
          <MdChatBubbleOutline className="chat-bubble-outline-icon" />
          <p className="gray-color font08">{item.comment_count}</p>
          <MdOutlineMoreVert className="more-vert-outline-icon" />
        </div>
      </div>
      <p className="kcard-desc" onClick={handleCardClick}>
        {item.summary}
      </p>
      {/* {item.img === "url" ? (
        <div className="kcard-image-parent">
          <>
            <Image
              src={WorkImg}
              alt="logo"
              layout="fill"
              objectFit="cover"
              onClick={handleImageClick}
            />
            <Modal
              show={showModalImg}
              onHide={handleCloseModal}
              centered
              size="md"
            >
              <Modal.Body>
                <Image
                  src={WorkImg}
                  alt="enlarged"
                  className="modal-body-image"
                />
              </Modal.Body>
            </Modal>
          </>
        </div>
      ) : null} */}
      {
        item.milestone_name &&
        <div className="d-flex pdb03">
          <FaRegMap className="mapoutline-icon-kcard" />
          <p className="pdt02 pdl03 font07">{item.milestone_name}</p>
        </div>
      }

      {
        item.epicDetail &&
        <div className="d-flex pdb03">
          <IoDiamondOutline className="DiamondOutlinedIcon-kcard" />
          <p className="pdl03 font07 pdt02">{item.epicDetail.title}</p>
        </div>
      }

      <div className="pdb03 d-flex">
        <MdAccessTime />
        <p className="pdl03 font07 pdt02">{`${DueDateCount(item.due_date)} days left`}</p>
      </div>
      {/* <div className="d-flex pdb03">
        <MdAttachFile />
        <p className="pdl03 font07 pdt02 blue-color">{item.attachment}</p>
      </div> */}
      <div className="cus-button-group">
        <button className="cus-button-card avatar-pink">{getFirstTwoUppercase(item.assignee_name)}</button>
      </div>
    </div>
  );
}

export default KanbanCard;
