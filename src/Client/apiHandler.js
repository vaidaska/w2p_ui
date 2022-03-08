import axios from "axios";
import axiosClient from "./axiosClient";

const getDocuemntList = () => {
    return axiosClient.get('/documents');
}

const uploadFile = (data, config) => {
    return axiosClient.post('/upload', data, config);
}

const convertFile = (file) => {
    const url = "/files/convert/" + file;
    console.log("REQUEST URL: " + url);
    //return axiosClient.post(url);
    return axiosClient.post('/files/convert/', { params: { fileName: file } });
}

export { getDocuemntList, uploadFile, convertFile };


    // api.post("/upload", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //     onUploadProgress: (data) => {
    //       //Set the progress value to show the progress bar
    //       setProgress(Math.round((100 * data.loaded) / data.total));
    //     },
    //   })
    //   .catch((error) => {
    //     //const code = error?.response?.data
    //     const code = "";
    //     switch (code) {
    //       case "FILE_MISSING":
    //         setError("Please select a file before uploading!");
    //         break;
    //       case "LIMIT_FILE_SIZE":
    //         setError("File size is too large. Please upload files below 1MB!");
    //         break;
    //       case "INVALID_TYPE":
    //         setError(
    //           "This file type is not supported! Only .doc and .docx files are allowed."
    //         );
    //         break;
    //       default:
    //         setError("Sorry! Something went wrong. Please try again later.");
    //         break;
    //     }
    //   });