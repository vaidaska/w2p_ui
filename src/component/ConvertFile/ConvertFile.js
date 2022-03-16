import React from "react";
import { convertFile } from "../../Client/apiHandler";

const ConvertFile = ({fileName, error, setError, text, setIsSpinnerVisible, setIsFileActionsVisible, setIsDownloadUrlVisible, setUrl, fileConversionErrors, setFileConversionErrors, setIsFileValid}) => {

    const convertFileHandler = () => {
        console.log('convert');
        console.log('filename: ' + fileName);
        
        setIsFileActionsVisible(false);
        setIsSpinnerVisible(true);
  
        convertFile(fileName).then(response => {
  
          if (response.status === 200){
            if (response.data[0].convertedToPdf && response.data[0].pdfValid){
              setIsDownloadUrlVisible(true);
              setUrl(response.data[0].url);
            } else {

              setIsFileValid(true);
              //console.log("response error messages: " + response.data[0].message)
              //console.log(response.data);
              //console.log("errors state before: " + fileConversionErrors);
              setFileConversionErrors([...fileConversionErrors, ...response.data[0].message]);
              //console.log("errors state after: " + fileConversionErrors);
            }
          }
          //console.log(JSON.stringify(response.data));
          console.log("response status: " + response.status);
          //console.log("response data: " + response.data[0]);
          //console.log(response.data.convertedToPdf);
        }).catch(error => {
          //console.log("catch error: " + JSON.stringify(error))
        }).finally( () => {
          setIsSpinnerVisible(false);
          //TEST
          //setIsDownloadUrlVisible(true);
        })
    }

    return (
        <a href="#" onClick={convertFileHandler}>{text}</a>
    )
}

export default ConvertFile;