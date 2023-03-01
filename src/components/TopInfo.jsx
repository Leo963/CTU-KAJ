import React from 'react'
export default function TopInfo(props) {
    return (
        <section id="top-info">
            <div id="extra">
                <p>Temperature: {props.mainInfo.temperature}°C</p>
                <p>Wind: {props.mainInfo.windSpeed} m/s SW</p>
            </div>
            <div id="sun">
                <span id="rise"><img src="src/assets/Sunrise.svg" alt="sunrise icon"/>7:40</span>
                <span id="set"><img src="src/assets/Sundown.svg" alt="sundown icon"/>18:25</span>
            </div>
        </section>
    )
}
