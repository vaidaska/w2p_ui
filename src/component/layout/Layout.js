import React from "react";
import { Container } from "react-bootstrap";
import FileSelectorForm from "../FileSelectorForm/FileSelectorForm";

const HeaderLayout = () => {
    return (
        <Container className="mt-3 text-center"><h1>Word2PDF konverteris</h1></Container>
    )
}

const ContentLayout = () => {
    return (
        // <FileSelectorForm />
        <FileSelectorForm></FileSelectorForm>
    )
}

const FooterLayout = () => {
    return (
        <Container className="text-center">Practice {new Date().getFullYear()}</Container>
    )
}

export { HeaderLayout, ContentLayout, FooterLayout };