import React from "react";
import { deleteFile } from "../../Client/apiHandler";

const DeleteFile = ({fileName, setError, setIsFileActionsVisible, setIsFileDeleted, text}) => {

    const fileDeleteHandler = () => {
        deleteFile(fileName).then(response => {
            console.log(JSON.stringify(response.data));
            console.log(response.data.message);
            if (response.status === 200) {
            setIsFileActionsVisible(false);
            setIsFileDeleted(true);
            }
        }).catch(error => {
            console.log(JSON.stringify(error))

            // if (error.response.data !== "") {
            //     console.log(JSON.stringify(error.response.data))
            //     setError(error.response.data.message)
            // }
        })
    }

    return (
        <a className="link-danger" href="#" onClick={fileDeleteHandler}>{text}</a>
    )
}

export default DeleteFile