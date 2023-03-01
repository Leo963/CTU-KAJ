import React from "react";

export default function Footer() {
    return (
        <nav>
            <div></div>
            <section id="location-list">
                <img src="src/assets/right-arrow.svg" id="prev"/>
                <div id="locations"></div>
                <img src="src/assets/right-arrow.svg" id="next"/>
            </section>
            <button>List locations</button>
        </nav>
        )
}
