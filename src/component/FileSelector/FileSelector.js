import React, { useState } from "react";
import { Container, Button, Form, Alert } from "react-bootstrap";
import { ArrowClockwise, ArrowCounterclockwise } from "react-bootstrap-icons";
import { isFileDocumentAllowed, convertSizeToMB, resetInputField, MAX_MB } from "../../Utilities/Utilities";
import { uploadFile } from "../../Client/apiHandler";

const FileSelector = () => {

    const [error, setError] = useState();
    const [step, setStep] = useState(0);
    const [inputKey, setInputKey] = useState();
    const [isSendable, setIsSendable] = useState(false);
    const [progress, setProgress] = useState();
    const [selectedFiles, setSelectedFiles] = useState();

    const fileSelectorHandler = (event) => {
        const files = event.target.files;
        setSelectedFiles(files);
        setError("");
        setStep(step + 1);

        if (files.length > 0) {

            setIsSendable(true);
            
            const isFileAllowed = isFileDocumentAllowed(files[0]);
            const fileSeizeMB = convertSizeToMB(files[0]);

            console.log(isFileAllowed);
            console.log(fileSeizeMB);

            if (!isFileAllowed) {
                setError("Failo "+ files[0].name +" plėtinys neleistinas. Turi būti *.doc arba *.docx");
                setIsSendable(false);
            }

            if (fileSeizeMB > MAX_MB) {
                setError("Failas "+ files[0].name +" dydis per didelis ("+ convertSizeToMB(files[0]) +" MB)! Maksimalus failo dydis turi neviršyti: " + MAX_MB + "MB");
                setIsSendable(false);
            }

        } else {
            setIsSendable(false);
        }
        //Debug
        console.log(files);
    }

    const fileUploadHandler = () => {
        setStep(step + 1);
        
        const formData = new FormData();
        formData.append("file", selectedFiles[0], selectedFiles[0].name);
        
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
            //   setFile(response.data.fileName);
            //   if (response.data.message !== "") {
            //     setSuccess(response.data.message);
            //   }
    
              console.log("Response: " + JSON.stringify(response.data));
            } else {
              console.log("Response status: " + response.status);
              //console.log(error);
            }
          })
          .catch((err) => {
            if (err.response.data.message !== "") {
              setError(err.response.data.message);
            }
            console.log(err);
            console.log("ERROR tate: " + error);
          });

        //alert('Send file ...');
    }

    const errorHandler = () => {
        setStep(step - 1);
        setInputKey(resetInputField);
        setError("");
    }

    const gotoStepOne = () => {
        setStep(0);
        setInputKey(resetInputField);
        setError("");
        setIsSendable(false);
    }

    return (
        <Container>
            <Container>
                <Alert>
                    <Container><strong>Reikalavimai:</strong></Container>
                    <Container>Leidžiami failų formatai: *.docx, *.doc</Container>
                    <Container>Maksimalus leidžiamas failo dydis: {MAX_MB} MB </Container>
                </Alert>
                {error && <Alert className="d-flex flex-row justify-content-between" variant="danger">{error}<span><Button variant="danger" onClick={errorHandler}>Išvalyti</Button></span></Alert>}
            </Container>
            <Container className="d-flex flex-row">
                {step > 0 && <Button variant="outline-secondary" className="me-3"  onClick={gotoStepOne}><ArrowCounterclockwise /></Button>}<Form.Control multiple type="file" name="file" key={inputKey || ''} onChange={fileSelectorHandler}/>
                {!error && isSendable && <span><Button variant="outline-secondary" id="send-btn" onClick={fileUploadHandler}>Siųsti</Button></span>}
            </Container>
        </Container>
    )
}

export default FileSelector;