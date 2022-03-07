import React, { useState } from "react";
import { uploadFile, convertFile } from "../../utils/apiHandler";
// import api from "../../utils/axiosClient";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ProgressBar,
  Alert,
} from "react-bootstrap";
import axios from "axios";

const FileSelectorForm = () => {
  const [selectedFiles, setSelectedFiles] = useState();
  const [progress, setProgress] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [file, setFile] = useState();

  const convertFiles = (file) => {
    convertFile(file)
      .then(response => {
        console.log(JSON.stringify(response.data));
      }).catch(error => {
        console.log(JSON.stringify(error.response.data))
      })
  }

  const submitHandler = (event) => {
    event.preventDefault(); //prevent the form from submitting
    const formData = new FormData();

    formData.append("file", selectedFiles[0]);

    //Clear the error message
    setError("");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: function(progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
        console.log(percentCompleted);
      },
    };

    uploadFile(formData, config)
      .then((response) => {
        if (response.status === 200) {
          console.log("Response: " + response.data.message);
          setFile(response.data.fileName);
          if (response.data.message !== "") {
            setSuccess(response.data.message);
          }

          console.log("Response: " + JSON.stringify(response.data));
        } else {
          console.log("Response status: " + response.status);
          console.log(error);
        }
      })
      .catch((err) => {
        if (err.response.data.message !== "") {
          setError(err.response.data.message);
        }
        console.log(err);
        console.log("ERROR tate: " + error);
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
              <Button className="mt-3" variant="secondary" type="submit">
                Įkelti
              </Button>
            </Form.Group>
            {error && (
              <Alert className="mt-3" variant="danger">
                {error}
              </Alert>
            )}
            {success && (
              <Alert className="mt-3" variant="success">
                {success}
              </Alert>
            )}
            {success && (
              <Button variant="success" onClick={() => { convertFiles(file)  }}>
                Convert
              </Button>
            )}
            {!error && progress && (
              <ProgressBar
                className="mt-3"
                now={progress}
                label={`${progress}%`}
              />
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FileSelectorForm;
