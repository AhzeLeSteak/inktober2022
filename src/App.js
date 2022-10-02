import './App.css';
import './fonts/sonic-the-hedgehog-2-hud-font.ttf'
import {useEffect, useMemo, useState} from "react";

const ratio1 = 0.01;
const ratio2 = 0.005;

function App() {

    const [rings, setRings] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const i = setInterval(() => setSeconds(s => s+1), 1000);

        return () => clearInterval(i);
    })

    function parallax(e) {
        let _w = window.innerWidth/2;
        let _h = window.innerHeight/2;
        let _mouseX = e.clientX;
        let _mouseY = e.clientY;
        let _depth1 = `${50 - (_mouseX - _w) * ratio1}% ${50 - (_mouseY - _h) * ratio1}%`;
        let _depth2 = `${50 - (_mouseX - _w) * ratio2}% ${50 - (_mouseY - _h) * ratio2}%`;
        let x = `${_depth2}, ${_depth1}`;
        e.target.style.backgroundPosition = x;
    }

    const onContextMenu = e => {
        e.preventDefault();
        setRings(r => r+10);
    }

    return <div id="container" onClick={() => setRings(r => r+1)} onContextMenu={onContextMenu}>
        <div id="parallax" onMouseMove={parallax}></div>
        <div id="sonic"></div>
        <div id="eggman"></div>
        <em id="score">
            <span className="yellow">SCORE</span> &nbsp;02102022<br/>
            <span className="yellow">TIME</span> &nbsp; {seconds < 600 && '0'}{Math.floor(seconds/60)}:{seconds%60 < 10 && '0'}{seconds%60}<br/>
            <span className="yellow">RINGS</span> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;{rings}
        </em>
    </div>;
}

export default App;
