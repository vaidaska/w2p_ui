import React from "react";
import { ArrowCounterclockwise } from "react-bootstrap-icons";
import { Container, Button, Form} from "react-bootstrap";
import { isFileDocumentAllowed, convertSizeToMB, resetInputField, MAX_MB } from "../../Utilities/Utilities";
import { uploadFile } from "../../Client/apiHandler";

const FileUpload = ({error, setError, step, setStep, setProgress, setSuccess, selectedFiles, setSelectedFiles, inputKey, setInputKey, isSendable, setIsSendable, setIsTableVisible, fileName, setFileName, setIsFileDeleted, setIsFileActionsVisible, setIsFileValid, setIsDownloadUrlVisible, setDeleteExistingFile}) => {
    
    const fileSelectorHandler = (e) => {
        e.preventDefault();
        const files = e.target.files;
        setStep(step + 1);
        setFileName(files[0].name);
        setSelectedFiles(files);
        //[...selectedFiles, {name: files[0].name, size: files[0].size, type: files[0].type}]
        

        if (files.length > 0) {
            setIsSendable(true);
            const isFileAllowed = isFileDocumentAllowed(files[0]);
            const fileSeizeMB = convertSizeToMB(files[0]);
            if (!isFileAllowed) {
              setDeleteExistingFile(false);
                setError("Failo "+ files[0].name +" plėtinys neleistinas. Turi būti *.doc arba *.docx");
                setIsSendable(false);
            }
            if (fileSeizeMB > MAX_MB) {
                setDeleteExistingFile(false);
                setError("Failas "+ files[0].name +" dydis per didelis ("+ convertSizeToMB(files[0]) +" MB)! Maksimalus failo dydis turi neviršyti: " + MAX_MB + "MB");
                setIsSendable(false);
            }
        } else {
            setIsSendable(false);
        }
        //Debug
        console.log(files);

        setIsSendable(true);

    }
    
    const fileUploadHandler = () => {
        setStep(step + 1);
        // setIsFileActionsVisible(true);
        // if (isFileValid){
        //   setIsFileValid(false);
        // }

        const formData = new FormData();
        
        for (let i = 0; i< selectedFiles.length; i++) {
          formData.append("files", selectedFiles[i], selectedFiles[i].name);
        }
        
        const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: function(progressEvent) {
              var percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentCompleted);
              console.log("Progress: "+ percentCompleted);
            },
          };
          
          if (selectedFiles[0]) {

            // if (e.target.value === '') {
            //   console.log(`empty input !!!!`);
            //   setError("Failas nepasirinktas, pasirinkite failą ir tada siųskite.")
            //   return;
            // }

            uploadFile(formData, config)
            .then((response) => {

                //console.log("RESPONSE: " + response);

              if (response.status === 200) {
                console.log("Response: " + response.data.message);
                console.log("Response: " + JSON.stringify(response.data));
                setSuccess(response.data.message);
                setIsTableVisible(true);
                setFileName(response.data.fileName);
                setIsFileActionsVisible(true);
                //setIsFileDeleted(false);
               // setIsDownloadUrlVisible(false);
              } else {
                console.log("Response status: " + response.status);
                //console.log(error);
              }
            })
            .catch((err) => {

              if (err.response.status === 500 ) {
                console.log(err.response.status )
                setError(true);
                setError(`Įsijunk serverį, programuotojau :). Klaida ${err.response.status}!`);
              }
              
              if (err.response.status === 404 ) {
                console.log(err.response.status )
                setError(`Nerasta. Klaida ${err.response.status}!`);
              }

              if (err.response.status === 417 ) {
                console.log(err.response.status )
                setError(`Neatitiko lūkęsčių. Klaida ${err.response.status}!`);
              }

              if (err.response.data.message !== "") {

                if (err.response.status === 406) {
                  setSuccess(false);
                  setProgress(false);
                  setIsTableVisible(false);
                  setDeleteExistingFile(true);
                  setError(`Toks failas jau egzistuoja. Klaida ${err.response.status}! server: ` + err.response.data.message);
                }
                
                if (err.response.status === 417 ) {
                  //setError(err.response.data.message)
                  setSuccess(false);
                  setProgress(false);
                  setIsTableVisible(false);
                  setDeleteExistingFile(true);
                  setError(`Toks failas jau egzistuoja. Klaida ${err.response.status}! server: ` + err.response.data.message);
                }

                if (err.response.status === 500 ) { 
                  setError(`Įsijunk serverį, programuotojau :). Klaida ${err.response.status}!`);
                }

                setError(err.response.data.message);
              } else {
                setError(err.message);
              }
            });
        }
    }

    const goToStepOne = () => {
        setStep(0);
        setProgress(0);
        setIsSendable(false);
        setError(false);
        setSuccess(false);
        setIsTableVisible(false);
        setInputKey(resetInputField);
        setIsFileDeleted(false);
        setIsFileActionsVisible(false);
        setIsFileValid(false);
        setIsDownloadUrlVisible(false);
        setDeleteExistingFile(false);
    }

    return (
        <Container className="d-flex flex-row">
        <Form method={"post"} encType={"multipart/form-data"} className="container d-flex flex-row" style={{"paddingLeft": 0, "paddingRight": 0}}>
            {/* <Form.Control multiple   - file input for multiple files*/}
            {step > 0 && <Button variant="outline-secondary" className="me-3"  onClick={goToStepOne}><ArrowCounterclockwise /></Button>}<Form.Control multiple type="file" name="file" key={inputKey || ''} onChange={fileSelectorHandler}/>
            {!error && isSendable && <span><Button className="ms-3" variant="outline-secondary" id="send-btn" onClick={fileUploadHandler}>Siųsti</Button></span>}
        </Form>
        </Container>
    )
}

export default FileUpload;