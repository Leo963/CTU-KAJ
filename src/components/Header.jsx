import React from "react";

export default function Header({location, date, time}) {
    return (
        <header>
            <h1 id="Location">{location}</h1>
            <h3 id="dateAndTime">{time}, {date}</h3>
        </header>
    );
}
