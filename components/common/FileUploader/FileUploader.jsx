import { uploadFile } from "@/services/common";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDropzone } from "react-dropzone";

function FileUploader(props) {
  const [open, setOpen] = useState(true);
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div className="thumb" key={file.name}>
      <div className="thumb-inner">
        <img
          src={file.preview}
          className="thumb-img"
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const handleClose = () => {
    setOpen(false);
    props.handleCloseUpload(false);
  };


  const handleAddFile = async () => {
    try {
      const response = await uploadFile(files[0]); // Assuming 'files' is an array and we are uploading the first file

      if (response.status === true) {
        localStorage.setItem("uploadId",response.attachment._id)
        props.handleCloseUpload(false);
      } else if (response.status === false) {
      }
    } catch (error) {
    }
  };

  const handleUploadFile = () => {
    handleAddFile()
  }

  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>File Uploader</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section className="container file-upload-container">
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          <aside className="thumbs-container">{thumbs}</aside>
        </section>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="dark" onClick={handleUploadFile}>
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FileUploader;
