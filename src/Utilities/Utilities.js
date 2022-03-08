
const DOC = "application/doc";
const MSDOC = "application/ms-doc";
const MSWORD = "application/msword";
const DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const MAX_MB = 1;

        
const convertSizeToMB = (file) => {
    var mb = (file.size / 1024) / 1024;
    return Math.round( mb * 100 ) / 100;
}

const isFileDocumentAllowed = (file) => {
    if ((file.type === DOC) || (file.type === MSDOC) || (file.type === MSWORD) || (file.type === DOCX)) {
        return true;
    } else {
        return false;
    }
}

const resetInputField = () => {
    let randomeString = Math.random().toString(36);
    return randomeString;
}

//key={inputKey || ''}


export { convertSizeToMB, isFileDocumentAllowed, resetInputField, MAX_MB };