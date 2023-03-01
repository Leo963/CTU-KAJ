import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Core from "../components/Core.jsx";
import "../styles/core.css";
export default function HomePage() {
    return (
        <div id="wrapper">
            <Header />
            <Core />
            <Footer />
        </div>
    );
}
