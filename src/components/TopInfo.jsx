import React from 'react'
export default function TopInfo() {
    return (
        <section id="top-info">
            <div id="extra">
                <p>Temperature: 17°C</p>
                <p>Wind: 2 m/s SW</p>
            </div>
            <div id="sun">
                <span id="rise"><img src="public/Sunrise.svg" alt="sunrise icon"/>7:40</span>
                <span id="set"><img src="public/Sundown.svg" alt="sundown icon"/>18:25</span>
            </div>
        </section>
    )
}
