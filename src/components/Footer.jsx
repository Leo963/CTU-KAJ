import React from "react";
import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <nav>
            <div></div>
            <section id="location-list">
                <img src="src/assets/right-arrow.svg" id="prev"/>
                <div id="locations"></div>
                <img src="src/assets/right-arrow.svg" id="next"/>
            </section>
            <Link to={"/locations"}>List locations</Link>
        </nav>
        )
}
