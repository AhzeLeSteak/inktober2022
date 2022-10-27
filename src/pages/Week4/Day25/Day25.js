import './Day25.css'
import {useState} from "react";

export const Day25 = () => {

    const [selected, setSelected] = useState(0);

    return <div id="container25">
        <div className="slot"/>
        <div className="slot"/>
        <div className="slot"/>

        <div>
            <div className={'piece ' + (selected === 0 ? 'selected' : '')} onMouseEnter={() => setSelected(0)}></div>
            <div className={'piece ' + (selected === 1 ? 'selected' : '')} onMouseEnter={() => setSelected(1)}></div>
            <div className={'piece ' + (selected === 2 ? 'selected' : '')} onMouseEnter={() => setSelected(2)}></div>
        </div>
    </div>
}