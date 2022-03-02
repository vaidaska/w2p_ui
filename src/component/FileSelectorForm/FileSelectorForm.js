import React, { useState } from "react";
import api from "../../utils/axios";
import { Container, Row, Col, Form, Button, ProgressBar, Alert } from "react-bootstrap";

const FileSelectorForm = () => {
  const [selectedFiles, setSelectedFiles] = useState();
  const [progress, setProgress] = useState();
  const [error, setError] = useState()

  const submitHandler = (event) => {
    event.preventDefault(); //prevent the form from submitting
    let formData = new FormData();

    formData.append("file", selectedFiles[0]);
    //Clear the error message
    setError("")
    api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (data) => {
        //Set the progress value to show the progress bar
        setProgress(Math.round((100 * data.loaded) / data.total));
      },
    }).catch(error => {
        //const code = error?.response?.data
        const code = "";
        switch (code) {
          case "FILE_MISSING":
            setError("Please select a file before uploading!")
            break
          default:
            setError("Sorry! Something went wrong. Please try again later")
            break
        }
      });
  };

  return (
    <Container>
      <Row>
        <Col lg={{ span: 4, offset: 3 }}>
          <Form
            action="http://localhost:8080/api/upload"
            method="post"
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <Form.Group>
              <Form.Control
                type="file"
                id="exampleFormControlFile1"
                label="Pasirinkite failą"
                name="file"
                onChange={(e) => {
                  setSelectedFiles(e.target.files);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Button variant="secondary" type="submit">
                Įkelti
              </Button>
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            {!error && progress && (
              <ProgressBar now={progress} label={`${progress}%`} />
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FileSelectorForm;
