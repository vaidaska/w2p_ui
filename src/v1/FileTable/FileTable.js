import React, { useState } from "react";
import { Container, Button, Table, Spinner} from "react-bootstrap";
import { deleteFile } from "../../Client/apiHandler";
import ConvertFile from "../ConvertFile/ConvertFile";
import DeleteFile from "../DeleteFile/DeleteFile";

const FileTable = ({isTableVisible, fileName, error, setError, url, setUrl, isFileDeleted, setIsFileDeleted, isFileActionsVisible, setIsFileActionsVisible, isSpinnerVisible, setIsSpinnerVisible, isDownloadUrlVisible, setIsDownloadUrlVisible, isFileValid, setIsFileValid, fileConversionErrors, setFileConversionErrors}) => {

    return (
        <>
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
              {/* <a className="link-danger" href="#" onClick={fileDeleteHandler}>Trinti</a> */}
              {!isFileDeleted && <td>{fileName}</td>}
              {isFileDeleted && <td className="text-decoration-line-through">{fileName}</td>}
              {isFileActionsVisible && <td className="text-center"><DeleteFile fileName={fileName} text={"Trinti"} setIsFileDeleted={setIsFileDeleted} setIsFileActionsVisible={setIsFileActionsVisible}/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><ConvertFile fileName={fileName} text={"konvertuoti"} setIsSpinnerVisible={setIsSpinnerVisible} setIsFileActionsVisible={setIsFileActionsVisible} setIsFileValid={setIsFileValid} setUrl={setUrl} fileConversionErrors={fileConversionErrors} setFileConversionErrors={setFileConversionErrors} setIsDownloadUrlVisible={setIsDownloadUrlVisible}/></td> }
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
                  <ul>
                    {
                      //console.log("errors: " + fileConversionErrors) &&
                      //fileConversionErrors.map((item) => <li>item</li>)
                      fileConversionErrors[0] &&
                      fileConversionErrors[1] &&
                      fileConversionErrors[2]

                      //console.log(errors)
                        // errors.map( (item) => { <li>item</li> })
                    }
                  </ul>
                </div>
              </div>
            </td></>}
            </tr>
          </tbody>
        </Table>
      </Container>)}
    </>
    )
    
}

export default FileTable;