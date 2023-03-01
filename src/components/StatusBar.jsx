import React, {useEffect, useState} from "react";

export default function StatusBar() {
    let [online, isOnline] = useState(navigator.onLine);

    return (
        <div id="status-bar">
            <div id="status-indicator" className={online ? "online" : ""}></div>
            <div id="lod">
                <input type="radio" defaultChecked name="lod" id="basic"/>
                <label htmlFor="basic">Basic</label>
                <input type="radio" name="lod" id="advanced"/>
                <label htmlFor="advanced">Advanced</label>
            </div>
        </div>
    )
}
