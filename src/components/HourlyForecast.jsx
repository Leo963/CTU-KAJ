import React from 'react';
import WeatherGraph from "./WeatherGraph.jsx";
export default function HourlyForecast() {
    return (
        <section id="hourly">
            <div id="above">
                <section id="time"></section>
                <section id="icons"></section>
            </div>
            <WeatherGraph />
            <div id="below">
                <section id="temps"></section>
                <section id="winds"></section>
            </div>
        </section>
    )
}