import React from "react";
import { Container } from "react-bootstrap";
import FileSelector from "../component/FileSelector/FileSelector";

const HeaderLayout = () => {
    return (
        <Container className="mt-3 text-center"><h1>Word2PDF konverteris</h1></Container>
    )
}

const ContentLayout = () => {
    return (
        <FileSelector></FileSelector>
    )
}

const FooterLayout = () => {
    return (
        <Container className="text-center">Praktika {new Date().getFullYear()}</Container>
    )
}

export { HeaderLayout, ContentLayout, FooterLayout };