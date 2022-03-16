import axiosClient from "./axiosClient";

const getDocuemntList = () => {
    return axiosClient.get('/documents');
}

const uploadFile = (data, config) => {
    //return axiosClient.post('/upload', data, config);
    return axiosClient.post('/uploadFiles', data, config);
}

const deleteFile = (file) => {
    const url = "/files/delete/" + file;
    console.log("URL: " + url);
    return axiosClient.delete(url);
}


const convertFile = (file) => {
    return axiosClient.post('/files/convert/', null, { params: { fileName: file } });
}

export { getDocuemntList, uploadFile, convertFile, deleteFile };