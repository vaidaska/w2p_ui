import React, {useMemo, useState} from "react";
import {useDropzone} from 'react-dropzone';
import { Button, Container, Alert, ProgressBar, Spinner } from "react-bootstrap";
import { baseStyle, focusedStyle, acceptStyle, rejectStyle } from "./FileDropzoneStyle";
import { convertFiles, uploadFile } from "../Client/apiHandler";
import ConvertedFileList from "./ConvertedFileList";

const FileDropZone = ({convertedFiles, setConvertedFiles}) => {

    const [progress, setProgress] = useState(0);
    const [errorAlert, setErrorAlert] = useState();
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);
    // const [selectedFiles, setSelectedFiles] = useState([]); 
    // const [processedSelectedFiles, setPprocessedSelectedFiles] = useState([]); 

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
      } = useDropzone({
          accept: ".doc, .docx",
          onDrop: (acceptedFiles) => {
            //setSelectedFiles(acceptedFiles)
          }
      });
    
      const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isFocused,
        isDragAccept,
        isDragReject
      ]);


    if (acceptedFiles.length > 0) {
        console.log('ACCEPTED FILES: ');
        console.log(acceptedFiles)
    }

    const files = acceptedFiles.map(file => (
        <li key={file.path} className={"list-group-item"}>
          {file.path} - {file.size} bytes
        </li>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path} className={"list-group-item"}>
          {file.path} - {file.size} bytes
          <ul>
            {errors.map(e => (
              <li key={e.code}>{e.message}</li>
            ))}
          </ul>
        </li>
      ));

    const uploadAllFilesHandler = () => {
        console.log('---------- UPLOAD ALL --------------');
        
        const formData = new FormData();
        
        if (acceptedFiles.length > 0) {
            for (let i = 0; i < acceptedFiles.length; i++) {
                formData.append("files", acceptedFiles[i], acceptedFiles[i].name);
            }
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

        uploadFile(formData, config)
            .then(response => {
                if (response.status === 200){
                    setUploadedFiles(response.data)
                    console.log('UPLOADED FILES: ');
                    console.log(response.data);
                }

            }).catch(error => {

                if (error.message === "Request failed with status code 500") {
                    setErrorAlert(`Įsijunk serverį, programuotojau :), Klaida: 500`)
                    return;
                }

                if (error.status === 500) {
                    setErrorAlert(`Įsijunk serverį, programuotojau :), Klaida: ${error.status}`)
                } 
                if (error.status === 400 || error.status === 404) {
                    setErrorAlert(`Kažko trūksta ..., Klaida: ${error.status}`)
                } 
                setErrorAlert(error.message);
            })

    }

    const serverResponseAfterUpload = uploadedFiles.map((file, index) => (
        <li key={index} className={"list-group-item"}>
        { (file.fileUploaded) ? <Container>{file.fileName}</Container>: <Container>{"Existing.... " + file.message}</Container>}
          
        </li>
    ));

    const filteredUploadedFiles = uploadedFiles.filter(file => file.fileUploaded)

    const convertAllFilesHandler = () => {
        console.log('---------- CONVERT ALL --------------');
        console.log('UPLOADED FILTERED FILES: ');
        console.log(filteredUploadedFiles);

        if (filteredUploadedFiles.length > 0) {
            setIsSpinnerVisible(true);
            convertFiles()
                .then(response => {
                    console.log('Converter - Response data');
                    console.log(response);
                    if (response.status === 200) {
                        setConvertedFiles(response.data)
                        setIsSpinnerVisible(false);
                    }

                }).catch(error => {
                    console.log('Converter - ERROR data')
                    console.log(JSON.stringify(error));
                })
        } else {
            console.log('Failų sąrašas tučias, nėra ką siųsti į serverį ...');
        }

    }

    console.log('COVERTED FILES: ');
    console.log(convertedFiles);

    const convertedFilesMap = convertedFiles.map((file) => (
        //<ConvertedFileList file={file} />
        //<li key={file.fileName} className={"list-group-item"}><a href={(file.pdfValid) ? file.url : "#"}>{file.fileName}</a> <span>{(file.pdfValid) ? "#" : file.message}</span></li>
        
            <>(file.pdfValid && file.convertedToPdf) ? <li>{file.url}</li> : <li>{file.message}</li>)</>
        
    ))

    return (
        <Container>
            <div {...getRootProps({style} )}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
                <p>Allowed files: *.doc and *.docx</p>
            </div>
            {errorAlert && <Alert variant={"danger"} className={"mt-3"}>{errorAlert}</Alert>}
            {!errorAlert && progress > 0 && <ProgressBar className="mt-3 mb-3" now={progress} label={`${progress}%`} />}
            {acceptedFiles.length > 0 && <aside className="mt-3">
                <div className="d-flex justify-content-end">
                    <Button onClick={uploadAllFilesHandler}>Įkelti failus</Button>
                </div>
                <h4>Failų sąrašas</h4>
                <ul className="list-group">{files}</ul>
                {fileRejections.length > 0 && <><h4 className="mt-3">Atmestų failų sąrašas</h4>
                <ul className="list-group">{fileRejectionItems}</ul></>}
            </aside>}
            {uploadedFiles.length > 0 && <><div className="d-flex justify-content-end mt-3"><Button onClick={convertAllFilesHandler} className={"me-3"}>konvertuoti visus</Button>{isSpinnerVisible && <Spinner animation="border" variant="primary"><span className="visually-hidden">Loading...</span></Spinner>}</div><h4 className="mt-3">Failai įkelti į serverį</h4><ul className="list-group">{serverResponseAfterUpload}</ul></>}
            {convertedFiles.length > 0 && <><h4 className="mt-3">Konvertuotų failų sąrašas</h4><ul className="list-group">{convertedFilesMap}</ul></>}
        </Container>
    )

}

export default FileDropZone;