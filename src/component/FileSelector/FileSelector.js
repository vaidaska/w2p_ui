import React, { useState, useEffect } from "react";
import { Container, Button, Form, Alert, ProgressBar, Table, Spinner, Collapse, Card } from "react-bootstrap";
import { ArrowCounterclockwise } from "react-bootstrap-icons";
import { isFileDocumentAllowed, convertSizeToMB, resetInputField, MAX_MB } from "../../Utilities/Utilities";
import { uploadFile, convertFile, deleteFile } from "../../Client/apiHandler";
import { isConstructorDeclaration } from "typescript";

const FileSelector = () => {

    const [error, setError] = useState();
    const [errors, setErrors] = useState();
    const [url, setUrl] = useState();
    const [success, setSuccess] = useState();
    const [step, setStep] = useState(0);
    const [inputKey, setInputKey] = useState();
    const [isSendable, setIsSendable] = useState(false);
    const [isFileValid, setIsFileValid] = useState(false);
    const [isTableVisible, setIsTableVisible] = useState(false);
    const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);
    const [isFileActionsVisible, setIsFileActionsVisible] = useState(true);
    const [isDownloadUrlVisible, setIsDownloadUrlVisible] = useState(false);
    const [isFileDeleted, setIsFileDeleted] = useState(false);
    const [progress, setProgress] = useState();
    const [selectedFiles, setSelectedFiles] = useState();

    const fileSelectorHandler = (event) => {
        const files = event.target.files;
        setSelectedFiles(files);
        setError("");
        setStep(step + 1);
        setProgress(0);
        setIsFileActionsVisible(true);
        setIsFileDeleted(false);
        setIsTableVisible(false);

        if (files.length > 0) {
            setIsSendable(true);
            const isFileAllowed = isFileDocumentAllowed(files[0]);
            const fileSeizeMB = convertSizeToMB(files[0]);
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
        setIsFileActionsVisible(true);
        if (isFileValid){
          setIsFileValid(false);
        }

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
          
          if (selectedFiles[0]) {
            uploadFile(formData, config)
            .then((response) => {
              if (response.status === 200) {
                console.log("Response: " + response.data.message);
                console.log("Response: " + JSON.stringify(response.data));
                setSuccess(response.data.message);
                setIsTableVisible(true);
                setIsFileDeleted(false);
                setIsDownloadUrlVisible(false);
              } else {
                console.log("Response status: " + response.status);
                //console.log(error);
              }
            })
            .catch((err) => {
              if (err.response.data.message !== "") {
                if (err.code === 417 ) {
                  setError("Užklausa neįvykdyta. Klaidos kodas 500");  
                }
                setError(err.message);
              }
            });
        }
    }

    const errorHandler = () => {
        setStep(step - 1);
        setInputKey(resetInputField);
        setError("");
        setProgress(0);
        setIsSendable(false);
    }

    const gotoStepOne = () => {
        setStep(0);
        setInputKey(resetInputField);
        setError("");
        setSuccess("");
        setIsSendable(false);
        setIsTableVisible(false);
        //isFileActionsVisible(true);
        setProgress(0);
    }

    const successHandler = () => {
      console.log('suceess !');
      setIsTableVisible(true);
      // setStep(0);
      //setInputKey(resetInputField);
      setError("");
      setSuccess("");
      setIsSendable(false);
      setProgress(0);
    }

    const fileDeleteHandler = () => {
      console.log('delete');
      deleteFile(selectedFiles[0]).then(response => {
        console.log(JSON.stringify(response.data));
        console.log(response.data.message);
        if (response.status === 200) {
          setIsFileActionsVisible(false);
          setIsFileDeleted(true);
        }
      }).catch(error => {
        console.log(JSON.stringify(error.response.data))
      })
    }

    const uploadProgress = {
      onUploadProgress: function(progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
        console.log(percentCompleted);
      },
    }

    const convertFileHandler = () => {
      console.log('convert');
      console.log('filename: ' + selectedFiles[0].name);
      
      setIsSpinnerVisible(true);
      setIsFileActionsVisible(false);

      convertFile(selectedFiles[0]).then(response => {

        if (response.status === 200){
          if (response.data[0].convertedToPdf && response.data[0].pdfValid){
            setIsDownloadUrlVisible(true);
            setUrl(response.data[0].url);
          } else {

            // if (isDownloadUrlVisible){
            //   setIsDownloadUrlVisible(false);
            // }
            setIsFileValid(true);
            console.log(response.data);
            setErrors(response.data[0].message);
            // if (errors.legth > 0) {
            //   getErrorMesages()
            // }
            // for (let i = 0; response.data[0].message.length; i++) {
            //   setErrors(response.data[0].message[i]);
            // }
          }
        }

        //console.log(JSON.stringify(response.data));
        console.log(response.status);
        console.log(response.data[0]);
        //console.log(response.data.convertedToPdf);
      }).catch(error => {
        console.log(JSON.stringify(error.response))
      }).finally( () => {
        setIsSpinnerVisible(false);
        //TEST
        //setIsDownloadUrlVisible(true);
      })

    }

    const getErrorMesages = () => {
      
      //console.log(errors);
      
      // var message = "";
      // for (let i = 0; i < errors.length; i++) {
      //   console.log(errors[i]);
      //   message.concat =  errors[i];
      // }
      // return message;
    }

    const popupHandler = () => {
      return true;
      //console.log("show error popup");
    }

    useEffect(() => {
      getErrorMesages();
    });


    return (
        <Container>
            <Container>
                <Alert>
                    <Container><strong>Reikalavimai:</strong></Container>
                    <Container>Leidžiami failų formatai: *.docx, *.doc</Container>
                    <Container>Maksimalus leidžiamas failo dydis: {MAX_MB} MB </Container>
                    <Container className="mt-3"><strong>ToDo: </strong></Container>
                    <Container>Klaida! - pranešimų formatavimas </Container>
                    <Container>Suskaldyti į komponentus </Container>
                    <Container>Multi failų f-mas </Container>
                    <Container>Ištrinti esamą failą ? Arba patikrinti prieš uploadinant ar toks failas jau yra serveryje įkeltas </Container>
                </Alert>
                {error && <Alert className="d-flex flex-row justify-content-between" variant="danger">{error}<span><Button variant="danger" onClick={errorHandler}>Išvalyti</Button></span></Alert>}
                {success && <Alert className="d-flex flex-row justify-content-between" variant="success">{success}<span><Button variant="success" onClick={successHandler}>Uždaryti</Button></span></Alert>}
                {progress > 0 && <ProgressBar className="mt-3 mb-3" now={progress} label={`${progress}%`} />}
            </Container>
            <Container className="d-flex flex-row">
                {step > 0 && <Button variant="outline-secondary" className="me-3"  onClick={gotoStepOne}><ArrowCounterclockwise /></Button>}<Form.Control multiple type="file" name="file" key={inputKey || ''} onChange={fileSelectorHandler}/>
                {!error && isSendable && <span><Button className="ms-3" variant="outline-secondary" id="send-btn" onClick={fileUploadHandler}>Siųsti</Button></span>}
            </Container>
            {isTableVisible && (<Container className="mt-4">
              <Container className="d-none d-flex justify-content-end"><Button variant="primary">Kovertuoti visus failus</Button></Container>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Failas</th>
                    <th className="text-center">Veiksmas</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    {!isFileDeleted && <td>{selectedFiles[0].name}</td>}
                    {isFileDeleted && <td className="text-decoration-line-through">{selectedFiles[0].name}</td>}
                    {isFileActionsVisible && <td className="text-center"><a className="link-danger" href="#" onClick={fileDeleteHandler}>Trinti</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="#" onClick={convertFileHandler}>Konvertuoti</a></td> }
                    {isSpinnerVisible && <td className="text-center"><Spinner animation="border" variant="primary"><span className="visually-hidden">Loading...</span></Spinner></td>}
                    {isFileDeleted && <td className="text-center text-muted">Filas buvo ištrintas</td>}
                    {isDownloadUrlVisible && <td className="text-center"><a href={url}>Atsisiųsti</a></td>}
                    {isFileValid && <><td className="text-center"><a className="text-warning" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Klaida!</a> 
                    {/* <div style={{minHeight: '150px'}}>
                      <Collapse in={popupHandler || false} dimension="width">
                        <div id="example-collapse-text">
                          <Card body>
                              {errors}
                          </Card>
                        </div>
                      </Collapse>
                    </div> */}
                    <div className="collapse multi-collapse" id="multiCollapseExample1">
                      <div className="card card-body">
                        {
                          //getErrorMesages()
                          errors
                        }
                      </div>
                    </div>
                  </td></>}
                  </tr>
                </tbody>
              </Table>
            </Container>)}
        </Container>
    )
}

export default FileSelector;