import React, { useState } from "react";
import { Container } from "react-bootstrap";
import FileDropZone from "../component/FileDropzone";

//import FileSelector from "../component/FileSelector/FileSelector.js";

// import FileDropZone from "../component/FileDropZone/FileDropZone";
// import FileUpload from "../component/FileUpload/FileUpload";
// import FileTable from "../component/FileTable/FileTable";

const HeaderLayout = () => {
    return (
        <Container className="mt-3 text-center"><h1>Word2PDF konverteris</h1></Container>
    )
}

const ContentLayout = () => {

    //FileDropZone
    // const [error, setError] = useState();
    // const [success, setSuccess] = useState();
    // const [url, setUrl] = useState("");
    // const [progress, setProgress] = useState(0);
    // const [inputKey, setInputKey] = useState();
    // const [isSendable, setIsSendable] = useState(false);
    // const [isTableVisible, setIsTableVisible] = useState(false);
    // const [isFileDeleted, setIsFileDeleted] = useState(false);
    // const [isFileActionsVisible, setIsFileActionsVisible] = useState(true);
    // const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);
    // const [isDownloadUrlVisible, setIsDownloadUrlVisible] = useState(false);
    // const [isFileValid, setIsFileValid] = useState(false);
    // const [deleteExistingFile, setDeleteExistingFile] = useState(false);
    // const [fileConversionErrors, setFileConversionErrors] = useState([]);
    // const [step, setStep] = useState(0);

    //FileUpload
    // const [selectedFiles, setSelectedFiles] = useState();
    // const [fileName, setFileName] = useState("");


    const [convertedFiles, setConvertedFiles] = useState([]);

    return (
        <FileDropZone convertedFiles={convertedFiles} setConvertedFiles={setConvertedFiles} />
        //<FileSelector></FileSelector>
        // <>
        //     <FileDropZone 
        //         fileName={fileName}
        //         error={error} 
        //         setError={setError} 
        //         success={success} 
        //         setSuccess={setSuccess} 
        //         progress={progress} 
        //         setProgress={setProgress}
        //         step={step}
        //         setStep={setStep}
        //         inputKey={inputKey}
        //         setInputKey={setInputKey}
        //         isSendable={isSendable}
        //         setIsSendable={setIsSendable}
        //         deleteExistingFile={deleteExistingFile}
        //         setDeleteExistingFile={setDeleteExistingFile}
        //         setIsTableVisible={setIsTableVisible}
        //     >
        //     </FileDropZone>
        //     <FileUpload
        //         url={url}
        //         setUrl={setUrl} 
        //         error={error}
        //         setError={setError}
        //         progress={progress} 
        //         setProgress={setProgress}
        //         success={success} 
        //         setSuccess={setSuccess}
        //         step={step}
        //         setStep={setStep}
        //         selectedFiles={selectedFiles}
        //         setSelectedFiles={setSelectedFiles}
        //         inputKey={inputKey}
        //         setInputKey={setInputKey}
        //         isSendable={isSendable}
        //         setIsSendable={setIsSendable}
        //         isTableVisible={isTableVisible}
        //         setIsTableVisible={setIsTableVisible}
        //         fileName={fileName}
        //         setFileName={setFileName}
        //         setIsFileDeleted={setIsFileDeleted}
        //         setIsFileActionsVisible={setIsFileActionsVisible}
        //         setIsFileValid={setIsFileValid}
        //         setIsDownloadUrlVisible={setIsDownloadUrlVisible}
        //         setDeleteExistingFile={setDeleteExistingFile}
        //     >
        //     </FileUpload>
        //     <FileTable
        //         url={url}
        //         setUrl={setUrl} 
        //         error={error}
        //         setError={setError}
        //         selectedFiles={selectedFiles}
        //         setSelectedFiles={setSelectedFiles} 
        //         isTableVisible={isTableVisible}
        //         setIsTableVisible={setIsTableVisible}
        //         fileName={fileName}
        //         isFileDeleted={isFileDeleted}
        //         setIsFileDeleted={setIsFileDeleted}
        //         isFileActionsVisible={isFileActionsVisible}
        //         setIsFileActionsVisible={setIsFileActionsVisible}
        //         isSpinnerVisible={isSpinnerVisible}
        //         setIsSpinnerVisible={setIsSpinnerVisible}
        //         isDownloadUrlVisible={isDownloadUrlVisible}
        //         setIsDownloadUrlVisible={setIsDownloadUrlVisible}
        //         isFileValid={isFileValid}
        //         setIsFileValid={setIsFileValid}
        //         fileConversionErrors={fileConversionErrors}
        //         setFileConversionErrors={setFileConversionErrors}
        //     >
        //     </FileTable>
        // </>
    )
}

const FooterLayout = () => {
    return (
        <Container className="text-center">Praktika {new Date().getFullYear()}</Container>
    )
}

export { HeaderLayout, ContentLayout, FooterLayout };