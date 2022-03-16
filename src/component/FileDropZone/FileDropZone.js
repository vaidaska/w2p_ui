import React from "react";
import { resetInputField, MAX_MB } from "../../Utilities/Utilities";
import { Container, Button, Alert, ProgressBar } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { deleteFile } from "../../Client/apiHandler";


const FileDropZone = ({fileName, error, setError, success, setSuccess, progress, setProgress, step, setStep, inputKey, setInputKey, isSendable, setIsSendable, deleteExistingFile, setDeleteExistingFile, setIsTableVisible}) => {

    const errorHandler = () => {
        if (success) {
            setSuccess(false);
        }
        setError(false);
        setDeleteExistingFile(false);
        setInputKey(resetInputField);
        setIsSendable(false);
        setIsTableVisible(false);
        setStep(0);
        if (progress > 0 ) {
            setProgress(0);
        }
    }

    const successHandler = () => {
        if (error) {
            setError(false);
        }
        setSuccess(false);
        //setStep(0);
        //setIsTableVisible(false);
        if (progress > 0 ) {
            setProgress(0);
        }
    }

    const deleteFileHandler = () => {
        console.log(`delete file ...`)
        if (fileName !== "") {
            console.log(`File to delete: ` + fileName);

            deleteFile(fileName).then(response => {
                // console.log(JSON.stringify(response.data));
                // console.log(response.data.message);
                if (response.status === 200) {
                    if (error) {
                        setError(false);
                    }
                    setProgress(0);
                    setSuccess(response.data.message)
                }
            }).catch(error => {
                console.log(JSON.stringify(error.response))
            })

        }
    }

    return (
        <Container>
                <Alert>
                    <Container><strong>Reikalavimai:</strong></Container>
                    <Container>Leidžiami failų formatai: *.docx, *.doc</Container>
                    <Container>Maksimalus leidžiamas failo dydis: {MAX_MB} MB </Container>
                    <Container className="mt-3"><strong>ToDo: </strong></Container>
                    <Container>Klaida! - pranešimų formatavimas </Container>
                    <Container><del>Suskaldyti į komponentus </del></Container>
                    <Container>Drag n Drop - multi failus </Container>
                    <Container>Multi failų f-mas </Container>
                    <Container><del>Ištrinti esamą failą ?</del> Arba patikrinti prieš uploadinant ar toks failas jau yra serveryje įkeltas </Container>
                </Alert>
                {error && <Alert className="d-flex flex-row justify-content-between" variant="danger">{error}<span>{deleteExistingFile && <Button className="me-3" variant="danger" onClick={deleteFileHandler}>Ištrinti failą <Trash></Trash></Button>}<Button variant="danger" onClick={errorHandler}>Išvalyti</Button></span></Alert>}
                {success && <Alert className="d-flex flex-row justify-content-between" variant="success">{success}<span><Button variant="success" onClick={successHandler}>Uždaryti</Button></span></Alert>}
                {progress > 0 && <ProgressBar className="mt-3 mb-3" now={progress} label={`${progress}%`} />}
        </Container>
    )
}

export default FileDropZone;